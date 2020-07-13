import React from "react";
import {
  ArrowRight,
  User,
  PhoneIncoming,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  DollarSign,
  LogOut,
} from "react-feather";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import * as S from "./DashboardSidebar.styled";
import * as UserAPI from "../../../graphql/User/UserAPI";

export default () => {
  const { data: userData } = UserAPI.getCurrentUser();
  const router = useRouter();
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
              <img
                alt="avatar"
                src={
                  userData.currentUser.profile.profilePhotoUrl ||
                  "https://storage.googleapis.com/superpeer-prod.appspot.com/hosts/Lx0I2Irrvc0OQBBM8Nvc/s0u1qmhwg6c21@s_800.jpg"
                }
              />
            </S.Avatar>
            <S.ProfileInfo>
              <S.ProfileName>
                {userData.currentUser.profile.firstName}{" "}
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
      <Link href="/dashboard/calls">
        <S.SidebarItem isActive={false}>
          <PhoneIncoming width={15} height={15} />
          Calls
        </S.SidebarItem>
      </Link>
      <Link href="/dashboard/availability">
        <S.SidebarItem isActive={false}>
          <Calendar width={15} height={15} />
          Availability
        </S.SidebarItem>
      </Link>

      <S.MenuTitle>Account</S.MenuTitle>
      <Link href="/dashboard/profile">
        <S.SidebarItem isActive={false}>
          <User width={15} height={15} />
          Profile
        </S.SidebarItem>
      </Link>

      <Link href="/dashboard/payout">
        <S.SidebarItem isActive={false}>
          <DollarSign width={15} height={15} />
          Payouts
        </S.SidebarItem>
      </Link>

      <Link href="/dashboard/notifications">
        <S.SidebarItem isActive={false}>
          <Bell width={15} height={15} />
          Notifications
        </S.SidebarItem>
      </Link>

      <Link href="/dashboard/settings">
        <S.SidebarItem isActive={false}>
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
