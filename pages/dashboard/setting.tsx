import React, { useState, useEffect } from "react";
import * as S from "../../src/Settings/Settings.styled";
import Input from "../../src/common/Input";
import * as UserAPI from "../../graphql/User/UserAPI";
import Button from "../../src/common/Button";
import withDashboard from "../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../src/common/Layout/DashboardPageContent";
import { showPageNotice } from "../../src/common/utility";

export default withDashboard({ noContentPadding: true })(({ user }: any) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    name: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      name: `${user.firstName} ${user.lastName}`,
    });
  }, [user]);

  const [updateUser, { loading: updateUserLoading }] = UserAPI.updateUser({
    onError: (err) => {
      showPageNotice(err.message, "error");
    },
    onCompleted: () => {
      showPageNotice("Account information saved.", "success");
    },
  });

  const onSubmit = () => {
    const name = form.name.split(" ");
    updateUser({
      variables: {
        input: {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          firstName: name[0],
          lastName: name.filter((n, idx) => idx !== 0).join(" "),
        },
      },
    });
  };

  return (
    <DashboardPageContent
      title="Account Information"
      filter={
        <Button isLoading={updateUserLoading} onClick={onSubmit}>
          Save
        </Button>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <S.Container>
          <S.ContainerContent>
            <S.Row>
              <Input
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </S.Row>
            <S.Row>
              <Input label="Email" value={user.email} readOnly />
            </S.Row>
            <S.Row>
              <Input
                label="Current password"
                type="password"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    currentPassword: e.target.value,
                  })
                }
              />
            </S.Row>
            <S.Row>
              <Input
                label="New password"
                type="password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />
            </S.Row>
          </S.ContainerContent>
        </S.Container>
        <button style={{ display: "none" }} type="submit">
          submit
        </button>
      </form>
    </DashboardPageContent>
  );
});
