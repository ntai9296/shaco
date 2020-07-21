import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import * as S from "../../src/ResetPassword/ResetPassword.styled";
import Input from "../../src/common/Input";
import Button from "../../src/common/Button";
import { resetPassword, getCurrentUserLazy } from "../../graphql/User/UserAPI";
import Notification from "../../src/common/Notification";

export default () => {
  const router = useRouter();
  const { token } = router.query;

  const [
    getCurrentUser,
    { data: userData, loading: userLoading },
  ] = getCurrentUserLazy();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitResetPassword, { loading }] = resetPassword({
    onCompleted: (data) => {
      if (data?.resetPassword?.accessToken) {
        cookie.set("token", data.resetPassword.accessToken);
        router.replace("/dashboard");
      }
    },
    onError: (error) => {
      setErrors([error.message]);
    },
  });

  if (userLoading) {
    return null;
  }

  if (!token) {
    return <div>Token missing</div>;
  }

  if (userData?.currentUser?.id) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <S.ResetPasswordLayout>
      <S.ResetPasswordHeader>Set new password</S.ResetPasswordHeader>
      <S.ResetPasswordContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErrors([]);
            submitResetPassword({
              variables: {
                input: {
                  token: token as string,
                  newPassword: password,
                },
              },
            });
          }}
        >
          <S.Row>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="New password"
              type="password"
            />
          </S.Row>
          {errors.length > 0 && (
            <S.Row>
              <Notification
                onClose={() => setErrors([])}
                notifications={errors}
                type="error"
              />
            </S.Row>
          )}
          <S.Row>
            <Button isLoading={loading}>Submit</Button>
          </S.Row>
        </form>
      </S.ResetPasswordContainer>
    </S.ResetPasswordLayout>
  );
};
