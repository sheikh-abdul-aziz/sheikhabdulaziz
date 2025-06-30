import "./globals.css";
import React from "react";
import { Host_Grotesk, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Floating_Dock } from "@/components/floating-dock";

export const fontLabel = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-label",
	display: "swap"
})

export const fontDisplay = Host_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700", "800"],
	variable: "--font-display",
	display: "swap",
});

export const metadata = {
	title: "Entrepreneur Aziz",
	description: "Hi, I&apos;m Sheikh Abdul Aziz — An Entrepreneur, Frontend Developer & Web Designer — helping businesses grow with elegant design and powerful development."
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
	return (
		<html lang="en" suppressHydrationWarning suppressContentEditableWarning>
			<body className={`${fontDisplay.className} antialiased `}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<Header />
					{children}
					<Floating_Dock />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}