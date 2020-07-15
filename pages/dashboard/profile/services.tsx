import React from "react";
import Profile from "../../../src/Profile/Profile";
import Head from "next/head";

export default () => {
  return (
    <>
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <Profile />
    </>
  );
};
