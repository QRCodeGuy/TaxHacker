import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export default function Loading() {
  return (
    <div className="animate-[fadeIn_200ms_ease-out]">
      <header className="flex items-center justify-between mb-8">
        <h2 className="flex flex-row gap-3 md:gap-5 items-center">
          <span className="text-3xl font-display font-bold tracking-tight">Transactions</span>
          <div className="h-5 w-5 rounded-full border-[1.5px] border-[var(--grayza-accent)] border-t-transparent animate-spin" />
        </h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download />
            Export
          </Button>
          <Button>
            <Plus /> Add Transaction
          </Button>
        </div>
      </header>

      <div className="flex flex-row gap-2 w-full mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-full rounded-[7px] grayza-shimmer" />
        ))}
      </div>

      <main>
        <div className="flex flex-col gap-1 w-full">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="h-10 rounded-[7px] grayza-shimmer" style={{ animationDelay: `${i * 20}ms` }} />
          ))}
        </div>
      </main>
    </div>
  )
}
