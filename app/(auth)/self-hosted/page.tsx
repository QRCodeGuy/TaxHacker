import config from "@/lib/config"
import { createUserDefaults, isDatabaseEmpty } from "@/models/defaults"
import { getSelfHostedUser, getOrCreateSelfHostedUser } from "@/models/users"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function SelfHostedWelcomePage() {
  if (!config.selfHosted.isEnabled) {
    redirect(config.auth.loginUrl)
  }

  const existingUser = await getSelfHostedUser()
  if (existingUser) {
    redirect(config.selfHosted.redirectUrl)
  }

  // Auto-create the self-hosted user and set up defaults
  const user = await getOrCreateSelfHostedUser()

  if (await isDatabaseEmpty(user.id)) {
    await createUserDefaults(user.id)
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export const dynamic = "force-dynamic"
