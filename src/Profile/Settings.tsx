import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import * as S from "./Settings.styled";
import Input from "../common/Input";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as ProfileAPI from "../../graphql/Profile/ProfileAPI";
import { getCurrentUserProfileQuery_currentUser_profile } from "../../graphql/generated";
import Select from "../common/Select";

export default () => {
  const { data } = UserAPI.getCurrentUserProfile();
  const [updateProfile] = ProfileAPI.updateProfile();

  const [profile, setProfile] = useState<
    getCurrentUserProfileQuery_currentUser_profile | undefined
  >(undefined);

  const updateProfileDebounce = useRef(
    _.debounce(
      (updatedProfile: getCurrentUserProfileQuery_currentUser_profile) => {
        updateProfile({
          variables: {
            input: {
              profileId: updatedProfile.id,
              name: updatedProfile.name,
              shortDescription: updatedProfile.shortDescription,
              about: updatedProfile.about,
              firstName: updatedProfile.firstName,
              lastName: updatedProfile.lastName,
            },
          },
        });
      },
      500
    )
  );

  useEffect(() => {
    if (data?.currentUser?.profile) {
      setProfile(data.currentUser.profile);
    }
  }, [data]);

  const onChangeProfile = (field: string, value: any) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
      updateProfileDebounce.current({ ...profile, [field]: value });
    }
  };

  return (
    <S.Body>
      <S.Panel>
        <S.Label>Your account details</S.Label>
        <S.PageNameRow>
          <S.FirstNameField>
            <Input
              label="First name"
              value={profile?.firstName || ""}
              onChange={(e) => onChangeProfile("firstName", e.target.value)}
            />
          </S.FirstNameField>
          <S.LastNameField>
            <Input
              label="Last name"
              value={profile?.lastName || ""}
              onChange={(e) => onChangeProfile("lastName", e.target.value)}
            />
          </S.LastNameField>
        </S.PageNameRow>
        <S.CategoryRow>
          <S.CategoryField>
            <Select label="Country of Residence">
              <option>Hello world</option>
            </Select>
          </S.CategoryField>
        </S.CategoryRow>
      </S.Panel>
    </S.Body>
  );
};
