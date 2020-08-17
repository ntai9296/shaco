import React, { useState, useRef } from "react";
import { BlockPicker } from "react-color";
import * as S from "../../src/Dashboard/Profile/Profile.styled";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as ProfileAPI from "../../graphql/Profile/ProfileAPI";
import * as Utility from "../../src/common/utility";
import Head from "next/head";
import withDashboard from "../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../src/common/Layout/DashboardPageContent";
import Button from "../../src/common/Button";
import { profileFragment } from "../../graphql/generated";
import Input from "../../src/common/Input";
import Popper from "../../src/common/Popper";
import Notification from "../../src/common/Notification";

export default withDashboard({ noContentPadding: true })(() => {
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
    },
    onError: (error) => {
      Utility.showPageNotice(error.message, "error")
    }
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
            facebookUrl: profile.facebookUrl,
            twitchUrl: profile.twitchUrl,
            instagramUrl: profile.instagramUrl,
            twitterUrl: profile.twitterUrl,
            youtubeUrl: profile.youtubeUrl,
          },
        },
      });
    }
  };

  if (!profile) {
    return null;
  }
  return (
    <DashboardPageContent
      title="Profile"
      filter={
        <Button isLoading={loading} onClick={onUpdateProfile} flex={false}>
          Save
        </Button>
      }
    >
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <div>
        <S.ProfileSectionContainer>
          <S.ProfileSectionContent>
            <S.ServiceImageContainer src={profile.coverPhotoUrl}>
              <S.ChangeCoverImageButton
                onClick={() => coverPhotoRef.current.click()}
              >
                Change cover
              </S.ChangeCoverImageButton>
            </S.ServiceImageContainer>
            <input
              onChange={onUploadCoverPhoto}
              accept="image/*"
              ref={coverPhotoRef}
              style={{ display: "none " }}
              type="file"
              value=""
            />

            <S.AvatarContainer>
              <S.AvatarImg
                onClick={() => profilePhotoRef.current.click()}
                src={profile.profilePhotoUrl}
              />
              <input
                onChange={onUploadProfilePhoto}
                accept="image/*, video/*"
                ref={profilePhotoRef}
                style={{ display: "none " }}
                type="file"
                value=""
              />
            </S.AvatarContainer>
            <S.AvatarHelper>Click to upload profile photo</S.AvatarHelper>

            <S.BodyContainer>
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
                          type={
                            availabilityData.profile?.id ? "error" : "success"
                          }
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
                          "#f77f00",
                          "#000000",
                        ]}
                        color={
                          profile?.brandColor || Utility.Styling.primaryColor
                        }
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
                      Change color
                    </S.BrandColorButton>
                  </Popper>
                  <p>
                    Choose any color—provided it’s dark enough to be legible—by
                    clicking on the button.
                  </p>
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Input
                    value={profile.facebookUrl || ""}
                    onChange={(e) =>
                      onChangeProfile("facebookUrl", e.target.value)
                    }
                    label="Facebook profile"
                    placeholder="https://www.facebook.com/username"
                  />
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Input
                    value={profile.instagramUrl || ""}
                    onChange={(e) =>
                      onChangeProfile("instagramUrl", e.target.value)
                    }
                    label="Instagram profile"
                    placeholder="https://www.instagram.com/username"
                  />
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Input
                    value={profile.twitterUrl || ""}
                    onChange={(e) =>
                      onChangeProfile("twitterUrl", e.target.value)
                    }
                    label="Twitter profile"
                    placeholder="https://www.twitter.com/username"
                  />
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Input
                    value={profile.youtubeUrl || ""}
                    onChange={(e) =>
                      onChangeProfile("youtubeUrl", e.target.value)
                    }
                    label="Youtube profile"
                    placeholder="https://www.youtube.com/c/username"
                  />
                </S.FieldGroup>
              </S.Row>

              <S.Row>
                <S.FieldGroup>
                  <Input
                    value={profile.twitchUrl || ""}
                    onChange={(e) =>
                      onChangeProfile("twitchUrl", e.target.value)
                    }
                    label="Twitch profile"
                    placeholder="https://www.twitch.tv/username"
                  />
                </S.FieldGroup>
              </S.Row>
            </S.BodyContainer>
          </S.ProfileSectionContent>
        </S.ProfileSectionContainer>
      </div>
    </DashboardPageContent>
  );
});
