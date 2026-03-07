"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ExternalLink,
  Wallet,
  Cpu,
  Database,
  Globe,
  Shield,
  Layers,
  Share2,
  CheckCircle2,
  Circle,
  AlertCircle,
  Terminal,
  Package,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  phase: number
  title: string
  subtitle: string
  status: "done" | "next" | "later"
  icon: React.ElementType
  accentColor: string
  description: string
  techStack: string[]
  codeSnippet?: { lang: string; code: string }
  links: { label: string; url: string }[]
  checklist: string[]
}

const STEPS: Step[] = [
  {
    id: "deploy",
    phase: 1,
    title: "Deploy to Vercel",
    subtitle: "Go live with one click",
    status: "next",
    icon: Globe,
    accentColor: "text-cyan-400",
    description:
      'The app is Vercel-ready. Click the "Publish" button at the top right of this v0 project. This gives you a live HTTPS URL — required for all Farcaster Frame registration and wallet integrations. Set your production domain in the farcaster.json manifest afterward.',
    techStack: ["Vercel", "Next.js", "Edge Runtime"],
    links: [
      { label: "Vercel Deploy Docs", url: "https://vercel.com/docs/deployments/overview" },
      { label: "Next.js on Vercel", url: "https://vercel.com/docs/frameworks/nextjs" },
    ],
    checklist: [
      'Click "Publish" in the v0 UI top-right corner',
      "Note your .vercel.app production URL",
      "Update homeUrl + imageUrl in public/.well-known/farcaster.json",
      "Update fc:frame meta in app/layout.tsx with real domain",
      "Set NEXT_PUBLIC_APP_URL env var in Vercel dashboard",
    ],
  },
  {
    id: "wallet",
    phase: 1,
    title: "Real Wallet Connect via OnchainKit",
    subtitle: "Replace mock wallet with Coinbase Smart Wallet",
    status: "next",
    icon: Wallet,
    accentColor: "text-primary",
    description:
      "The current WalletProvider in lib/wallet-context.tsx is a simulation. Replace it with OnchainKit (by Coinbase) which provides embedded smart wallets — no MetaMask required. This works inside Farcaster/Base App natively and is the recommended stack for Base mini apps.",
    techStack: ["@coinbase/onchainkit", "wagmi", "viem", "Base Sepolia"],
    codeSnippet: {
      lang: "bash",
      code: `pnpm add @coinbase/onchainkit wagmi viem @tanstack/react-query`,
    },
    links: [
      { label: "OnchainKit Docs", url: "https://onchainkit.xyz" },
      { label: "Base Smart Wallet Guide", url: "https://docs.base.org/identity/smart-wallet/quickstart" },
      { label: "wagmi Docs", url: "https://wagmi.sh" },
    ],
    checklist: [
      "Install @coinbase/onchainkit wagmi viem @tanstack/react-query",
      "Get a free Coinbase CDP API key at developer.coinbase.com",
      "Add NEXT_PUBLIC_CDP_API_KEY to Vercel env vars",
      "Wrap app in <OnchainKitProvider chain={baseSepolia}>",
      "Replace WalletButton with OnchainKit <ConnectWallet /> component",
      "Replace useWallet() hook with wagmi useAccount() + useConnect()",
    ],
  },
  {
    id: "farcaster-sdk",
    phase: 1,
    title: "Farcaster Mini App SDK",
    subtitle: "Make it open inside Warpcast / Base App",
    status: "next",
    icon: Layers,
    accentColor: "text-yellow-400",
    description:
      "To be recognized as a Mini App inside Warpcast or Base App, you need the @farcaster/frame-sdk. It handles the JS bridge between your app and the native Farcaster client — enabling wallet passthrough, user context (FID, username), haptics, and the splash screen. The farcaster.json manifest is already in /public/.well-known/ — it just needs a real signed accountAssociation.",
    techStack: ["@farcaster/frame-sdk", "Warpcast", "Base App"],
    codeSnippet: {
      lang: "bash",
      code: `pnpm add @farcaster/frame-sdk`,
    },
    links: [
      { label: "Farcaster Mini Apps Docs", url: "https://miniapps.farcaster.xyz" },
      { label: "Frame SDK GitHub", url: "https://github.com/farcasterxyz/frame-sdk" },
      { label: "Sign farcaster.json", url: "https://miniapps.farcaster.xyz/docs/guides/publishing" },
    ],
    checklist: [
      "Install @farcaster/frame-sdk",
      "Call sdk.actions.ready() in a useEffect on app mount",
      "Use sdk.context to read user FID, username, pfpUrl",
      "Sign accountAssociation in farcaster.json (use the Warpcast manifest tool)",
      "Submit mini app for review at miniapps.farcaster.xyz",
      "Test inside Warpcast developer mode (Settings > Developer > Mini Apps)",
    ],
  },
  {
    id: "ai",
    phase: 2,
    title: "Real AI Image Generation",
    subtitle: "Connect Replicate API for dream visuals",
    status: "later",
    icon: Cpu,
    accentColor: "text-accent",
    description:
      "The generation step currently uses a placeholder image. Connect Replicate's API to run Stable Diffusion XL or FLUX.1 on the user's dream description. Create a Next.js API Route at /api/generate that proxies the request server-side (never expose API keys client-side). The dream text + mood are already passed via URL params from DreamInputScreen.",
    techStack: ["Replicate API", "SDXL / FLUX.1", "Next.js Route Handler"],
    codeSnippet: {
      lang: "typescript",
      code: `// app/api/generate/route.ts
import Replicate from "replicate"

export async function POST(req: Request) {
  const { prompt, mood } = await req.json()
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  })
  const output = await replicate.run(
    "black-forest-labs/flux-schnell",
    { input: { prompt: \`\${mood} dreamscape: \${prompt}\` } }
  )
  return Response.json({ imageUrl: output[0] })
}`,
    },
    links: [
      { label: "Replicate Docs", url: "https://replicate.com/docs" },
      { label: "FLUX.1 on Replicate", url: "https://replicate.com/black-forest-labs/flux-schnell" },
      { label: "replicate npm package", url: "https://www.npmjs.com/package/replicate" },
    ],
    checklist: [
      "Create account at replicate.com and get API token",
      "Add REPLICATE_API_TOKEN to Vercel env vars",
      "pnpm add replicate",
      "Create app/api/generate/route.ts (see code snippet)",
      "Update DreamInputScreen to POST to /api/generate and store imageUrl in state",
      "Pass real imageUrl to /preview via URL params or sessionStorage",
      "Handle loading states and error cases gracefully",
    ],
  },
  {
    id: "nft",
    phase: 2,
    title: "Real NFT Minting on Base",
    subtitle: "Deploy ERC-721 contract & mint on-chain",
    status: "later",
    icon: Shield,
    accentColor: "text-orange-400",
    description:
      "The mint button currently simulates a transaction. To go live: deploy an ERC-721 contract on Base Sepolia (then Base mainnet), upload the generated image + metadata to IPFS, and call the mint function from the client using wagmi's useWriteContract. Thirdweb's NFT drop contract is the fastest path — no custom Solidity required.",
    techStack: ["Thirdweb", "IPFS / Pinata", "ERC-721", "wagmi writeContract"],
    codeSnippet: {
      lang: "typescript",
      code: `// Using wagmi to call mint
import { useWriteContract } from "wagmi"
import { dreamFragmentAbi } from "@/lib/abi"

const { writeContract } = useWriteContract()

writeContract({
  address: "0xYOUR_CONTRACT",
  abi: dreamFragmentAbi,
  functionName: "mintFragment",
  args: [metadataUri],
})`,
    },
    links: [
      { label: "Thirdweb NFT Drop", url: "https://thirdweb.com/base/explore" },
      { label: "Deploy on Base", url: "https://docs.base.org/tutorials/deploy-with-thirdweb" },
      { label: "Pinata IPFS Upload", url: "https://www.pinata.cloud" },
      { label: "wagmi useWriteContract", url: "https://wagmi.sh/react/api/hooks/useWriteContract" },
    ],
    checklist: [
      "Deploy ERC-721 contract on Base Sepolia via Thirdweb dashboard (no code)",
      "Copy contract address + ABI into lib/abi.ts",
      "Create app/api/upload/route.ts to upload image + metadata JSON to IPFS via Pinata",
      "Add PINATA_JWT env var in Vercel",
      "Replace handleMint() in preview-screen.tsx with real writeContract call",
      "Read tx receipt and extract tokenId from mint event logs",
      "Test full flow on Base Sepolia before switching to mainnet",
    ],
  },
  {
    id: "database",
    phase: 2,
    title: "Persist Dreams with a Database",
    subtitle: "Store fragments, users & gallery data",
    status: "later",
    icon: Database,
    accentColor: "text-emerald-400",
    description:
      "The gallery currently uses static mock data. Add a real database to persist minted fragments, user addresses, stories, and IPFS metadata. Neon (serverless Postgres) integrates directly in v0 — click 'Connect' in the sidebar. Use Drizzle ORM for type-safe queries from Next.js Route Handlers.",
    techStack: ["Neon Postgres", "Drizzle ORM", "Next.js Route Handlers"],
    codeSnippet: {
      lang: "typescript",
      code: `// lib/db/schema.ts (Drizzle)
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"

export const fragments = pgTable("fragments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  ownerAddress: text("owner_address").notNull(),
  tokenId: integer("token_id"),
  imageUrl: text("image_url").notNull(),
  story: text("story").notNull(),
  mood: text("mood").notNull(),
  dreamSeed: text("dream_seed"),
  txHash: text("tx_hash"),
  createdAt: timestamp("created_at").defaultNow(),
})`,
    },
    links: [
      { label: "Neon Serverless Postgres", url: "https://neon.tech" },
      { label: "Drizzle ORM", url: "https://orm.drizzle.team" },
      { label: "Connect Neon in v0", url: "https://v0.dev/docs/integrations" },
    ],
    checklist: [
      "Add Neon integration from the v0 sidebar 'Connect' section",
      "pnpm add drizzle-orm @neondatabase/serverless drizzle-kit",
      "Create lib/db/schema.ts with fragments table (see snippet)",
      "Run migration: pnpm drizzle-kit push",
      "Create app/api/fragments/route.ts for GET (gallery) and POST (save after mint)",
      "Update GalleryScreen to fetch from /api/fragments instead of mock data",
      "Add owner filtering so users see only their own fragments",
    ],
  },
  {
    id: "share",
    phase: 3,
    title: "Farcaster Social Sharing",
    subtitle: "Share casts + viral loop",
    status: "later",
    icon: Share2,
    accentColor: "text-pink-400",
    description:
      "Close the viral loop by letting users share their minted fragment as a Farcaster cast with an embedded og:image. Use the Frame SDK's sdk.actions.composeCast() to pre-fill a cast with the fragment image and a link back to the app. This is the primary growth mechanic for Farcaster mini apps.",
    techStack: ["@farcaster/frame-sdk", "composeCast", "Open Graph"],
    codeSnippet: {
      lang: "typescript",
      code: `import { sdk } from "@farcaster/frame-sdk"

await sdk.actions.composeCast({
  text: \`I just minted Fragment #\${tokenId} "\${name}" on Base\\n\\nCatch it in DreamFragment\`,
  embeds: [\`https://dreamfragment.vercel.app/fragment/\${tokenId}\`],
})`,
    },
    links: [
      { label: "composeCast Docs", url: "https://miniapps.farcaster.xyz/docs/sdk/actions/compose-cast" },
      { label: "Open Graph Image with Next.js", url: "https://nextjs.org/docs/app/api-reference/file-conventions/opengraph-image" },
    ],
    checklist: [
      "Add Share button to the success state in PreviewScreen",
      "Call sdk.actions.composeCast() on share press",
      "Create app/fragment/[tokenId]/page.tsx with full og:image metadata",
      "Generate dynamic OG image using next/og (ImageResponse)",
      "Ensure the OG image shows dream art + fragment name + Base logo",
    ],
  },
]

const STATUS_CONFIG = {
  done: { icon: CheckCircle2, label: "Done", color: "text-emerald-400", bg: "bg-emerald-950/40 border-emerald-500/30" },
  next: { icon: AlertCircle, label: "Next up", color: "text-yellow-400", bg: "bg-yellow-950/40 border-yellow-500/30" },
  later: { icon: Circle, label: "Later", color: "text-muted-foreground", bg: "bg-surface-1 border-border/50" },
}

const PHASE_LABELS = {
  1: { label: "Phase 1 — Go Live", color: "text-yellow-400", border: "border-yellow-500/30 bg-yellow-950/20" },
  2: { label: "Phase 2 — Real Integrations", color: "text-primary", border: "border-primary/30 bg-primary/5" },
  3: { label: "Phase 3 — Growth Loop", color: "text-pink-400", border: "border-pink-500/30 bg-pink-950/20" },
}

function StepCard({ step }: { step: Step }) {
  const [open, setOpen] = useState(false)
  const StatusIcon = STATUS_CONFIG[step.status].icon
  const StepIcon = step.icon

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200",
        open ? "border-border/80 bg-surface-1" : "border-border/50 bg-surface-1/60",
      )}
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3.5 p-4 text-left"
        aria-expanded={open}
      >
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center mt-0.5",
            "bg-surface-2 border-border/60",
          )}
        >
          <StepIcon className={cn("w-5 h-5", step.accentColor)} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground leading-tight">{step.title}</span>
            <Badge
              className={cn(
                "text-[9px] font-mono border px-1.5 py-0 h-4",
                STATUS_CONFIG[step.status].bg,
                STATUS_CONFIG[step.status].color,
              )}
            >
              <StatusIcon className="w-2.5 h-2.5 mr-1" />
              {STATUS_CONFIG[step.status].label}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{step.subtitle}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {step.techStack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[9px] font-mono bg-surface-2 border border-border/50 text-muted-foreground rounded-full px-2 py-0.5"
              >
                {t}
              </span>
            ))}
            {step.techStack.length > 3 && (
              <span className="text-[9px] font-mono text-muted-foreground/50">
                +{step.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        <div className="flex-shrink-0 mt-1">
          {open ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4">
          <Separator className="bg-border/40" />

          {/* Description */}
          <p className="text-[13px] text-foreground/80 leading-relaxed">{step.description}</p>

          {/* Code snippet */}
          {step.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-border/50">
              <div className="flex items-center gap-2 px-3 py-2 bg-surface-2 border-b border-border/50">
                <Terminal className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {step.codeSnippet.lang}
                </span>
              </div>
              <pre className="p-3 overflow-x-auto bg-black/40">
                <code className="text-[11px] font-mono text-emerald-300 leading-relaxed whitespace-pre">
                  {step.codeSnippet.code}
                </code>
              </pre>
            </div>
          )}

          {/* Checklist */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Package className="w-3 h-3" />
              Steps
            </p>
            <ul className="flex flex-col gap-2">
              {step.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12px] text-foreground/75">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full border border-border/60 bg-surface-2 flex items-center justify-center mt-0.5">
                    <span className="text-[8px] font-mono text-muted-foreground">{i + 1}</span>
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Resources</p>
            <div className="flex flex-wrap gap-2">
              {step.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-mono underline underline-offset-2 transition-colors",
                    step.accentColor,
                    "opacity-80 hover:opacity-100",
                  )}
                >
                  {link.label}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function RoadmapScreen() {
  const phases = [1, 2, 3] as const

  return (
    <main className="flex flex-col min-h-screen pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-6">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground -ml-2 w-9 h-9"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <span className="font-sans text-sm font-semibold text-foreground tracking-wide">
            Launch Roadmap
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">Prototype → Production</span>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex flex-col gap-7 px-5">
        {/* Intro banner */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col gap-2">
          <p className="text-sm font-semibold text-primary">
            This prototype is 100% UI — here is how to make it real.
          </p>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            Tap each step below for a detailed checklist, code snippets, and documentation links. Work through
            Phase 1 first to get a live, wallet-connected app on Farcaster.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-yellow-400" />
              <span className="text-[10px] font-mono text-yellow-400">Next up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground">Later</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400">Done</span>
            </div>
          </div>
        </div>

        {/* Phase groups */}
        {phases.map((phase) => {
          const cfg = PHASE_LABELS[phase]
          const phaseSteps = STEPS.filter((s) => s.phase === phase)
          return (
            <div key={phase} className="flex flex-col gap-3">
              <div className={cn("flex items-center gap-2 rounded-xl border px-3 py-2", cfg.border)}>
                <span className={cn("text-xs font-mono font-bold", cfg.color)}>{cfg.label}</span>
              </div>
              {phaseSteps.map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
            </div>
          )
        })}

        {/* Quick stack summary */}
        <div className="rounded-2xl border border-border/50 bg-surface-1 p-4 flex flex-col gap-3">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full tech stack</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Frontend", "Next.js 15, React, Tailwind, shadcn/ui"],
              ["Wallet", "@coinbase/onchainkit, wagmi, viem"],
              ["Chain", "Base Sepolia → Base Mainnet"],
              ["Farcaster", "@farcaster/frame-sdk"],
              ["AI Generation", "Replicate API (FLUX.1 / SDXL)"],
              ["NFT Contract", "Thirdweb ERC-721 Drop"],
              ["Storage", "IPFS via Pinata"],
              ["Database", "Neon Postgres + Drizzle ORM"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
                <span className="text-[11px] text-foreground/80 leading-snug">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
