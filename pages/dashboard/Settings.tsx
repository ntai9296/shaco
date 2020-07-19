import React from "react";
import * as S from "../../src/Settings/Settings.styled";
import Router from "next/router";
import Select from "react-select";
import moment from "moment-timezone";
import sortBy from "lodash.sortby";
import Input from "../../src/common/Input";
import * as UserAPI from "../../graphql/User/UserAPI";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";

export const formatTimezone = (tzString: any) =>
  `(GMT${moment.tz(tzString).format("Z")}) ${tzString} (${moment()
    .tz(tzString)
    .format("h:mm A")})`;

export const getTimezoneProps = (tzString: any) => {
  const tz = moment.tz(tzString);
  const tzStringOffset = tz.format("Z").replace(":00", "").replace(":30", ".5");
  let x = tzStringOffset === 0 ? 0 : parseInt(tzStringOffset).toFixed(2);

  return {
    label: formatTimezone(tzString),
    value: `${tzString}`,
    time: `${x}`,
    offset: tz._offset,
  };
};

const TIME_ZONE_LIST = [];

export default () => {
  const { data: userData, loading } = UserAPI.getCurrentUser();

  if (loading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }

  const timeZones = moment.tz.names().map((tz) => {
    return getTimezoneProps(tz);
  });

  const currentTimeZone = timeZones.find(
    (item) => item.value === userData.currentUser.timezone
  );

  console.log(currentTimeZone);
  const options = sortBy(timeZones, [
    function (el) {
      return -el.time;
    },
  ]);

  return (
    <DashboardLayout>
      <S.Container>
        <S.Heading>Settings</S.Heading>
        <S.Title>Timezone</S.Title>
        <S.Paragraph>
          When you change time zone in your Superpeer account, your availability
          hours and scheduled calls adapt to the new time zone. For example, a
          10 AM call PT changes to a 1 PM ET call if you travel from San
          Francisco to New York. No matter where you set your weekly
          availability, everyone will see it in their own time zone.
        </S.Paragraph>
        <Select
          options={options}
          placeholder="Select your timezone"
          defaultValue={currentTimeZone}
        />
        <S.Hr />
        <S.Title>Change password</S.Title>

        <S.FormWrap>
          <S.FormGroup>
            <S.Label>Current password</S.Label>
            <Input />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>New password</S.Label>
            <Input />
          </S.FormGroup>

          <S.FormGroup>
            <S.SubmitButton>Change</S.SubmitButton>
          </S.FormGroup>
        </S.FormWrap>
      </S.Container>
    </DashboardLayout>
  );
};
