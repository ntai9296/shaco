import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import Link from "next/link";
import * as S from "../src/SignUp/SignUp.styled";
import Input from "../src/common/Input";
import * as UserAPI from "../graphql/User/UserAPI";
import * as Utility from "../src/common/utility";
import Button from "../src/common/Button";
import Notification from "../src/common/Notification";
import SimpleNavigation from "../src/common/TopNav/SimpleNavigation";

export default () => {
  const [getCurrentUser, { data: userData }] = UserAPI.getCurrentUserLazy({
    onCompleted: () => {
      setUserLoading(false);
    },
    onError: () => {
      setUserLoading(false);
    },
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  const [loginUser, { loading, error, data: loginData }] = UserAPI.loginUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setErrors(error?.message ? [error?.message] : []);
  }, [error]);

  useEffect(() => {
    return () => Utility.hideWorkingOverlay();
  }, []);

  const onSubmitSignUp = (e: any) => {
    e.preventDefault();
    loginUser({
      variables: {
        input: form,
      },
    });
  };

  const onChangeForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (userData?.currentUser?.id) {
    Router.replace("/dashboard");
    return null;
  }

  if (loginData?.loginUser?.accessToken) {
    cookie.set("token", loginData.loginUser.accessToken);
    Utility.showWorkingOverlay();
    Router.replace("/dashboard");
    return null;
  }

  if (userLoading) {
    return null;
  }

  return (
    <S.Page>
      <SimpleNavigation skipUser={true} />
      <S.Layout>
        <S.Content>
          <S.Heading>
            <S.Title>Login to your account</S.Title>
            <S.SubTitle>
              Don't have an account yet?{" "}
              <Link href="/sign-up">
                <a>Sign up</a>
              </Link>
            </S.SubTitle>
          </S.Heading>

          <S.SignUpForm onSubmit={onSubmitSignUp}>
            <S.EmailRow>
              <S.EmailField>
                <Input
                  value={form.email}
                  onChange={(e) => onChangeForm("email", e.target.value)}
                  type="email"
                  label="Email"
                />
              </S.EmailField>
            </S.EmailRow>
            <S.PasswordRow>
              <S.PasswordField>
                <Input
                  value={form.password}
                  onChange={(e) => onChangeForm("password", e.target.value)}
                  label="Password"
                  type="password"
                />
              </S.PasswordField>
            </S.PasswordRow>
            <S.EmailRow>
              <Link href="/forgot_password">
                <a>Forgot your password?</a>
              </Link>
            </S.EmailRow>
            {errors.length > 0 && (
              <S.ErrorRow>
                <Notification
                  onClose={() => setErrors([])}
                  type="error"
                  notifications={errors}
                />
              </S.ErrorRow>
            )}
            <S.SubmitRow>
              <S.SubmitButtonField>
                <Button isLoading={loading} type="submit">
                  Login
                </Button>
              </S.SubmitButtonField>
            </S.SubmitRow>
          </S.SignUpForm>
        </S.Content>
      </S.Layout>
    </S.Page>
  );
};
