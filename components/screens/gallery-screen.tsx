"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Gem, Sparkles, ExternalLink, X } from "lucide-react"

const MOOD_COLORS: Record<string, string> = {
  surreal: "bg-primary/20 text-primary border-primary/40",
  nightmare: "bg-red-950/40 text-red-400 border-red-500/40",
  lucid: "bg-accent/15 text-accent border-accent/40",
  adventure: "bg-yellow-950/40 text-yellow-400 border-yellow-500/40",
  calm: "bg-green-950/40 text-green-400 border-green-500/40",
}

const FRAGMENTS = [
  {
    id: 1247,
    name: "Violet Citadel",
    mood: "surreal",
    img: "/images/dream-gallery-1.jpg",
    owner: "0x71C7...3aF2",
    story: "Crystalline towers rose through a violet nebula where physics forgot its own rules. The dreamer discovered each floor held a memory that hadn't happened yet.",
    minted: "2 hours ago",
    txHash: "0xabc123...def456",
  },
  {
    id: 1201,
    name: "Shadow Forest",
    mood: "nightmare",
    img: "/images/dream-gallery-2.jpg",
    owner: "0x3Fc8...9bD1",
    story: "Ancient eyes watched from every shadow. The trees breathed in sync with something massive and unseen, and every path led deeper into the dark.",
    minted: "5 hours ago",
    txHash: "0xbcd234...ef5678",
  },
  {
    id: 1188,
    name: "Crystal Tides",
    mood: "lucid",
    img: "/images/dream-gallery-3.jpg",
    owner: "0xA91b...2cE5",
    story: "The ocean was made of glass and the dreamer could see to the bottom where extinct creatures slept peacefully, dreaming their own dreams.",
    minted: "1 day ago",
    txHash: "0xcde345...f67890",
  },
  {
    id: 1143,
    name: "Ascending Ruins",
    mood: "adventure",
    img: "/images/dream-gallery-4.jpg",
    owner: "0x5D2a...7fA8",
    story: "The ruins floated upward as if gravity had reversed for stone alone. The explorer climbed stairways that ended in open sky, each step a choice with no return.",
    minted: "2 days ago",
    txHash: "0xdef456...089abc",
  },
]

const FILTERS = ["All", "Surreal", "Nightmare", "Lucid", "Adventure", "Calm"]

type Fragment = typeof FRAGMENTS[number]

export function GalleryScreen() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selected, setSelected] = useState<Fragment | null>(null)

  const filtered =
    activeFilter === "All"
      ? FRAGMENTS
      : FRAGMENTS.filter((f) => f.mood.toLowerCase() === activeFilter.toLowerCase())

  return (
    <main className="flex flex-col min-h-screen pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-sans text-2xl font-bold text-foreground tracking-wide text-glow-purple">
            The Gallery
          </h1>
          <span className="text-[10px] font-mono text-muted-foreground">
            {FRAGMENTS.length} fragments minted
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Dreams captured forever on Base
        </p>
      </div>

      {/* Filter chips */}
      <div className="px-5 mb-5">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all duration-150",
                activeFilter === f
                  ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_10px_oklch(0.60_0.24_292/0.2)]"
                  : "border-border text-muted-foreground bg-transparent hover:border-border/80 hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((fragment) => (
            <button
              key={fragment.id}
              onClick={() => setSelected(fragment)}
              className="dream-card border border-border/60 hover:border-primary/40 transition-all duration-200 group text-left overflow-hidden rounded-xl"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
                <Image
                  src={fragment.img}
                  alt={fragment.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <Badge className={cn("text-[9px] font-mono capitalize border", MOOD_COLORS[fragment.mood])}>
                    {fragment.mood}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[9px] font-mono bg-background/60 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-muted-foreground border border-border/40">
                    #{fragment.id}
                  </span>
                </div>
              </div>
              <div className="p-2.5 flex flex-col gap-1">
                <p className="text-xs font-semibold text-foreground truncate">{fragment.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono line-clamp-2 leading-relaxed">
                  {fragment.story}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[9px] font-mono text-muted-foreground/60 truncate">{fragment.owner}</span>
                  <Gem className="w-3 h-3 text-primary/60 flex-shrink-0" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Sparkles className="w-8 h-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No {activeFilter.toLowerCase()} fragments yet</p>
            <Link href="/dream">
              <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground">
                Be the first to mint
              </Button>
            </Link>
          </div>
        )}

        {/* Mint CTA */}
        <div className="mt-6 rounded-xl border border-primary/25 bg-primary/8 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Add your fragment</p>
            <p className="text-[11px] text-muted-foreground">Describe a dream and mint it on Base</p>
          </div>
          <Link href="/dream">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Dream
            </Button>
          </Link>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-[430px] dream-card border-t border-border rounded-t-2xl p-5 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-sans text-xl font-bold text-foreground">{selected.name}</p>
                <p className="text-xs text-muted-foreground font-mono">Fragment #{selected.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-[10px] font-mono capitalize border", MOOD_COLORS[selected.mood])}>
                  {selected.mood}
                </Badge>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-surface-2 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-video w-full">
              <Image src={selected.img} alt={selected.name} fill className="object-cover" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{selected.story}</p>

            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-muted-foreground/60">Owner: {selected.owner}</span>
              <span className="text-muted-foreground/60">{selected.minted}</span>
            </div>

            <a
              href={`https://sepolia.basescan.org/tx/${selected.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-mono text-primary/80 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View on BaseScan
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
