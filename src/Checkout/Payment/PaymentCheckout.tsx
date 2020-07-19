import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import * as S from "./PaymentCheckout.styled";
import Input from "../../common/Input";
import Button from "../../common/Button";
import Notification from "../../common/Notification";
import ENV from "../../../lib/env";
import Textarea from "../../common/Textarea";

const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);

export default ({ ...props }: any) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [
          {
            family: "Inter",
            src: "url(https://tryfireside.com/fonts/Inter-Medium.woff2?v=3.13)",
            weight: "400",
          },
        ],
      }}
    >
      <CheckoutForm {...props} />
    </Elements>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#3b3b3b",
      fontSmoothing: "antialiased",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: "400",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({
  title,
  form,
  onChangeForm,
  onSubmit,
  loading,
  errors: initErrors,
  price,
}: {
  title: string;
  form: any;
  onChangeForm: (newForm: any) => void;
  onSubmit: (tokenId: string) => void;
  loading: boolean;
  errors: string[];
  price: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (initErrors.length > 0) {
      setErrors(initErrors);
    }
  }, [initErrors]);

  const onSubmitPayment = async (e: any) => {
    e.preventDefault();
    setErrors([]);

    if (price <= 0) {
      return onSubmit("");
    }

    if (elements && stripe) {
      const card = elements.getElement(CardElement);
      if (!card) {
        return;
      }
      try {
        const result = await stripe.createToken(card);
        if (result.error) {
          throw result.error;
        }

        if (result.token?.id) {
          onSubmit(result.token?.id);
        }
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  const onFormChange = (field: string, value: any) =>
    onChangeForm({ ...form, [field]: value });

  return (
    <S.PaymentCheckoutContainer>
      <S.Title>{title}</S.Title>
      <S.PaymentCheckout onSubmit={onSubmitPayment}>
        <S.NameRow>
          <Input
            value={form.firstName}
            onChange={(e) => onFormChange("firstName", e.target.value)}
            label="First name"
          />
          <Input
            value={form.lastName}
            onChange={(e) => onFormChange("lastName", e.target.value)}
            label="Last name"
          />
        </S.NameRow>

        <S.Row>
          <Input
            value={form.email}
            onChange={(e) => onFormChange("email", e.target.value)}
            type="email"
            label="Email"
          />
        </S.Row>

        {form.bookingQuestions?.map((question: any, idx: number) => (
          <S.Row key={question.serviceQuestionId}>
            <Textarea
              rows={6}
              value={question.answer}
              label={question.question}
              onChange={(e) => {
                onFormChange(
                  "bookingQuestions",
                  update(form.bookingQuestions, {
                    [idx]: {
                      answer: {
                        $set: e.target.value,
                      },
                    },
                  })
                );
              }}
            />
          </S.Row>
        ))}

        {price > 0 && (
          <S.Row>
            <S.CardInput>
              <label>Card information</label>
              <div>
                <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
              </div>
            </S.CardInput>
          </S.Row>
        )}

        {errors.length > 0 && (
          <S.Row>
            <Notification
              onClose={() => setErrors([])}
              type="error"
              notifications={errors}
            />
          </S.Row>
        )}
        <div>
          <Button type="submit" isLoading={loading}>
            {price > 0 ? `Pay $${price / 100}` : "Confirm Booking"}
          </Button>
        </div>
      </S.PaymentCheckout>
    </S.PaymentCheckoutContainer>
  );
};
