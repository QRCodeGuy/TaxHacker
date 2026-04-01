import { NextResponse } from "next/server"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL
  const diagnostics: Record<string, string> = {
    hasDbUrl: dbUrl ? "yes" : "no",
    dbHost: dbUrl ? new URL(dbUrl).hostname : "none",
    dbPort: dbUrl ? new URL(dbUrl).port : "none",
    dbUser: dbUrl ? new URL(dbUrl).username : "none",
    selfHostedMode: process.env.SELF_HOSTED_MODE || "unset",
    nodeEnv: process.env.NODE_ENV || "unset",
  }

  // Test DB connection
  try {
    const { PrismaClient } = require("@/prisma/client")
    const prisma = new PrismaClient()
    await prisma.$queryRawUnsafe("SELECT 1 as ok")
    diagnostics.dbConnection = "ok"
    await prisma.$disconnect()
  } catch (error: any) {
    diagnostics.dbConnection = "failed"
    diagnostics.dbError = error.message?.substring(0, 500) || "unknown"
  }

  return NextResponse.json(diagnostics)
}
