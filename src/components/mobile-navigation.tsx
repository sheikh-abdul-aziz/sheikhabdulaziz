"use client";

import { ChevronRight } from "lucide-react";
import { type TablerIcon } from "@tabler/icons-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    MobileMenuGroup,
    MobileMenuGroupLabel,
    MobileMenu,
    MobileMenuButton,
    MobileMenuItem,
    MobileMenuSub,
    MobileMenuSubButton,
    MobileMenuSubItem,
    MobileMenuProvider,
} from "@/components/ui/mobile-menu";
import { Label } from "./ui/label";
import Link from "next/link";
import { Separator } from "./ui/separator";

export function MobileNavigation({
    itemFirst,
    itemSecond,
}: {
    itemFirst: {
        title: string;
        url: string;
    }[];
    itemSecond: {
        title: string;
        url: string;
        icon?: TablerIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    return (
        <MobileMenuProvider>
            <MobileMenuGroup>
                {/* General Section */}
                <MobileMenuGroupLabel>General</MobileMenuGroupLabel>
                <MobileMenu className="group-data-[collapsible=icon]:hidden">
                    {itemFirst.map((item) => (
                        <MobileMenuItem key={item.title}>
                            <MobileMenuButton asChild>
                                <Link href={item.url}>
                                    <Label>{item.title}</Label>
                                </Link>
                            </MobileMenuButton>
                        </MobileMenuItem>
                    ))}
                </MobileMenu>

                <Separator orientation="horizontal" className="my-3" />

                {/* Resources Section */}
                <MobileMenuGroupLabel>Resources</MobileMenuGroupLabel>
                <MobileMenu>
                    {itemSecond.map((item) => (
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                            <MobileMenuItem>
                                <CollapsibleTrigger asChild>
                                    <MobileMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon/>}
                                        <Label>{item.title}</Label>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </MobileMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <MobileMenuSub>
                                        {item.items?.map((subItem) => (
                                            <MobileMenuSubItem key={subItem.title}>
                                                <MobileMenuSubButton asChild>
                                                    <Link href={subItem.url}>
                                                        <Label>{subItem.title}</Label>
                                                    </Link>
                                                </MobileMenuSubButton>
                                            </MobileMenuSubItem>
                                        ))}
                                    </MobileMenuSub>
                                </CollapsibleContent>
                            </MobileMenuItem>
                        </Collapsible>
                    ))}
                </MobileMenu>
            </MobileMenuGroup>
        </MobileMenuProvider>
    );
}