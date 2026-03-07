"use client"

import Image from "next/image"
import Link from "next/link"
import { WalletButton } from "@/components/wallet-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ChevronRight, Zap } from "lucide-react"

const STATS = [
  { value: "1,247", label: "Dreams Minted" },
  { value: "843", label: "Dreamers" },
  { value: "Base", label: "Network" },
]

export function HomeScreen() {
  return (
    <main className="flex flex-col min-h-screen pb-24 overflow-hidden">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center min-h-[55vh] px-6 pt-12 pb-8 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        </div>

        {/* Header row */}
        <div className="relative z-10 w-full flex items-center justify-between mb-10">
          <Badge
            className="bg-primary/20 text-primary border-primary/40 text-[10px] tracking-widest uppercase font-mono"
          >
            <Zap className="w-2.5 h-2.5 mr-1" />
            Base Sepolia
          </Badge>
          <WalletButton size="sm" />
        </div>

        {/* Title block */}
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          {/* Glow orb */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-accent/15 blur-2xl pointer-events-none" />

          <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase text-glow-cyan">
            Farcaster Mini App
          </p>
          <h1 className="font-sans text-5xl font-bold tracking-tight text-foreground text-balance leading-tight text-glow-purple">
            Dream<span className="text-primary">Fragment</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] text-pretty">
            Describe your dream. Let AI render it. Mint it as a unique NFT fragment on Base.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between dream-card p-4 border-glow-purple">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
              <span className="font-sans text-lg font-semibold text-primary text-glow-purple">{s.value}</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-6 flex flex-col gap-3">
        <Link href="/dream" className="w-full">
          <Button
            size="lg"
            className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground glow-purple transition-all duration-300 font-sans"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Dreaming
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </Link>
        <Link href="/gallery" className="w-full">
          <Button
            size="lg"
            variant="outline"
            className="w-full h-12 text-sm border-border bg-surface-1/50 hover:bg-surface-1 hover:border-accent/50 text-foreground transition-all duration-200"
          >
            Explore Gallery
          </Button>
        </Link>
      </div>

      {/* Recent fragment preview */}
      <div className="px-6 mt-8">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Recently Minted
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
          {[
            { img: "/images/dream-gallery-1.jpg", title: "Violet Citadel", mood: "surreal" },
            { img: "/images/dream-gallery-2.jpg", title: "Shadow Forest", mood: "nightmare" },
            { img: "/images/dream-gallery-3.jpg", title: "Crystal Tides", mood: "lucid" },
          ].map((f, i) => (
            <Link
              href="/gallery"
              key={i}
              className="flex-shrink-0 w-28 dream-card border border-border/50 hover:border-primary/40 transition-all duration-200 group"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2">
                <p className="text-[11px] font-medium text-foreground truncate">{f.title}</p>
                <p className="text-[9px] text-muted-foreground font-mono capitalize">{f.mood}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
