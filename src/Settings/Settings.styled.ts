import styled from 'styled-components';

export const Container = styled.div`
  padding: 36px;
  width: 50%;

  @media all and (max-width: 1366px) {
    width: 100%;
  }
`;

export const Heading = styled.h1`
  margin: 0 0 25px 0;
`;

export const Title = styled.h2`
  margin: 0 0 25px 0;
`;

export const Paragraph = styled.p`
  margin-bottom: 25px;
`;

export const Hr = styled.hr`
  border-color: #f3f4f3;
  margin: 36px 0;
`;

export const FormGroup = styled.div`
  padding-right: 24px;

  @media all and (max-width: 1366px) {
    width: 100%;
    padding-right: 0;
    padding-top: 12px;
  }
`;

export const FormWrap = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
`;

export const SubmitButton = styled.button`
  width: auto;
  background: #0070f3;
  color: #fff;
  font-weight: bold;
  height: 42px;
  padding: 4px 20px;
  font-size: 14px;
  border-radius: 8px;
`;

export const Label = styled.div`
  margin-bottom: 8px;
`;
