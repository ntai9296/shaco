import React, { useEffect } from "react";
import Router from "next/router";

export default () => {
  useEffect(() => {
    Router.replace("/dashboard/requests");
  }, []);
  return null;
};
