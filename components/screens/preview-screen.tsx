"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Loader2,
  Gem,
  Share2,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useWallet } from "@/lib/wallet-context"

const MOOD_COLORS: Record<string, string> = {
  surreal: "bg-primary/20 text-primary border-primary/40",
  nightmare: "bg-red-950/40 text-red-400 border-red-500/40",
  lucid: "bg-accent/15 text-accent border-accent/40",
  adventure: "bg-yellow-950/40 text-yellow-400 border-yellow-500/40",
  calm: "bg-green-950/40 text-green-400 border-green-500/40",
}

const GENERATED_STORIES: Record<string, string> = {
  surreal:
    "The dreamer drifted through corridors of violet glass where reflections moved independently. Each pane held a different version of reality — some burning, some frozen, some singing. At the center stood a door made of light that had never been opened by anyone who remembered doing so.",
  nightmare:
    "Something ancient stirred beneath the floorboards of a house that shouldn't exist. The dreamer ran through halls that elongated with each step, the walls breathing in rhythms that matched a heartbeat not their own. The exit was always one turn away.",
  lucid:
    "The dreamer realized mid-fall that the ground was optional. With a thought, gravity reversed, and the world became a canvas. Every surface responded to intention — buildings bloomed into flowers, oceans turned to silk, and time became a river the dreamer could swim upstream.",
  adventure:
    "A map burned into the dreamer's palm the moment they stepped through the mountain gate. Ruins floated in the sky above, held aloft by chains of solidified starlight. The quest was clear: find the fragment before the eclipse consumed the last torch.",
  calm:
    "Still water stretched to every horizon, perfectly mirroring a sky filled with two suns moving in opposite directions. The dreamer floated without weight, breathing slowly, each exhale sending ripples to shores they could not see but somehow knew existed.",
}

type MintState = "idle" | "signing" | "pending" | "success"

export function PreviewScreen() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { connected, address } = useWallet()

  const dreamText = searchParams.get("dream") || "A dreamscape unlike any other..."
  const mood = searchParams.get("mood") || "surreal"

  const [mintState, setMintState] = useState<MintState>("idle")
  const [txHash, setTxHash] = useState<string | null>(null)
  const [tokenId] = useState(() => Math.floor(Math.random() * 9000) + 1000)
  const [fragmentName] = useState(() => {
    const adjectives = ["Violet", "Shattered", "Hollow", "Burning", "Silent", "Drifting", "Fractured", "Lucent"]
    const nouns = ["Citadel", "Echo", "Veil", "Shore", "Mirror", "Gate", "Pulse", "Thread"]
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`
  })

  const story = GENERATED_STORIES[mood] || GENERATED_STORIES.surreal

  const handleMint = async () => {
    if (!connected) return
    setMintState("signing")
    await new Promise((r) => setTimeout(r, 1200))
    setMintState("pending")
    await new Promise((r) => setTimeout(r, 2000))
    const hash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
    setTxHash(hash)
    setMintState("success")
  }

  return (
    <main className="flex flex-col min-h-screen pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-5">
        <Link href="/dream">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground -ml-2 w-9 h-9">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <span className="font-sans text-sm font-semibold text-foreground tracking-wide">Dream Preview</span>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-9 h-9">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-5">
        {/* Generated image */}
        <div className="relative rounded-2xl overflow-hidden border border-glow-purple aspect-square w-full">
          <Image
            src="/images/dream-preview.jpg"
            alt="Generated dream fragment"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Fragment label */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <p className="font-sans text-lg font-bold text-foreground text-glow-purple leading-tight">
                {fragmentName}
              </p>
              <p className="text-xs text-muted-foreground font-mono">Fragment #{tokenId}</p>
            </div>
            <Badge className={cn("text-[10px] font-mono capitalize border", MOOD_COLORS[mood])}>
              {mood}
            </Badge>
          </div>

          {/* AI tag */}
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 text-[9px] font-mono bg-background/60 backdrop-blur-sm border border-border/60 rounded-full px-2 py-1 text-muted-foreground">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              AI Generated
            </span>
          </div>
        </div>

        {/* Story */}
        <div className="dream-card border border-border/50 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-primary" style={{ boxShadow: "0 0 6px oklch(0.60 0.24 292 / 0.8)" }} />
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Fragment Story</p>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{story}</p>
          <Separator className="bg-border/50" />
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Your Dream Seed</p>
            <p className="text-xs text-muted-foreground/70 italic line-clamp-2">"{dreamText}"</p>
          </div>
        </div>

        {/* NFT metadata row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Network", value: "Base Sepolia" },
            { label: "Standard", value: "ERC-721" },
            { label: "Royalty", value: "5%" },
          ].map((m) => (
            <div key={m.label} className="dream-card border border-border/50 p-3 flex flex-col gap-1">
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{m.label}</p>
              <p className="text-xs font-semibold text-foreground font-mono">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Mint button */}
        {mintState === "success" ? (
          <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-accent">Minted successfully!</p>
                <p className="text-[11px] text-muted-foreground font-mono">
                  Fragment #{tokenId} is now on-chain
                </p>
              </div>
            </div>
            {txHash && (
              <a
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono text-accent/80 hover:text-accent underline underline-offset-2 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {txHash.slice(0, 10)}...{txHash.slice(-6)} — View on BaseScan
              </a>
            )}
            <div className="flex gap-2 mt-1">
              <Link href="/gallery" className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-border text-foreground hover:bg-surface-2">
                  View in Gallery
                </Button>
              </Link>
              <Link href="/dream" className="flex-1">
                <Button size="sm" className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
                  Dream Again
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Button
            size="lg"
            disabled={!connected || mintState !== "idle"}
            onClick={handleMint}
            className={cn(
              "w-full h-14 text-base font-semibold transition-all duration-300",
              connected && mintState === "idle"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-purple"
                : "bg-muted text-muted-foreground"
            )}
          >
            {mintState === "signing" ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Waiting for signature...
              </>
            ) : mintState === "pending" ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Minting on Base...
              </>
            ) : (
              <>
                <Gem className="w-5 h-5 mr-2" />
                Mint as NFT on Base
              </>
            )}
          </Button>
        )}

        {!connected && mintState === "idle" && (
          <p className="text-[11px] text-center text-muted-foreground/60 font-mono">
            Connect your wallet to mint this fragment on Base Sepolia
          </p>
        )}
      </div>
    </main>
  )
}
