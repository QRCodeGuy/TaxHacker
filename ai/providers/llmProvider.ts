import { ChatOpenAI } from "@langchain/openai"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatMistralAI } from "@langchain/mistralai"
import { BaseChatModel } from "@langchain/core/language_models/chat_models"
import { BaseMessage, HumanMessage } from "@langchain/core/messages"
import { AnalyzeAttachment } from "../attachments"

export type LLMProvider = "openai" | "google" | "mistral" | "openai_compatible"

export interface LLMConfig {
  provider: LLMProvider
  apiKey: string
  model: string
  baseUrl?: string
}

export interface LLMSettings {
  providers: LLMConfig[]
}

export interface LLMRequest {
  prompt: string
  schema?: Record<string, unknown>
  attachments?: AnalyzeAttachment[]
}

export interface LLMResponse {
  output: Record<string, string>
  tokensUsed?: number
  provider: LLMProvider
  error?: string
}

type MessageContent = { type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }

function createModel(config: LLMConfig): BaseChatModel | null {
  const temperature = 0

  switch (config.provider) {
    case "openai":
      return new ChatOpenAI({
        apiKey: config.apiKey,
        model: config.model,
        temperature,
      })
    case "google":
      return new ChatGoogleGenerativeAI({
        apiKey: config.apiKey,
        model: config.model,
        temperature,
      })
    case "mistral":
      return new ChatMistralAI({
        apiKey: config.apiKey,
        model: config.model,
        temperature,
      })
    case "openai_compatible":
      return new ChatOpenAI({
        apiKey: config.apiKey || "not-needed",
        model: config.model,
        temperature,
        configuration: {
          baseURL: config.baseUrl?.trim(),
        },
      })
    default:
      return null
  }
}

function buildMessageContent(req: LLMRequest): MessageContent[] {
  const content: MessageContent[] = [{ type: "text", text: req.prompt }]

  if (req.attachments && req.attachments.length > 0) {
    for (const att of req.attachments) {
      content.push({
        type: "image_url",
        image_url: { url: `data:${att.contentType};base64,${att.base64}` },
      })
    }
  }

  return content
}

async function requestLLMUnified(config: LLMConfig, req: LLMRequest): Promise<LLMResponse> {
  try {
    const model = createModel(config)
    if (!model) {
      return { output: {}, provider: config.provider, error: "Unknown provider" }
    }

    const content = buildMessageContent(req)
    const messages: BaseMessage[] = [new HumanMessage({ content })]

    let response: Record<string, string>
    if (config.provider === "openai_compatible") {
      const raw = await model.invoke(messages)
      const text = typeof raw.content === "string" ? raw.content : (raw.content as Array<{ text?: string }>).map((c) => c.text || "").join("")
      response = JSON.parse(text.replace(/```(?:json)?\s*/g, "").trim())
    } else {
      const structuredModel = model.withStructuredOutput(req.schema!, { name: "transaction" })
      response = await structuredModel.invoke(messages) as Record<string, string>
    }

    return { output: response, provider: config.provider }
  } catch (error: unknown) {
    return {
      output: {},
      provider: config.provider,
      error: error instanceof Error ? error.message : `${config.provider} request failed`,
    }
  }
}

export async function requestLLM(settings: LLMSettings, req: LLMRequest): Promise<LLMResponse> {
  for (const config of settings.providers) {
    if (!config.model) {
      console.info("Skipping provider:", config.provider, "(no model)")
      continue
    }
    if (config.provider === "openai_compatible" ? !config.baseUrl : !config.apiKey) {
      console.info("Skipping provider:", config.provider, "(not configured)")
      continue
    }
    console.info("Use provider:", config.provider)

    const response = await requestLLMUnified(config, req)

    if (!response.error) {
      return response
    } else {
      console.error(response.error)
    }
  }

  return {
    output: {},
    provider: settings.providers[0]?.provider || "openai",
    error: "All LLM providers failed or are not configured",
  }
}
