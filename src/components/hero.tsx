"use client";

import React from "react";
import Profile from "./profile";
import SkillStack from "./skill-stack";

export default function Hero() {

    return (
        <div className="w-full h-auto px-6 py-8 bg-surface text-foreground rounded-b-2xl">
            <div className="flex flex-col justify-start items-start mt-16">
                <div className="flex flex-col md:flex-row justify-start items-start gap-x-0 md:gap-x-4 gap-y-4 md:gap-y-0">
                    <Profile />
                    <SkillStack />
                </div>
            </div>
        </div >
    );
}