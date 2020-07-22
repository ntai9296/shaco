import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Trash } from "react-feather";
import {
  createConnectAccount,
  deleteConnectAccount,
} from "../../graphql/ConnectAccount/ConnectAccountAPI";
import { getCurrentUserWithConnectAccounts } from "../../graphql/User/UserAPI";
import * as S from "./ConnectCalendarList.styled";
import { ConnectAccountIntegrationTypeEnum } from "../../graphql/generated";
import Environment from "../../lib/env";
import Notification from "../common/Notification";

export default () => {
  const [errors, setErrors] = useState<string[]>([]);
  const { data: userData, loading } = getCurrentUserWithConnectAccounts();

  const [createConnect] = createConnectAccount({
    onError: (error) => {
      setErrors([error.message]);
    },
    update: (cache, { data }) => {
      if (data?.createConnectAccount?.connectAccount?.id) {
        cache.modify({
          id: cache.identify(userData?.currentUser as any),
          fields: {
            connectAccountsConnection(existingConnection, { readField }) {
              return {
                ...existingConnection,
                nodes: [
                  ...existingConnection.nodes,
                  data?.createConnectAccount?.connectAccount,
                ],
              };
            },
          },
        });
      }
    },
  });

  const [deleteConnect] = deleteConnectAccount({
    onError: (error) => {
      setErrors([error.message]);
    },
    update: (cache, { data }) => {
      if (data?.deleteConnectAccount?.connectAccount?.id) {
        cache.modify({
          id: cache.identify(userData?.currentUser as any),
          fields: {
            connectAccountsConnection(existingConnection, { readField }) {
              return {
                ...existingConnection,
                nodes: existingConnection.nodes.filter(
                  (node: any) =>
                    readField("id", node) !==
                    data?.deleteConnectAccount?.connectAccount?.id
                ),
              };
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      win?.gapix?.addEventListener("load", () => {
        gapi.load("client:auth2", () => {
          gapi.client.init({
            apiKey: Environment.GOOGLE_OAUTH_API_KEY,
            clientId: Environment.GOOGLE_OAUTH_CLIENT_ID,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
            scope: "https://www.googleapis.com/auth/calendar",
          });
        });
      });
    }
  }, []);

  const connectedAccounts =
    userData?.currentUser?.connectAccountsConnection?.nodes || [];

  return (
    <div>
      <Head>
        <script
          id="gapix"
          async
          defer
          src="https://apis.google.com/js/api.js?onLoad=gapiLoad"
        />
      </Head>
      {errors.length > 0 && (
        <S.NotificationContainer>
          <Notification
            type="error"
            notifications={errors}
            onClose={() => setErrors([])}
          />
        </S.NotificationContainer>
      )}
      {!loading && (
        <S.CalendarList>
          {connectedAccounts.length > 0 ? (
            connectedAccounts.map((node) => {
              return (
                <S.CalendarItem key={node?.id}>
                  <b>{node?.email}</b>
                  <S.TrashButton
                    onClick={() => {
                      deleteConnect({
                        variables: {
                          input: {
                            connectAccountId: node?.id as string,
                          },
                        },
                      });
                    }}
                  >
                    <Trash size={16} />
                  </S.TrashButton>
                </S.CalendarItem>
              );
            })
          ) : (
            <S.CalendarItemButton
              onClick={() => {
                gapi.auth2
                  .getAuthInstance()
                  .grantOfflineAccess()
                  .then((code) => {
                    const profile = gapi.auth2
                      .getAuthInstance()
                      .currentUser.get()
                      .getBasicProfile();

                    const profileData = {
                      id: profile.getId(),
                      firstName: profile.getGivenName(),
                      lastName: profile.getFamilyName(),
                      email: profile.getEmail(),
                    };

                    setErrors([]);

                    createConnect({
                      variables: {
                        input: {
                          ...profileData,
                          code: code.code,
                          integrationType:
                            ConnectAccountIntegrationTypeEnum.GOOGLE_CALENDAR,
                        },
                      },
                    });
                  });
              }}
            >
              Add calendar account
            </S.CalendarItemButton>
          )}
        </S.CalendarList>
      )}
    </div>
  );
};
