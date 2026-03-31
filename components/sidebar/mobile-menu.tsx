"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/components/ui/sidebar"
import config from "@/lib/config"
import Link from "next/link"

export default function MobileMenu({ unsortedFilesCount }: { unsortedFilesCount: number }) {
  const { toggleSidebar } = useSidebar()

  return (
    <menu className="flex flex-row gap-2 p-2 items-center justify-between fixed top-0 left-0 w-full z-50 border-b border-[var(--grayza-border-accent)]/10 bg-[hsl(142_24%_6.7%)] backdrop-blur-xl md:hidden">
      <Avatar className="h-10 w-10 rounded-lg cursor-pointer border border-[var(--grayza-border-accent)] shadow-[0_0_8px_var(--grayza-accent-glow-lg)]" onClick={toggleSidebar}>
        <AvatarImage src="/logo/256.png" />
        <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#2A7A4A] to-[#1A4A2C] text-[var(--grayza-accent)]">AI</AvatarFallback>
      </Avatar>
      <Link href="/" className="text-lg font-display font-bold text-[var(--grayza-accent)]">
        {config.app.title}
      </Link>
      <Link
        href="/unsorted"
        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--grayza-accent-subtle)] border border-[var(--grayza-border-accent)] text-xs font-mono font-medium text-[var(--grayza-accent)]"
      >
        {unsortedFilesCount}
      </Link>
    </menu>
  )
}
