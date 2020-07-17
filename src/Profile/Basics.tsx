import React, { useState, useEffect, useRef } from "react";
import { User } from "react-feather";
import _ from "lodash";
import * as S from "./Basics.styled";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as ProfileAPI from "../../graphql/Profile/ProfileAPI";
import * as Utility from "../common/utility";
import { getCurrentUserProfileQuery_currentUser_profile } from "../../graphql/generated";
import Button from "../common/Button";

export default () => {
  const profilePhotoRef = useRef<any>();
  const coverPhotoRef = useRef<any>();
  const introVideoRef = useRef<any>();

  const { data } = UserAPI.getCurrentUserProfile();
  const [updateProfile] = ProfileAPI.updateProfile();

  const [profile, setProfile] = useState<
    getCurrentUserProfileQuery_currentUser_profile | undefined
  >(undefined);
  const [profileSlug, setProfileSlug] = useState("");
  const [profileSlugError, setProfileSlugError] = useState("");

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
            },
          },
        });
      },
      500
    )
  );

  const updateProfileSlugDebounce = useRef(
    _.debounce(async (profileId: string, slug: string) => {
      try {
        setProfileSlugError("");
        const result = await updateProfile({
          variables: {
            input: {
              profileId,
              slug,
            },
          },
        });
      } catch (error) {
        setProfileSlugError(error.message);
      }
    }, 500)
  );

  useEffect(() => {
    if (data?.currentUser?.profile) {
      setProfile(data.currentUser.profile);
      setProfileSlug(data.currentUser.profile.slug || "");
    }
  }, [data]);

  const onChangeProfile = (field: string, value: any) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
      updateProfileDebounce.current({ ...profile, [field]: value });
    }
  };

  const onUploadProfilePhoto = async () => {
    Utility.showWorkingOverlay();
    try {
      const result = await Utility.uploadToS3(profilePhotoRef.current.files[0]);
      if (profile) {
        updateProfile({
          variables: {
            input: {
              profileId: profile.id,
              profilePhotoUrl: result.Location,
            },
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  const onUploadCoverPhoto = async () => {
    Utility.showWorkingOverlay();
    try {
      const result = await Utility.uploadToS3(coverPhotoRef.current.files[0]);
      if (profile) {
        updateProfile({
          variables: {
            input: {
              profileId: profile.id,
              coverPhotoUrl: result.Location,
            },
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  const onUploadIntroVideo = async () => {
    Utility.showWorkingOverlay();
    try {
      const result = await Utility.uploadToS3(introVideoRef.current.files[0]);
      if (profile) {
        updateProfile({
          variables: {
            input: {
              profileId: profile.id,
              introVideoUrl: result.Location,
            },
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  const onChangeProfileSlug = async (slug: string) => {
    if (profile) {
      setProfileSlug(slug.trim());
      updateProfileSlugDebounce.current(profile.id, slug.trim());
    }
  };

  return (
    <S.Body>
      <S.BodyLeft>
        <S.Panel>
          <S.IntroRow>
            <S.IntroLeft>
              <S.ProfilePhotoField>
                <S.Label>Profile photo</S.Label>
                <S.ProfilePhoto
                  onClick={() => {
                    if (profilePhotoRef.current) {
                      profilePhotoRef.current.click();
                    }
                  }}
                  url={profile?.profilePhotoUrl || ""}
                >
                  {!profile?.profilePhotoUrl && (
                    <S.DefaultPhoto>
                      <User width={64} height={64} />
                    </S.DefaultPhoto>
                  )}
                  <S.ChangePhoto>
                    <b>Change photo</b>
                  </S.ChangePhoto>
                </S.ProfilePhoto>
              </S.ProfilePhotoField>
              <input
                onChange={onUploadProfilePhoto}
                accept="image/*"
                ref={profilePhotoRef}
                style={{ display: "none " }}
                type="file"
                value=""
              />
            </S.IntroLeft>
            <S.IntroRight>
              <S.ProfilePhotoField>
                <S.Label>Intro video</S.Label>
                {profile?.introVideoUrl ? (
                  <Input
                    value={profile?.introVideoUrl}
                    onChange={(e) => onChangeProfile("introVideoUrl", e.target.value)}
                  />
                ) : (
                  <Button
                    onClick={() => introVideoRef.current.click()}
                    flex={false}
                  >
                    Upload video
                  </Button>
                )}
              </S.ProfilePhotoField>
              <input
                onChange={onUploadIntroVideo}
                accept="video/*"
                ref={introVideoRef}
                style={{ display: "none " }}
                type="file"
                value=""
              />
            </S.IntroRight>
          </S.IntroRow>
          <S.Row>
            <S.ProfilePhotoField>
              <S.Label>Cover photo</S.Label>
              <S.CoverPhoto
                onClick={() => {
                  if (coverPhotoRef.current) {
                    coverPhotoRef.current.click();
                  }
                }}
                url={profile?.coverPhotoUrl || ""}
              >
                {!profile?.coverPhotoUrl ? (
                  <S.CoverPhotoMessage>
                    Click to add cover photo
                  </S.CoverPhotoMessage>
                ) : (
                  <S.ChangeCoverPhoto>
                    <b>Change cover photo</b>
                  </S.ChangeCoverPhoto>
                )}
              </S.CoverPhoto>
              <input
                onChange={onUploadCoverPhoto}
                accept="image/*"
                ref={coverPhotoRef}
                style={{ display: "none " }}
                type="file"
                value=""
              />
            </S.ProfilePhotoField>
          </S.Row>
          <S.Row>
            <S.ProfilePhotoField>
              <S.Label>Page URL</S.Label>
              <div>
                tryfireside.com/
                <S.PageURLInput
                  placeholder="Your page "
                  value={profileSlug}
                  onChange={(e) => onChangeProfileSlug(e.target.value)}
                />
              </div>
              {profileSlugError && (
                <S.SlugError>{profileSlugError}</S.SlugError>
              )}
            </S.ProfilePhotoField>
          </S.Row>
        </S.Panel>
        <S.Panel>
          <S.Label>About your page</S.Label>
          <S.PageNameRow>
            <S.PageNameField>
              <Input
                label="Page name"
                value={profile?.name || ""}
                onChange={(e) => onChangeProfile("name", e.target.value)}
              />
            </S.PageNameField>
          </S.PageNameRow>
          {/* <S.CategoryRow>
            <S.CategoryField>
              <Select label="Category">
                <option>Hello world</option>
              </Select>
            </S.CategoryField>
          </S.CategoryRow> */}
          <S.ShortDescriptionRow>
            <S.ShortDescriptionField>
              <Input
                label="Short description"
                value={profile?.shortDescription || ""}
                onChange={(e) =>
                  onChangeProfile("shortDescription", e.target.value)
                }
              />
            </S.ShortDescriptionField>
          </S.ShortDescriptionRow>
          <S.ShortDescriptionRow>
            <S.ShortDescriptionField>
              <Textarea
                rows={8}
                label="About you"
                value={profile?.about || ""}
                onChange={(e) => onChangeProfile("about", e.target.value)}
              />
            </S.ShortDescriptionField>
          </S.ShortDescriptionRow>
        </S.Panel>
      </S.BodyLeft>
      {/* <S.BodyRight>
        <S.Panel>
          <S.CheckList>CHECKLIST</S.CheckList>
        </S.Panel>
      </S.BodyRight> */}
    </S.Body>
  );
};
