import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
	IconBrandGithub,
	IconBrandX,
	IconExchange,
	IconHome,
	IconNewSection,
	IconTerminal2,
} from "@tabler/icons-react";

export function Floating_Dock() {
	const links = [
		{
			title: "Home",
			icon: (
				<IconHome className="h-full w-full text-muted-foreground" />
			),
			href: "#",
		},

		{
			title: "Products",
			icon: (
				<IconTerminal2 className="h-full w-full text-muted-foreground" />
			),
			href: "#",
		},
		{
			title: "Components",
			icon: (
				<IconNewSection className="h-full w-full text-muted-foreground" />
			),
			href: "#",
		},
		{
			title: "Aceternity UI",
			icon: (
				<img className="rounded-full h-full w-full"
					src="https://github.com/sheikh-abdul-aziz.png"
					alt="Aceternity Logo"
				/>
			),
			href: "#",
		},
		{
			title: "Changelog",
			icon: (
				<IconExchange className="h-full w-full text-muted-foreground" />
			),
			href: "#",
		},

		{
			title: "Twitter",
			icon: (
				<IconBrandX className="h-full w-full text-muted-foreground" />
			),
			href: "#",
		},
		{
			title: "GitHub",
			icon: (
				<IconBrandGithub className="h-full w-full text-muted-foreground" />
			),
			href: "#",
		},
	];
	return (
		<div className="fixed z-10 items-center justify-center h-[35rem] w-full">
			<FloatingDock items={links} />
		</div>
	);
}