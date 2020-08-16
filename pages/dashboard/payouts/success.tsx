import React, { useEffect } from "react";
import { useRouter } from "next/router";
import withDashboard from "../../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../../src/common/Layout/DashboardPageContent";
import {
  currentUserAuthorizeConnectStripeAccount,
} from "../../../graphql/User/UserAPI";
import {
  showWorkingOverlay,
  hideWorkingOverlay,
} from "../../../src/common/utility";

const Payout = ({ user }: any) => {
  const router = useRouter();

  const [onAuthUser, { error }] = currentUserAuthorizeConnectStripeAccount({
    onCompleted: () => {
      router.push("/dashboard/payouts");
      hideWorkingOverlay();
    },
    onError: () => {
      hideWorkingOverlay();
    },
  });

  useEffect(() => {
    if (router.query.code) {
      showWorkingOverlay();
      onAuthUser({
        variables: {
          input: {
            code: router.query.code as string,
          },
        },
      });
    }
  }, [router.query]);

  return (
    <DashboardPageContent>
      {error && <p>{error.message}</p>}
      {!router.query.code && <p>Something went wrong. Please try again</p>}
    </DashboardPageContent>
  );
};

export default withDashboard({ noContentPadding: true })(Payout);
