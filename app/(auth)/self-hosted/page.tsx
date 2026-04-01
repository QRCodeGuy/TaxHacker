import config from "@/lib/config"
import { getSelfHostedUser } from "@/models/users"
import { redirect } from "next/navigation"

export default async function SelfHostedWelcomePage() {
  if (!config.selfHosted.isEnabled) {
    redirect(config.auth.loginUrl)
  }

  const user = await getSelfHostedUser()
  if (user) {
    redirect(config.selfHosted.redirectUrl)
  }

  // Auto-setup without asking for API keys — they come from environment
  redirect(config.selfHosted.redirectUrl)
}

export const dynamic = "force-dynamic"
