"use client"

import { useWallet } from "@/lib/wallet-context"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface WalletButtonProps {
  className?: string
  size?: "sm" | "default" | "lg"
}

export function WalletButton({ className, size = "default" }: WalletButtonProps) {
  const { connected, address, connecting, connect, disconnect } = useWallet()

  if (connecting) {
    return (
      <Button
        disabled
        size={size}
        className={cn(
          "border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
          className
        )}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Connecting...
      </Button>
    )
  }

  if (connected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={size}
            variant="outline"
            className={cn(
              "border-neon-cyan/40 bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent font-mono text-sm",
              className
            )}
          >
            <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
            {address}
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-card border-border text-foreground"
        >
          <DropdownMenuItem className="text-muted-foreground text-xs" disabled>
            Base Sepolia Testnet
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive-foreground focus:text-destructive-foreground cursor-pointer"
            onClick={disconnect}
          >
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      size={size}
      onClick={connect}
      className={cn(
        "border border-primary/50 bg-primary/15 text-primary hover:bg-primary/25 hover:border-primary/80 transition-all duration-200",
        className
      )}
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  )
}
