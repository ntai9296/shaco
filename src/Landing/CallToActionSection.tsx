import React from "react";
import Link from "next/link";
import { CommonButton } from "../common/Button";
import styled from "styled-components";

const CallToActionSection = styled.section`
  background: #f2f3f3;
  padding: 100px 0;
`;

const CallToActionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    position: absolute;
    left: 0;
  }
`;

const CtaButton = styled(CommonButton)`
  border-radius: 40px;
  padding: 20px 40px;
  font-weight: bold;
`;

export default () => {
  return (
    <CallToActionSection>
      <CallToActionContainer>
        <Link href="/early_access">
          <CtaButton flex={false}>Get Early Access</CtaButton>
        </Link>
      </CallToActionContainer>
    </CallToActionSection>
  );
};
