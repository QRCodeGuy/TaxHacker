"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body className="bg-[#080E0A] text-[rgba(255,255,255,0.92)]">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4 animate-[fadeIn_200ms_ease-out]">
            <span className="text-6xl block mb-4 opacity-40">⬡</span>
            <h1 className="text-2xl font-display font-bold">Something went wrong</h1>
            <p className="text-[rgba(255,255,255,0.60)] max-w-md mx-auto text-sm">
              An unexpected error occurred. Please try again.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
