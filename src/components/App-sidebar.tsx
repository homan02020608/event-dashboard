"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentIcon from '@mui/icons-material/Payment';
import CollectionsIcon from '@mui/icons-material/Collections';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from "./ui/button";
import { useState } from "react";

const items = [
  {
    title: "ホーム",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "参戦履歴",
    url: "/events",
    icon: EventNoteIcon,
  },
  {
    title: "費用一覧",
    url: "/expenses",
    icon: PaymentIcon,
  },
  {
    title: "参戦写真",
    url: "/gallery",
    icon: CollectionsIcon,
  },
]


export function AppSidebar() {
  const [isLogged, setIsLoggedIn] = useState(true)
  return (
    <Sidebar variant="sidebar" className="text-white border-none bg-gray-500 rounded-full">
      <SidebarHeader className="bg-black/80">ダッシュボード</SidebarHeader>
      <SidebarContent className="bg-black/80 " >
        <SidebarGroup />
        <SidebarGroupLabel className="text-white">Event-Dashboard</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-10 p-4">
            {items.map((item) => (
              <SidebarMenuButton asChild key={item.title} className="p-2 py-6 text-white rounded-md hover:bg-white/50">
                <Link href={`${item.url}`}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-black/80 flex-Start flex-row ">
        <Button className="flex-Center hover:cursor-pointer transition-transform transform hover:scale-105 duration-100  ">
          <SettingsIcon />

        </Button>
        {
          isLogged ? (
            <div className="flex-Center gap-2">
              <Button className="flex-Center hover:cursor-pointer transition-transform transform hover:scale-105 duration-100 ">
                <PersonIcon />
              </Button>
              <Button className="flex-Center hover:cursor-pointer transition-transform transform hover:scale-105 duration-100 ">
                <LogoutIcon />
              </Button>
            </div>
          ) : (
            <Button className="flex-Center hover:cursor-pointer transition-transform transform hover:scale-105 duration-100 ">
              <LoginIcon />
              <div></div>
            </Button>
          )
        }


      </SidebarFooter>
    </Sidebar>
  )
}