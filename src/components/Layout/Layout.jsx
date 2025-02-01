import { useState } from "react";
import { useStore } from "@/store";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";

import { SidebarLayout } from "../Catalyst/sidebar-layout";

import { Avatar } from "@/components/Catalyst/avatar";

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/Catalyst/dropdown";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/Catalyst/sidebar";

import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/Catalyst/navbar";

import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const user = useStore((state) => state.user);
  const userData = useStore((state) => state.userData);
  const updateUser = useStore((state) => state.updateUser);
  const updateUserData = useStore((state) => state.updateUserData);

  const supabase = createClient();

  useEffect(() => {
    setIsLoading(true);

    const getUserBySession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let { data: user_data, error } = await supabase
        .from("user_data")
        .select()
        .eq("id", user.id);

      updateUser(user);
      updateUserData(user_data[0]);
    };

    if (!user) {
      router.push("/");
    }

    setIsLoading(false);
  }, [user]);

  const signOutUser = async () => {
    console.log("SIGNING OUT");

    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/");
    }

    console.log(error);
  };

  function getFirstPathSegment(pathname) {
    // Split the pathname into segments using the first slash as a delimiter
    const segments = pathname.split("/");

    // If there are more than two segments, return the first two segments joined by a slash
    if (segments.length > 2) {
      return segments.slice(0, 2).join("/");
    }

    // Otherwise, return the entire pathname
    return pathname;
  }

  return (
    <>
      {user && (
        <SidebarLayout
          sidebar={
            <Sidebar>
              <SidebarHeader>
                <SidebarSection>
                  <SidebarLabel className="font-bold text-evening-sea-500">
                    Digestitrak
                  </SidebarLabel>
                </SidebarSection>
              </SidebarHeader>
              <SidebarBody>
                <SidebarSection>
                  <SidebarItem
                    current={getFirstPathSegment(router.asPath) == "/dashboard"}
                    href="/dashboard"
                  >
                    <HomeIcon />
                    <SidebarLabel>Dashboard</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem
                    current={
                      getFirstPathSegment(router.asPath) == "/symptom-logs"
                    }
                    href="/symptom-logs"
                  >
                    <Square2StackIcon />
                    <SidebarLabel>Symptom Logs</SidebarLabel>
                  </SidebarItem>
                  <SidebarItem
                    current={getFirstPathSegment(router.asPath) == "/meal-logs"}
                    href="/meal-logs"
                  >
                    <TicketIcon />
                    <SidebarLabel>Meal Logs</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>
                <SidebarSpacer />
              </SidebarBody>
              <SidebarFooter>
                <Dropdown>
                  <DropdownButton as={SidebarItem}>
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar
                        src={userData.avatar}
                        className="size-10"
                        alt=""
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm/5 font-medium text-evening-sea-900 dark:text-white">
                          {user.email}
                        </span>
                      </span>
                    </span>
                    <ChevronUpIcon className="!text-evening-sea-100" />
                  </DropdownButton>
                  <DropdownMenu className="min-w-64" anchor="top start">
                    <DropdownItem href="/my-profile">
                      <UserIcon />
                      <DropdownLabel>My profile</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={signOutUser}>
                      <ArrowRightStartOnRectangleIcon />
                      <DropdownLabel>Sign out</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </SidebarFooter>
            </Sidebar>
          }
          navbar={
            <Navbar>
              <NavbarSection>
                <NavbarLabel>Tailwind Labs</NavbarLabel>
              </NavbarSection>
              <NavbarDivider className="max-lg:hidden" />
              <NavbarSection className="max-lg:hidden">
                <NavbarItem href="/" current>
                  Home
                </NavbarItem>
                <NavbarItem href="/events">Events</NavbarItem>
                <NavbarItem href="/orders">Orders</NavbarItem>
              </NavbarSection>
              <NavbarSpacer />
              <NavbarSection>
                <Dropdown>
                  <DropdownButton as={NavbarItem}>
                    <Avatar src={userData.avatar} />
                  </DropdownButton>
                  <DropdownMenu className="min-w-64" anchor="bottom end">
                    <DropdownItem href="/my-profile">
                      <UserIcon />
                      <DropdownLabel>My profile</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="/share-feedback">
                      <LightBulbIcon />
                      <DropdownLabel>Share feedback</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="/logout">
                      <ArrowRightStartOnRectangleIcon />
                      <DropdownLabel>Sign out</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarSection>
            </Navbar>
          }
        >
          {isLoading ? (
            <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>{children}</>
          )}
        </SidebarLayout>
      )}
    </>
  );
};

export default Layout;
