"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarItem, SidebarMenu, SidebarMenuButton, SidebarMenuGroup, 
    SidebarMenuItem, 
    SidebarMenuLabel, SidebarMenuSeparator, SidebarTrigger
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import {cn} from "@/lib/utils"
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard.user-button";
const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    }, 
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

const secondSection = [
    
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    }
];

export const DashboardSidebar = () => {
    const pathname = usePathname();
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                <Image src= "/logo.svg" height={36} width={36} alt="MeetAi" />
                <p className="text-2xl font-semibold">MeetAI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"/>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {
                            firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    isActive={pathname === item.href}
                                    className={cn(
                                        "h-10 hover:bg-liner-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        pathname === item.href && "bg-linear-to-r/okch border-[5D6B68]/10"
                                    )}>
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"/>
            </div>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {
                            secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    isActive={pathname === item.href}
                                    className={cn(
                                        "h-10 hover:bg-liner-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        pathname === item.href && "bg-linear-to-r/okch border-[5D6B68]/10"
                                    )}>
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-white">

                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}