import React from "react";
import {
  ArrowRight,
  User,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  DollarSign,
  LogOut,
  Star,
} from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./DashboardSidebar.styled";
import * as UserAPI from "../../../graphql/User/UserAPI";

export default () => {
  const { data: userData } = UserAPI.getCurrentUser();
  const router = useRouter();

  const activeRoute = (routeName: string) =>
    router.route.includes(`/dashboard${routeName}`);
  return (
    <S.Sidebar>
      <S.Brand>
        <Link href="/">
          <a>Fireside</a>
        </Link>
      </S.Brand>
      {userData?.currentUser?.profile && (
        <Link
          href={
            userData.currentUser.roles.includes("host")
              ? "/host"
              : "/dashboard/profile"
          }
        >
          <S.Profile>
            <S.Avatar>
              {userData?.currentUser?.profile?.profilePhotoUrl ? (
                <img
                  alt="avatar"
                  src={userData.currentUser.profile.profilePhotoUrl}
                />
              ) : (
                <S.ProfilePlaceholder>
                  <User />
                </S.ProfilePlaceholder>
              )}
            </S.Avatar>
            <S.ProfileInfo>
              <S.ProfileName>
                {userData.currentUser.profile.firstName || "Your name"}{" "}
                {userData.currentUser.profile.lastName}
              </S.ProfileName>
              <S.ViewProfile>
                {userData.currentUser.roles.includes("host")
                  ? "Public profile"
                  : "Become a host"}
                <ArrowRight width={15} height={15} />
              </S.ViewProfile>
            </S.ProfileInfo>
          </S.Profile>
        </Link>
      )}
      <Link href="/dashboard/bookings">
        <S.SidebarItem
          isActive={activeRoute("/bookings") || router.route === "/dashboard"}
        >
          <Star width={15} height={15} />
          Bookings
        </S.SidebarItem>
      </Link>
      <Link href="/dashboard/availability">
        <S.SidebarItem isActive={activeRoute("/availability")}>
          <Calendar width={15} height={15} />
          Availability
        </S.SidebarItem>
      </Link>

      <S.MenuTitle>Account</S.MenuTitle>
      <Link href="/dashboard/profile">
        <S.SidebarItem isActive={activeRoute("/profile")}>
          <User width={15} height={15} />
          Profile
        </S.SidebarItem>
      </Link>

      <Link href="/dashboard/payout">
        <S.SidebarItem isActive={activeRoute("/payout")}>
          <DollarSign width={15} height={15} />
          Payouts
        </S.SidebarItem>
      </Link>

      <Link href="/dashboard/notifications">
        <S.SidebarItem isActive={activeRoute("/notifications")}>
          <Bell width={15} height={15} />
          Notifications
        </S.SidebarItem>
      </Link>

      <Link href="/dashboard/settings">
        <S.SidebarItem isActive={activeRoute("/settings")}>
          <Settings width={15} height={15} />
          Settings
        </S.SidebarItem>
      </Link>

      <S.MenuTitle>Support</S.MenuTitle>

      <Link href="/dashboard/faqs">
        <S.SidebarItem>
          <Bell width={15} height={15} />
          FAQs
        </S.SidebarItem>
      </Link>

      <S.SidebarItem>
        <HelpCircle width={15} height={15} />
        Give feedback
      </S.SidebarItem>

      <S.SidebarItem
        style={{ marginTop: 30 }}
        isActive={false}
        onClick={UserAPI.logoutUser}
      >
        <LogOut width={15} height={15} />
        Logout
      </S.SidebarItem>
    </S.Sidebar>
  );
};
