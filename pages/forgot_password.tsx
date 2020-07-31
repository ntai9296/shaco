import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as S from "../src/ResetPassword/ResetPassword.styled";
import Input from "../src/common/Input";
import Button from "../src/common/Button";
import { forgotPassword, getCurrentUserLazy } from "../graphql/User/UserAPI";
import Notification from "../src/common/Notification";
import SimpleNavigation from "../src/common/TopNav/SimpleNavigation";

export default () => {
  const router = useRouter();

  const [
    getCurrentUser,
    { data: userData, loading: userLoading },
  ] = getCurrentUserLazy();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitForgotPassword, { loading, data }] = forgotPassword({
    onError: (error) => {
      setErrors([error.message]);
    },
  });

  if (userLoading) {
    return null;
  }

  if (userData?.currentUser?.id) {
    router.replace("/dashboard");
    return null;
  }

  return (
    <S.Page>
      <SimpleNavigation skipUser />
      <S.ResetPasswordLayout>
        <S.ResetPasswordHeader>Forgot password</S.ResetPasswordHeader>
        <S.ResetPasswordContainer>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setErrors([]);
              submitForgotPassword({
                variables: {
                  input: {
                    email,
                  },
                },
              });
            }}
          >
            <S.Row>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
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
            {data?.forgotPassword?.message && (
              <S.Row>
                <Notification
                  notifications={[data?.forgotPassword?.message]}
                  type="success"
                />
              </S.Row>
            )}
            <S.SubmitRow>
              <Button isLoading={loading}>Submit</Button>
            </S.SubmitRow>
          </form>
        </S.ResetPasswordContainer>
      </S.ResetPasswordLayout>
    </S.Page>
  );
};
