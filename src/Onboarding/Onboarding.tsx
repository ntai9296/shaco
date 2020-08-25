import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getCurrentUserOnboarding,
  changeUserPassword,
} from "../../graphql/User/UserAPI";
import * as S from "./Onboarding.styled";
import { ArrowLeft, Check, Plus } from "react-feather";
import Input from "../common/Input";
import Button from "../common/Button";
import Notification from "../common/Notification";
import OnboardingProfile from "./OnboardingProfile";
import ServiceList from "../Dashboard/Service/ServiceList";

export default () => {
  const router = useRouter();
  const step = router.query.step || "one";
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { data } = getCurrentUserOnboarding({
    onError: () => {},
    onCompleted: (data) => {
      if (!data.currentUser?.guest && step === "one") {
        router.replace("/onboarding?step=two");
      }
    },
  });

  const [changePassword, { loading }] = changeUserPassword({
    onError: (err) => {
      setErrors([err.message]);
    },
    onCompleted: () => {
      router.push("/onboarding?step=two");
    },
  });

  const onRenderContent = () => {
    switch (step) {
      case "two":
        return (
          <>
            <S.HeadingContainer>
              <h1>Setup your profile</h1>
            </S.HeadingContainer>
            <S.ContentContainer>
              <OnboardingProfile
                onNext={() => router.push("/onboarding?step=three")}
              />
            </S.ContentContainer>
          </>
        );
      case "three":
        return (
          <>
            <S.HeadingContainer>
              <S.ServicesHeading>
                Your services
                <Link href="/dashboard/services/new">
                  <S.AddServiceButton>
                    <Plus size={26} />
                  </S.AddServiceButton>
                </Link>
              </S.ServicesHeading>
            </S.HeadingContainer>
            <S.ContentContainer>
              <ServiceList />
            </S.ContentContainer>
          </>
        );
      default:
        return (
          <>
            <S.HeadingContainer>
              <h1>Welcome to Fireside 🔥</h1>
              <p>
                All over the world, hosts have started 1,000+ incredible
                services with Fireside. Today, we’re starting yours.
              </p>
            </S.HeadingContainer>
            <S.ContentContainer>
              <S.ContentBox>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (password.length < 6) {
                      return setErrors([
                        "Password must be atleast 6 characters",
                      ]);
                    }
                    setErrors([]);

                    changePassword({
                      variables: {
                        input: {
                          newPassword: password,
                        },
                      },
                    });
                  }}
                >
                  <S.Row>
                    <S.Field>
                      <Input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        label="Set your password"
                        placeholder="Your password"
                      />
                    </S.Field>
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
                  <S.Field>
                    <Button isLoading={loading} type="submit">
                      Next
                    </Button>
                  </S.Field>
                </form>
              </S.ContentBox>
            </S.ContentContainer>
          </>
        );
    }
  };
  return (
    <S.LayoutContainer>
      <S.HeaderContainer>
        <Link href="/">
          <S.HeaderBackContainer>
            <ArrowLeft size={17} />
            Back
          </S.HeaderBackContainer>
        </Link>
        <S.HeaderStepContainer>
          <S.Step
            // onClick={() => router.push("/onboarding?step=one")}
            active={step === "one"}
            checked={!(step === "one")}
          >
            {step === "one" ? "1" : <Check size={20} />}
          </S.Step>
          <S.Step
            // onClick={() => router.push("/onboarding?step=two")}
            active={step === "two"}
            checked={step === "three"}
          >
            {step === "two" || step === "one" ? "2" : <Check size={20} />}
          </S.Step>
          <S.Step
            // onClick={() => router.push("/onboarding?step=three")}
            active={step === "three"}
          >
            3
          </S.Step>
        </S.HeaderStepContainer>
      </S.HeaderContainer>
      <S.BodyContainer>{onRenderContent()}</S.BodyContainer>
    </S.LayoutContainer>
  );
};
