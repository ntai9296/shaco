import React, { useState } from "react";
import * as S from "../../src/Settings/Settings.styled";
import Router from "next/router";
import Input from "../../src/common/Input";
import * as UserAPI from "../../graphql/User/UserAPI";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import Button from "../../src/common/Button";
import Notification from "../../src/common/Notification";

export default () => {
  const { data: userData, loading } = UserAPI.getCurrentUser();
  const [errors, setErrors] = useState<string[]>([]);
  const [
    changePassword,
    { loading: changePasswordLoading },
  ] = UserAPI.changeUserPassword({
    onError: (err) => {
      setErrors([err.message]);
    },
    onCompleted: () => {
      setErrors([]);
    },
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  if (loading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }

  return (
    <DashboardLayout>
      <S.Container>
        <S.Heading>Settings</S.Heading>
        {/* <S.Title>Timezone</S.Title>
        <S.Paragraph>
          When you change time zone in your Superpeer account, your availability
          hours and scheduled calls adapt to the new time zone. For example, a
          10 AM call PT changes to a 1 PM ET call if you travel from San
          Francisco to New York. No matter where you set your weekly
          availability, everyone will see it in their own time zone.
        </S.Paragraph>
        <Select
          options={options}
          placeholder="Select your timezone"
          // defaultValue={currentTimeZone}
        />
        <S.Hr /> */}
        <S.Title>Change password</S.Title>

        <S.FormWrap
          onSubmit={(e) => {
            e.preventDefault();
            changePassword({
              variables: {
                input: passwords,
              },
            });
          }}
        >
          <S.Row>
            <Input
              label="Current password"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
            />
          </S.Row>
          <S.Row>
            <Input
              label="New password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />
          </S.Row>

          {errors.length > 0 && (
            <S.Row>
              <Notification
                onClose={() => setErrors([])}
                type="error"
                notifications={errors}
              />
            </S.Row>
          )}

          <S.Row>
            <Button isLoading={changePasswordLoading} type="submit">
              Change
            </Button>
          </S.Row>
        </S.FormWrap>
      </S.Container>
    </DashboardLayout>
  );
};
