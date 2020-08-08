import React, { useState, useEffect } from "react";
import Router from "next/router";
import * as S from "../src/EarlyAccess/EarlyAccess.styled";
import Input from "../src/common/Input";
import * as UserAPI from "../graphql/User/UserAPI";
import * as Utility from "../src/common/utility";
import Button from "../src/common/Button";
import Notification from "../src/common/Notification";
import SimpleNavigation from "../src/common/TopNav/SimpleNavigation";
import moment from "moment-timezone";
import Textarea from "../src/common/Textarea";

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

  const [
    requestEarlyAccess,
    { loading, error, data },
  ] = UserAPI.requestEarlyAccess();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    socialMediaAccounts: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setErrors(error?.message ? [error?.message] : []);
  }, [error]);

  useEffect(() => {
    return () => Utility.hideWorkingOverlay();
  }, []);

  const onSubmitEarlyAccess = (e: any) => {
    e.preventDefault();
    requestEarlyAccess({
      variables: {
        input: {
          ...form,
          firstName: form.firstName.split(" ")[0] || "",
          lastName: form.firstName.split(" ")[1] || "",
          timezone: moment.tz.guess(),
          referCode: Router?.query?.ref as string,
        },
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

  if (userLoading) {
    return null;
  }

  return (
    <S.Page>
      <SimpleNavigation skipUser={true} />
      <S.Layout>
        <S.Title>Get Early Access</S.Title>
        <S.SubTitle>
          Sign up for the early access and we’ll email you with an invite code
          in the coming days.
        </S.SubTitle>
        <S.Content>
          {data?.requestEarlyAccess?.message ? (
            <S.SuccessMessage>
              Thanks for signing up for our private beta waiting list. We’re
              thrilled about all the interest in the product, and will be
              inviting new people to join our testing community over the coming
              days. We’ll reach out by email—if you don’t hear from us, please
              be sure to check your spam folder. We look forward to sharing
              Fireside with you!
            </S.SuccessMessage>
          ) : (
            <>
              <S.SignUpForm onSubmit={onSubmitEarlyAccess}>
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
                      placeholder="johndoe@gmail.com"
                    />
                  </S.EmailField>
                </S.EmailRow>
                <S.EmailRow>
                  <S.EmailField>
                    <Textarea
                      rows={3}
                      value={form.socialMediaAccounts}
                      onChange={(e) =>
                        onChangeForm("socialMediaAccounts", e.target.value)
                      }
                      label="Social media accounts (Instagram, Youtube, Twitter, TikTok, etc.)"
                      placeholder="ie IG: @johndoe, Tiktok: @johndoe, etc."
                    />
                  </S.EmailField>
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
                      Request invite
                    </Button>
                  </S.SubmitButtonField>
                </S.SubmitRow>
              </S.SignUpForm>
            </>
          )}
        </S.Content>
      </S.Layout>
    </S.Page>
  );
};
