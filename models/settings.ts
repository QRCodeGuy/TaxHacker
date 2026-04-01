import { prisma } from "@/lib/db"
import config from "@/lib/config"
import { cache } from "react"

export type SettingsMap = Record<string, string>

/**
 * LLM settings are now server-side only — API keys come from environment
 * variables, never from user input or database storage.
 * Security: prevents API key exposure in client UI.
 */
export function getLLMSettings(_settings: SettingsMap) {
  return {
    providers: [
      {
        provider: "google" as const,
        apiKey: config.ai.googleApiKey || "",
        model: config.ai.googleModelName,
      },
    ],
  }
}

export const getSettings = cache(async (userId: string): Promise<SettingsMap> => {
  const settings = await prisma.setting.findMany({
    where: { userId },
  })

  return settings.reduce((acc, setting) => {
    acc[setting.code] = setting.value || ""
    return acc
  }, {} as SettingsMap)
})

export const updateSettings = cache(async (userId: string, code: string, value: string | undefined) => {
  return await prisma.setting.upsert({
    where: { userId_code: { code, userId } },
    update: { value },
    create: {
      code,
      value,
      name: code,
      userId,
    },
  })
})
