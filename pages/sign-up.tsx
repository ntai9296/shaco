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
  const [
    getCurrentUser,
    { data: userData },
  ] = UserAPI.getCurrentUserLazy();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const [createUser, { loading, error }] = UserAPI.createUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors(error?.graphQLErrors[0]?.extensions?.messages || []);
  }, [error]);

  const onSubmitSignUp = async (e: any) => {
    e.preventDefault();

    try {
      const result = await createUser({
        variables: {
          input: form,
        },
      });

      if (result?.data?.createUser?.accessToken) {
        cookie.set("token", result?.data?.createUser?.accessToken);
        Router.replace("/dashboard");
        Utility.showWorkingOverlay();
      }
    } catch (error) {
      setErrors([error.message]);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  const onChangeForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (userData?.currentUser?.id) {
    Router.replace("/dashboard");
    return null;
  }

  return (
    <S.Page>
      <SimpleNavigation skipUser={true} />
      <S.Layout>
        <S.Content>
          <S.Heading>
            <S.Title>Become a host</S.Title>
            <S.SubTitle>
              Already have an account yet?{" "}
              <Link href="/login">
                <a>Log in</a>
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
