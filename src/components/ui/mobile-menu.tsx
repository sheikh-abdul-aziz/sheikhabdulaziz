"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./tooltip"

const MOBILE_MENU_COOKIE_NAME = "mobile-menu:state"
const MOBILE_MENU_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const MOBILE_MENU_WIDTH = "16rem"
const MOBILE_MENU_WIDTH_ICON = "3rem"
const MOBILE_MENU_KEYBOARD_SHORTCUT = "b"

type MobileMenuContext = {
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    isMobile: boolean
    toggleMobileMenu: () => void
}

const MobileMenuContext = React.createContext<MobileMenuContext | null>(null)

function useMobileMenu() {
    const context = React.useContext(MobileMenuContext)
    if (!context) {
        throw new Error("useMobileMenu must be used within a MobileMenuProvider.")
    }

    return context
}

const MobileMenuProvider = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { defaultOpen?: boolean, open?: boolean, onOpenChange?: (open: boolean) => void }>(
    (
        {
            defaultOpen = true,
            open: openProp,
            onOpenChange: setOpenProp,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const isMobile = useIsMobile()
        const [openMobile, setOpenMobile] = React.useState(false)

        const [_open, _setOpen] = React.useState(defaultOpen)
        const open = openProp ?? _open
        const setOpen = React.useCallback(
            (value: boolean | ((value: boolean) => boolean)) => {
                const openState = typeof value === "function" ? value(open) : value
                if (setOpenProp) {
                    setOpenProp(openState)
                } else {
                    _setOpen(openState)
                }

                document.cookie = `${MOBILE_MENU_COOKIE_NAME}=${openState}; path=/; max-age=${MOBILE_MENU_COOKIE_MAX_AGE}`
            },
            [setOpenProp, open]
        )

        const toggleMobileMenu = React.useCallback(() => {
            return isMobile
                ? setOpenMobile((open) => !open)
                : setOpen((open) => !open)
        }, [isMobile, setOpen, setOpenMobile])

        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (
                    event.key === MOBILE_MENU_KEYBOARD_SHORTCUT &&
                    (event.metaKey || event.ctrlKey)
                ) {
                    event.preventDefault()
                    toggleMobileMenu()
                }
            }

            window.addEventListener("keydown", handleKeyDown)
            return () => window.removeEventListener("keydown", handleKeyDown)
        }, [toggleMobileMenu])

        const state = open ? "expanded" : "collapsed"

        const contextValue = React.useMemo<MobileMenuContext>(
            () => ({
                state,
                open,
                setOpen,
                isMobile,
                openMobile,
                setOpenMobile,
                toggleMobileMenu,
            }),
            [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleMobileMenu]
        )

        return (
            <MobileMenuContext.Provider value={contextValue}>
                <TooltipProvider delayDuration={0}>
                    <div
                        style={
                            {
                                "--mobile-menu-width": MOBILE_MENU_WIDTH,
                                "--mobile-menu-width-icon": MOBILE_MENU_WIDTH_ICON,
                                ...style,
                            } as React.CSSProperties
                        }
                        className={cn(
                            "group/mobile-menu-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-mobile-menu",
                            className
                        )}
                        ref={ref}
                        {...props}
                    >
                        {children}
                    </div>
                </TooltipProvider>
            </MobileMenuContext.Provider>
        )
    }
)
MobileMenuProvider.displayName = "MobileMenuProvider"

const MobileMenuGroup = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-mobile-menu="group"
            className={cn("relative flex w-full min-w-0 flex-col", className)}
            {...props}
        />
    )
})
MobileMenuGroup.displayName = "MobileMenuGroup"

const MobileMenuGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
        <Comp
            ref={ref}
            data-mobile-menu="group-label"
            className={cn(
                "flex h-8 shrink-0 items-center rounded-md text-xs font-medium font-label text-muted-foreground outline-none ring-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                className
            )}
            {...props}
        />
    )
})
MobileMenuGroupLabel.displayName = "MobileMenuGroupLabel"

const MobileMenu = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        data-mobile-menu="menu"
        className={cn("flex w-full min-w-0 flex-col gap-1", className)}
        {...props}
    />
))
MobileMenu.displayName = "MobileMenu"

const MobileMenuItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        data-mobile-menu="menu-item"
        className={cn("group/menu-item relative", className)}
        {...props}
    />
))
MobileMenuItem.displayName = "MobileMenuItem"

const mobileMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-ring transition-[width,height,padding] bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 active:bg-accent active:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-mobile-menu=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-mobile-menu-accent data-[active=true]:font-medium data-[active=true]:text-mobile-menu-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:hover:text-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "hover:bg-accent hover:text-accent-foreground",
                outline:
                    "bg-background shadow-[0_0_0_1px_hsl(var(--mobile-menu-border))] hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--mobile-menu-accent))]",
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const MobileMenuAction = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & {
        asChild?: boolean
        showOnHover?: boolean
    }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            ref={ref}
            data-sidebar="menu-action"
            className={cn(
                "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-2 after:md:hidden",
                "peer-data-[size=sm]/menu-button:top-1",
                "peer-data-[size=default]/menu-button:top-1.5",
                "peer-data-[size=lg]/menu-button:top-2.5",
                "group-data-[collapsible=icon]:hidden",
                showOnHover &&
                "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
                className
            )}
            {...props}
        />
    )
})
MobileMenuAction.displayName = "MobileMenuAction"

const MobileMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & {
        asChild?: boolean
        isActive?: boolean
        tooltip?: string | React.ComponentProps<typeof TooltipContent>
    } & VariantProps<typeof mobileMenuButtonVariants>
>(
    (
        {
            asChild = false,
            isActive = false,
            variant = "default",
            size = "default",
            tooltip,
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button"
        const { isMobile, state } = useMobileMenu()

        const button = (
            <Comp
                ref={ref}
                data-mobile-menu="menu-button"
                data-size={size}
                data-active={isActive}
                className={cn(mobileMenuButtonVariants({ variant, size }), className)}
                {...props}
            />
        )

        if (!tooltip) {
            return button
        }

        if (typeof tooltip === "string") {
            tooltip = {
                children: tooltip,
            }
        }

        return (
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent
                    side="right"
                    align="center"
                    hidden={state !== "collapsed" || isMobile}
                    {...tooltip}
                />
            </Tooltip>
        )
    }
)
MobileMenuButton.displayName = "MobileMenuButton"

const MobileMenuSub = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        data-mobile-menu="menu-sub"
        className={cn(
            "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-border px-2.5 py-0.5",
            "group-data-[collapsible=icon]:hidden",
            className
        )}
        {...props}
    />
))
MobileMenuSub.displayName = "MobileMenuSub"

const MobileMenuSubItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
MobileMenuSubItem.displayName = "MobileMenuSubItem"

const MobileMenuSubButton = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<"a"> & {
        asChild?: boolean
        size?: "sm" | "md"
        isActive?: boolean
    }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
        <Comp
            ref={ref}
            data-mobile-menu="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-foreground/80 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 active:bg-accent active:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-accent-foreground",
                "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    )
})
MobileMenuSubButton.displayName = "MobileMenuSubButton"

export {
    MobileMenuGroup,
    MobileMenuGroupLabel,
    MobileMenu,
    MobileMenuAction,
    MobileMenuButton,
    MobileMenuItem,
    MobileMenuSub,
    MobileMenuSubButton,
    MobileMenuSubItem,
    MobileMenuProvider,
    useMobileMenu,
}