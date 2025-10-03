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
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
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
    title: "ミーグリレポ",
    url: "/repo",
    icon: NotesIcon,
  },
  {
    title: "参戦写真",
    url: "/gallery",
    icon: CollectionsIcon,
  },
  {
    title: "設定",
    url: "/",
    icon: SettingsIcon,
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
      <SidebarFooter className="bg-black/80 flex-Start flex-col">
        {
          isLogged ? (
            <div className="flex-Between w-full">
              <div className="flex-Center bg-white text-black rounded-full m-2 p-2 ">
                <PersonIcon />
              </div>
              <div className="flex-Start flex-col w-full font-semibold ">
                <div className="w-full text-md ">ゲストさん</div>
                <div className="w-full text-sm ">guestuser@gmail.com</div>
              </div>
            </div>
          ) : (
            <Button className="flex-Center hover:cursor-pointer transition-transform transform hover:scale-105 duration-100 ">
              <LoginIcon />
            </Button>
          )
        }
      </SidebarFooter>
    </Sidebar>
  )
}