"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles, Loader2, ArrowLeft, Moon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useWallet } from "@/lib/wallet-context"
import { WalletButton } from "@/components/wallet-button"

const MAX_CHARS = 500

const MOODS = [
  { value: "surreal", label: "Surreal", description: "Reality bends and merges", color: "text-primary" },
  { value: "nightmare", label: "Nightmare", description: "Dark and unsettling", color: "text-destructive-foreground" },
  { value: "lucid", label: "Lucid", description: "Crystal clear awareness", color: "text-accent" },
  { value: "adventure", label: "Adventure", description: "Epic journey unfolds", color: "text-yellow-400" },
  { value: "calm", label: "Calm", description: "Peaceful and still", color: "text-green-400" },
]

const MOOD_GLOWS: Record<string, string> = {
  surreal: "border-primary/50 shadow-[0_0_16px_oklch(0.60_0.24_292/0.2)]",
  nightmare: "border-red-500/50 shadow-[0_0_16px_theme(colors.red.500/0.2)]",
  lucid: "border-accent/50 shadow-[0_0_16px_oklch(0.76_0.16_196/0.2)]",
  adventure: "border-yellow-500/50 shadow-[0_0_16px_theme(colors.yellow.500/0.2)]",
  calm: "border-green-500/50 shadow-[0_0_16px_theme(colors.green.500/0.2)]",
}

const PLACEHOLDER_PROMPTS = [
  "I was floating above a violet ocean, the sky fractured like glass and each shard reflected a different version of me...",
  "A shadowy figure chased me through endless corridors of a crumbling library, the books screaming as they fell...",
  "I stood at the edge of a crystal mountain and realized I could reshape the clouds with my thoughts...",
]

export function DreamInputScreen() {
  const router = useRouter()
  const { connected } = useWallet()
  const [dream, setDream] = useState("")
  const [mood, setMood] = useState("")
  const [generating, setGenerating] = useState(false)
  const [placeholderIdx] = useState(() => Math.floor(Math.random() * PLACEHOLDER_PROMPTS.length))

  const remaining = MAX_CHARS - dream.length
  const canGenerate = dream.trim().length > 10 && mood !== "" && connected

  const handleGenerate = async () => {
    if (!canGenerate) return
    setGenerating(true)
    await new Promise((r) => setTimeout(r, 2200))
    const params = new URLSearchParams({ dream: dream.slice(0, 200), mood })
    router.push(`/preview?${params.toString()}`)
  }

  return (
    <main className="flex flex-col min-h-screen pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground -ml-2 w-9 h-9">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-primary" />
          <span className="font-sans text-sm font-semibold text-foreground tracking-wide">New Fragment</span>
        </div>
        <WalletButton size="sm" />
      </div>

      {/* Form body */}
      <div className="flex flex-col gap-6 px-5 flex-1">
        {/* Dream textarea */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Describe your dream
            </Label>
            <span
              className={cn(
                "text-[10px] font-mono tabular-nums transition-colors",
                remaining < 50 ? "text-destructive-foreground" : "text-muted-foreground"
              )}
            >
              {remaining} left
            </span>
          </div>
          <div
            className={cn(
              "relative rounded-xl border transition-all duration-200",
              dream.length > 0 && mood ? MOOD_GLOWS[mood] || "border-primary/40" : "border-border",
              "bg-surface-1"
            )}
          >
            <Textarea
              value={dream}
              onChange={(e) => setDream(e.target.value.slice(0, MAX_CHARS))}
              placeholder={PLACEHOLDER_PROMPTS[placeholderIdx]}
              className="min-h-[180px] resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 p-4"
            />
            {dream.length > 0 && (
              <div className="absolute bottom-3 right-3">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                  style={{ boxShadow: "0 0 6px oklch(0.60 0.24 292 / 0.8)" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mood select */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Dream mood
          </Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger
              className={cn(
                "h-12 bg-surface-1 border transition-all duration-200 text-foreground",
                mood ? MOOD_GLOWS[mood] : "border-border"
              )}
            >
              <SelectValue placeholder="Select the feel of your dream..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {MOODS.map((m) => (
                <SelectItem
                  key={m.value}
                  value={m.value}
                  className="focus:bg-surface-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("font-medium text-sm", m.color)}>{m.label}</span>
                    <span className="text-xs text-muted-foreground">{m.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mood chips quick-select */}
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-150",
                mood === m.value
                  ? cn("bg-surface-2 text-foreground", MOOD_GLOWS[m.value])
                  : "border-border text-muted-foreground bg-transparent hover:border-border/80 hover:text-foreground"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Wallet notice if not connected */}
        {!connected && (
          <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-start gap-3">
            <div className="w-1 h-full rounded-full bg-primary/50 mt-0.5" />
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-xs text-primary font-medium">Wallet required to generate</p>
              <p className="text-[11px] text-muted-foreground">Connect your wallet to mint dreams on Base</p>
            </div>
            <WalletButton size="sm" />
          </div>
        )}

        {/* Generate button */}
        <Button
          size="lg"
          disabled={!canGenerate || generating}
          onClick={handleGenerate}
          className={cn(
            "w-full h-14 text-base font-semibold transition-all duration-300 mt-auto",
            canGenerate
              ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-purple"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {generating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating your dream...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Dream
            </>
          )}
        </Button>

        {/* Tip */}
        {!generating && (
          <p className="text-[11px] text-center text-muted-foreground/60 font-mono">
            AI will render a surreal image + fragment story from your description
          </p>
        )}
      </div>
    </main>
  )
}
