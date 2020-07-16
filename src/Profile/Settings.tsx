import React, { useState, useEffect, useRef } from "react";
import { BlockPicker } from "react-color";
import _ from "lodash";
import * as S from "./Settings.styled";
import Input from "../common/Input";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as ProfileAPI from "../../graphql/Profile/ProfileAPI";
import { getCurrentUserProfileQuery_currentUser_profile } from "../../graphql/generated";
import { Styling } from "../common/utility";
import Popper from "../common/Popper";

export default () => {
  const { data } = UserAPI.getCurrentUserProfile();
  const [updateProfile] = ProfileAPI.updateProfile();

  const [profile, setProfile] = useState<
    getCurrentUserProfileQuery_currentUser_profile | undefined
  >(undefined);
  const [brandColorOpen, setBrandColorOpen] = useState(false);

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
              brandColor: updatedProfile.brandColor,
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
          <S.BrandColorField>
            <label>Brand color</label>
            <Popper
              onClickOutside={() => setBrandColorOpen(false)}
              isOpen={brandColorOpen}
              position="right"
              content={
                <BlockPicker
                  colors={[
                    "#162447",
                    "#1f4068",
                    "#e43f5a",
                    "#24a19c",
                    "#654062",
                    "#0f4c75",
                    "#438a5e",
                    "#0f4c75",
                    "#c02739",
                    "#000000"
                  ]}
                  color={profile?.brandColor || Styling.primaryColor}
                  onChangeComplete={(e) => onChangeProfile("brandColor", e.hex)}
                />
              }
            >
              <S.BrandColorButton
                onClick={() => setBrandColorOpen(!brandColorOpen)}
              >
                Change color
              </S.BrandColorButton>
            </Popper>
            <p>
              Choose any color—provided it’s dark enough to be legible—by
              clicking on the button.
            </p>
          </S.BrandColorField>
        </S.CategoryRow>
      </S.Panel>
    </S.Body>
  );
};
