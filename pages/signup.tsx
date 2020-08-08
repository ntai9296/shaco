import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import moment from "moment-timezone";
import Link from "next/link";
import * as S from "../src/SignUp/SignUp.styled";
import Input from "../src/common/Input";
import * as UserAPI from "../graphql/User/UserAPI";
import * as Utility from "../src/common/utility";
import Button from "../src/common/Button";
import Notification from "../src/common/Notification";
import SimpleNavigation from "../src/common/TopNav/SimpleNavigation";

export default () => {
  const [getCurrentUser, { data: userData }] = UserAPI.getCurrentUserLazy();
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    getCurrentUser();
  }, []);

  const [createUser, { loading }] = UserAPI.createUser({
    onError: (error) => {
      setErrors([error.message]);
    },
  });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    timezone: moment.tz.guess(),
  });

  const onSubmitSignUp = async (e: any) => {
    e.preventDefault();

    try {
      const result = await createUser({
        variables: {
          input: {
            ...form,
            firstName: form.firstName.split(" ")[0] || "",
            lastName: form.firstName.split(" ")[1] || "",
          },
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
        <S.Title>Create your account</S.Title>
        <S.SubTitle>
          Already have an account?{" "}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </S.SubTitle>

        <S.Content>
          <S.SignUpForm onSubmit={onSubmitSignUp}>
            <S.EmailRow>
              <S.EmailField>
                <Input
                  value={form.firstName}
                  onChange={(e) => onChangeForm("firstName", e.target.value)}
                  label="Name"
                  placeholder="ie: John Doe"
                />
              </S.EmailField>
            </S.EmailRow>
            <S.EmailRow>
              <S.EmailField>
                <Input
                  value={form.email}
                  onChange={(e) => onChangeForm("email", e.target.value)}
                  type="email"
                  label="Email"
                  placeholder="ie: johndoe@gmail.com"
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
                  Sign Up
                </Button>
              </S.SubmitButtonField>
            </S.SubmitRow>
          </S.SignUpForm>
        </S.Content>
      </S.Layout>
    </S.Page>
  );
};
