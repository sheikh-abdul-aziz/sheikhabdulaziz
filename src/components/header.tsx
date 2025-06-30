"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import ThemeSwitcher from "./theme-switcher";
import Search from "./search";
import { Separator } from "./ui/separator";
import { ThemeChanger } from "./theme-changer";

const Header = () => {
    const router = useRouter();

    const navigateHome = () => {
        router.push("/");
    };

    return (
        <header className="fixed z-20 top-0 left-0 right-0 w-full h-16 border-b border-border border-dashed rounded-b-2xl bg-surface backdrop-blur supports-[backdrop-filter]:bg-surface/80">
            <div className="flex items-center justify-between w-full h-full px-6">
                {/* MOBILE */}
                <div className="flex">
                    <Image onClick={navigateHome} src="/next.svg" width={96} height={32} alt="Next.js" />
                </div>

                <div className="flex items-center gap-x-2 w-auto h-auto">
                    {/* Theme Switcher */}
                    <div className="hidden lg:flex">
                        <ThemeSwitcher />
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden lg:flex w-auto h-4">
                        <Separator orientation="vertical" />
                    </div>

                    {/* Search and Notifications */}
                    <Search />
                    <Button variant="outlined" size="icon">
                        <Bell />
                    </Button>

                    {/* Vertical Divider */}
                    <div className="flex lg:hidden w-auto h-4">
                        <Separator orientation="vertical" />
                    </div>

                    {/* Theme Changer */}
                    <div className="flex lg:hidden">
                        <ThemeChanger />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;