import React, { useState, useRef } from "react";
import { Trash } from "react-feather";
import { BlockPicker } from "react-color";
import * as S from "./OnboardingProfile.styled";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as ProfileAPI from "../../graphql/Profile/ProfileAPI";
import * as Utility from "../common/utility";
import { profileFragment } from "../../graphql/generated";
import Input from "../common/Input";
import Popper from "../common/Popper";
import Button from "../common/Button";
import Notification from "../common/Notification";

export default ({ onNext }: any) => {
  const profilePhotoRef = useRef<any>();
  const coverPhotoRef = useRef<any>();

  const { data } = UserAPI.getCurrentUserProfile({
    onCompleted: (data) => {
      if (data?.currentUser?.profile) {
        setProfile(data?.currentUser?.profile);
      }
    },
  });

  const [
    checkSlugAvailability,
    { data: availabilityData },
  ] = ProfileAPI.checkProfileSlugAvailabilityLazy({
    fetchPolicy: "cache-first",
  });

  const [updateProfile, { loading }] = ProfileAPI.updateProfile({
    onCompleted: () => {
      setSlugRequest(false);
      onNext();
    },
  });

  const [profile, setProfile] = useState<profileFragment | undefined>(
    undefined
  );
  const [URLFocus, setURLFocus] = useState(false);
  const [brandColorOpen, setBrandColorOpen] = useState(false);
  const [slugRequest, setSlugRequest] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onUploadProfilePhoto = async () => {
    Utility.showWorkingOverlay();
    try {
      const result = await Utility.uploadToS3(profilePhotoRef.current.files[0]);
      if (profile) {
        onChangeProfile("profilePhotoUrl", result.Location);
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
      onChangeProfile("coverPhotoUrl", result.Location);
    } catch (error) {
      console.log(error.message);
    } finally {
      Utility.hideWorkingOverlay();
    }
  };

  const onChangeProfile = (field: string, value: any) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const onUpdateProfile = () => {
    if (profile) {
      if (!profile.slug) {
        return setErrors(["Page URL is missing"]);
      }
      updateProfile({
        variables: {
          input: {
            profileId: profile.id,
            name: profile.name,
            slug: profile.slug,
            shortDescription: profile.shortDescription,
            profilePhotoUrl: profile.profilePhotoUrl,
            coverPhotoUrl: profile.coverPhotoUrl,
            brandColor: profile.brandColor,
          },
        },
      });
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <S.ProfileContainer>
      <S.ProfileSectionContainer>
        <S.ProfileSectionContent>
          <S.Row>
            <S.FieldGroup>
              <Input
                onChange={(e) => onChangeProfile("name", e.target.value)}
                value={profile.name}
                label="Page title"
                placeholder="E.g: Fireside"
              />
            </S.FieldGroup>
          </S.Row>

          <S.Row>
            <S.FieldGroup>
              <label htmlFor="pageURL">Page URL</label>
              <S.CustomURLInput URLFocus={URLFocus}>
                <label htmlFor="pageURL">tryfireside.com/</label>
                <input
                  onChange={(e) =>
                    onChangeProfile("slug", e.target.value.trim())
                  }
                  value={profile.slug || ""}
                  onBlur={() => setURLFocus(false)}
                  onFocus={() => setURLFocus(true)}
                  id="pageURL"
                  placeholder="fireside"
                />
                {profile.slug != data?.currentUser?.profile?.slug && (
                  <a
                    onClick={() => {
                      if (profile.slug) {
                        setSlugRequest(true);
                        checkSlugAvailability({
                          variables: {
                            slug: profile.slug,
                          },
                        });
                      }
                    }}
                  >
                    Check
                  </a>
                )}
              </S.CustomURLInput>
              {profile.slug != data?.currentUser?.profile?.slug &&
                slugRequest &&
                availabilityData && (
                  <S.NotificationContainer>
                    <Notification
                      type={availabilityData.profile?.id ? "error" : "success"}
                      notifications={[
                        availabilityData.profile?.id
                          ? "URL is already taken"
                          : "URL is available",
                      ]}
                    />
                  </S.NotificationContainer>
                )}
            </S.FieldGroup>
          </S.Row>
          <S.Row>
            <S.FieldGroup>
              <Input
                onChange={(e) =>
                  onChangeProfile("shortDescription", e.target.value)
                }
                value={profile.shortDescription || ""}
                label="Short description"
                placeholder="Short description about your page"
              />
            </S.FieldGroup>
          </S.Row>

          <S.Row>
            <S.FieldGroup>
              <label>Profile photo / Intro video</label>
              <S.CustomPhotoIntroInput>
                <input readOnly value={profile.profilePhotoUrl || ""} />
                <a onClick={() => profilePhotoRef.current.click()}>Upload</a>
                <input
                  onChange={onUploadProfilePhoto}
                  accept="image/*, video/*"
                  ref={profilePhotoRef}
                  style={{ display: "none " }}
                  type="file"
                  value=""
                />
              </S.CustomPhotoIntroInput>
            </S.FieldGroup>
          </S.Row>
          <S.Row>
            <S.FieldGroup>
              {profile.coverPhotoUrl ? (
                <S.ServiceImageContainer src={profile.coverPhotoUrl}>
                  <S.ServiceItemImageHover
                    onClick={() => coverPhotoRef.current.click()}
                  >
                    Click to change image
                    <S.DeleteImageButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeProfile("coverPhotoUrl", "");
                      }}
                    >
                      <Trash
                        width={15}
                        height={15}
                        color={Utility.Styling.dangerColor}
                      />
                    </S.DeleteImageButton>
                  </S.ServiceItemImageHover>
                </S.ServiceImageContainer>
              ) : (
                <S.ImagePlaceholder
                  onClick={() => coverPhotoRef.current.click()}
                >
                  <b>Cover photo</b>
                  <div>Recommended size: 1600px wide by 400px tall</div>
                </S.ImagePlaceholder>
              )}
              <input
                onChange={onUploadCoverPhoto}
                accept="image/*"
                ref={coverPhotoRef}
                style={{ display: "none " }}
                type="file"
                value=""
              />
            </S.FieldGroup>
          </S.Row>
          <S.Row>
            <S.FieldGroup>
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
                      "#438a5e",
                      "#0f4c75",
                      "#c02739",
                      "#000000",
                    ]}
                    color={profile?.brandColor || Utility.Styling.primaryColor}
                    onChangeComplete={(e) =>
                      onChangeProfile("brandColor", e.hex)
                    }
                  />
                }
              >
                <S.BrandColorButton
                  onClick={() => setBrandColorOpen(!brandColorOpen)}
                  backgroundColor={
                    profile?.brandColor || Utility.Styling.primaryColor
                  }
                >
                  Click to change color
                </S.BrandColorButton>
              </Popper>
              <p>
                Choose any color—provided it’s dark enough to be legible—by
                clicking on the button.
              </p>
            </S.FieldGroup>
          </S.Row>
          {errors.length > 0 && (
            <S.Row>
              <S.NotificationContainerBottom>
                <Notification notifications={errors} type="error" />
              </S.NotificationContainerBottom>
            </S.Row>
          )}
          <S.Row>
            <Button isLoading={loading} onClick={onUpdateProfile}>
              Next
            </Button>
          </S.Row>
        </S.ProfileSectionContent>
      </S.ProfileSectionContainer>
    </S.ProfileContainer>
  );
};
