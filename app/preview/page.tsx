import { Suspense } from "react"
import { AppShell } from "@/components/app-shell"
import { PreviewScreen } from "@/components/screens/preview-screen"
import { Loader2 } from "lucide-react"

function PreviewFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground font-mono">Loading fragment...</p>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <AppShell>
      <Suspense fallback={<PreviewFallback />}>
        <PreviewScreen />
      </Suspense>
    </AppShell>
  )
}
