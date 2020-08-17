import React from "react";
import moment from "moment-timezone";
import withDashboard from "../../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../../src/common/Layout/DashboardPageContent";
import Button from "../../../src/common/Button";
import * as S from "../../../src/Dashboard/Payout/Payout.styled";
import {
  getCurrentUserStripeAccount,
  getCurrentUserStripeAccountLoginLinkLazy,
  currentUserRequestPayout,
} from "../../../graphql/User/UserAPI";
import ENV from "../../../lib/env";
import { showPageNotice, getHumanizeEnum } from "../../../src/common/utility";
import Table, * as TableComponent from "../../../src/common/Table/Table";
import { getCurrentUserStripeAccountQuery_currentUser_bookingCompletesConnection_nodes } from "../../../graphql/generated";

const Payout = () => {
  const [
    requestPayout,
    { loading: requestPayoutLoading },
  ] = currentUserRequestPayout({
    onCompleted: () => {
      showPageNotice("Payout completed!", "success");
    },
    onError: (err) => {
      showPageNotice(err.message, "error");
    },
  });
  const { data, loading, error } = getCurrentUserStripeAccount({
    variables: {
      isHost: true,
      sortBy: "DESC",
    },
  });

  const [getLoginLink] = getCurrentUserStripeAccountLoginLinkLazy({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data.currentUser?.stripeAccount?.loginLink) {
        window.open(data.currentUser?.stripeAccount?.loginLink);
      }
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const bookingCompletes = (data?.currentUser?.bookingCompletesConnection
    ?.nodes ||
    []) as getCurrentUserStripeAccountQuery_currentUser_bookingCompletesConnection_nodes[];
  const totalPending = bookingCompletes.reduce(
    (acc, bc) => acc + (bc.booking?.payoutPrice || 0),
    0
  );

  return (
    <DashboardPageContent
      title={
        data?.currentUser?.stripeAccount?.payoutsEnabled && <div>Payout</div>
      }
      filter={
        data?.currentUser?.stripeAccount?.payoutsEnabled && (
          <Button
            isLoading={requestPayoutLoading}
            onClick={() =>
              requestPayout({
                variables: {
                  input: {},
                },
              })
            }
            disabled={data.currentUser.stripeAccount.balance <= 0}
          >
            Pay out now
          </Button>
        )
      }
      subHeading={
        data?.currentUser?.stripeAccount?.payoutsEnabled && (
          <S.SubHeadingContainer>
            <div>
              Available to pay out:{" "}
              <b>
                $
                {(
                  data.currentUser.stripeAccount.balance / 100
                ).toLocaleString()}
              </b>
            </div>
            <div>
              Pending: <b>${(totalPending / 100).toLocaleString()}</b>
            </div>
            <div>
              Account: <b>{data.currentUser.stripeAccount.name}</b>
            </div>
            <div>
              <S.EditPayout onClick={() => getLoginLink()}>
                Change
              </S.EditPayout>
            </div>
          </S.SubHeadingContainer>
        )
      }
    >
      {!data?.currentUser?.stripeAccount ? (
        <S.Section>
          <S.ConnectBox>
            <S.ConnectTitle>
              You haven't linked a payment account yet.
            </S.ConnectTitle>
            <S.ConnectSubTitle>
              We can’t pay you out for your transactions until you link. Connect
              your bank account or debit card quickly and securely through
              Stripe.
            </S.ConnectSubTitle>
            <Button
              onClick={() => {
                window.location.href = `https://connect.stripe.com/express/oauth/authorize?client_id=${ENV.STRIPE_CONNECT_CLIENT_ID}&stripe_user[email]=${data?.currentUser?.email}&stripe_user[first_name]=${data?.currentUser?.firstName}&stripe_user[last_name]=${data?.currentUser?.lastName}`;
              }}
            >
              Connect your account
            </Button>
          </S.ConnectBox>
        </S.Section>
      ) : (
        <>
          <S.Section>
            <S.PayoutHistoryTitle>
              Earnings
            </S.PayoutHistoryTitle>
            <Table>
              <TableComponent.TableHeader>
                <TableComponent.TableHeaderColumn flex>
                  Date
                </TableComponent.TableHeaderColumn>
                <TableComponent.TableHeaderColumn flex>
                  Amount
                </TableComponent.TableHeaderColumn>
                <TableComponent.TableHeaderColumn flex>
                  Status
                </TableComponent.TableHeaderColumn>
                <TableComponent.TableHeaderColumn flex>
                  EST. ARRIVAL
                </TableComponent.TableHeaderColumn>
              </TableComponent.TableHeader>
              <TableComponent.TableBody>
                {bookingCompletes.length === 0 && (
                  <TableComponent.TableBodyEmpty>
                    Completed requests will appear here.
                  </TableComponent.TableBodyEmpty>
                )}
                {bookingCompletes.map((bookingComplete) => {
                  return (
                    <TableComponent.TableBodyRow key={bookingComplete.id}>
                      <TableComponent.TableBodyRowContent flex>
                        {moment(bookingComplete.createdAt).format("MM/DD/YYYY")}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent flex>
                        $
                        {(
                          (bookingComplete?.booking?.payoutPrice || 0) / 100
                        ).toLocaleString()}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent flex>
                        {bookingComplete.status}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent flex>
                        {moment(bookingComplete.createdAt).add(2, "days").add(1, "hour").fromNow()}
                      </TableComponent.TableBodyRowContent>
                    </TableComponent.TableBodyRow>
                  );
                })}
              </TableComponent.TableBody>
            </Table>
          </S.Section>

          <S.Section>
            <S.PayoutHistoryTitle>Payouts</S.PayoutHistoryTitle>
            <Table>
              <TableComponent.TableHeader>
                <TableComponent.TableHeaderColumn flex>
                  Date
                </TableComponent.TableHeaderColumn>
                <TableComponent.TableHeaderColumn flex>
                  Amount
                </TableComponent.TableHeaderColumn>
                <TableComponent.TableHeaderColumn flex>
                  Status
                </TableComponent.TableHeaderColumn>
                <TableComponent.TableHeaderColumn flex>
                  EST. ARRIVAL
                </TableComponent.TableHeaderColumn>
              </TableComponent.TableHeader>
              <TableComponent.TableBody>
                {data.currentUser.stripeAccount.payouts.length === 0 && (
                  <TableComponent.TableBodyEmpty>
                    Payouts to your bank/card will appear here.
                  </TableComponent.TableBodyEmpty>
                )}
                {data.currentUser.stripeAccount.payouts.map((payout) => {
                  return (
                    <TableComponent.TableBodyRow key={payout.id}>
                      <TableComponent.TableBodyRowContent flex>
                        {moment(payout.createdAt).format("MM/DD/YYYY")}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent flex>
                        ${(payout.amount / 100).toLocaleString()}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent flex>
                        {getHumanizeEnum(payout.status)}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent flex>
                        {moment(payout.arrivalDate).format("MM/DD/YYYY")}
                      </TableComponent.TableBodyRowContent>
                    </TableComponent.TableBodyRow>
                  );
                })}
              </TableComponent.TableBody>
            </Table>
          </S.Section>
        </>
      )}
    </DashboardPageContent>
  );
};

export default withDashboard({ noContentPadding: true })(Payout);
