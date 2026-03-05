"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dream", label: "Dream", icon: Sparkles },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-card/90 backdrop-blur-xl border-t border-border flex items-center justify-around px-2 pb-safe">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-5 rounded-xl transition-all duration-200 min-w-[64px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive && "drop-shadow-[0_0_6px_oklch(0.60_0.24_292)]"
                  )}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className={cn("text-[10px] font-medium tracking-wide", isActive && "text-primary")}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
