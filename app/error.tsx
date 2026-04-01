"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 min-h-screen animate-[fadeIn_200ms_ease-out]">
      <span className="text-4xl opacity-40">⬡</span>
      <h2 className="text-base font-display font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={reset} className="mt-2">Try Again</Button>
    </div>
  )
}
