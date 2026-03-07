"use client"

import { WalletProvider } from "@/lib/wallet-context"
import { BottomNav } from "@/components/bottom-nav"
import { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col items-center justify-start bg-background">
        <div className="w-full max-w-[430px] min-h-screen flex flex-col relative">
          {children}
        </div>
      </div>
      <BottomNav />
    </WalletProvider>
  )
}
