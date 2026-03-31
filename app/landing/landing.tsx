import config from "@/lib/config"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080E0A] text-[rgba(255,255,255,0.92)]">
      {/* Top Bar */}
      <header className="py-4 px-4 md:px-8 bg-[#0D1510]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)] fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[#2A7A4A] to-[#1A4A2C] border border-[rgba(74,222,128,0.25)] shadow-[0_0_12px_rgba(94,207,130,0.18)] flex items-center justify-center overflow-hidden">
              <Image
                src="/logo/256.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span className="text-xl font-display font-bold text-[#5ECF82]">TaxHacker</span>
          </Link>
          <Link
            href="/enter"
            className="cursor-pointer font-medium px-5 py-2 rounded-lg bg-[rgba(94,207,130,0.10)] border border-[rgba(74,222,128,0.25)] text-[#5ECF82] text-sm hover:bg-[rgba(94,207,130,0.18)] hover:shadow-[0_0_12px_rgba(94,207,130,0.18)] transition-all duration-200"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-8 relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#5ECF82] rounded-full opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3A9E5F] rounded-full opacity-[0.04] blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full border border-[rgba(74,222,128,0.25)] bg-[rgba(94,207,130,0.10)] text-xs font-medium uppercase tracking-widest text-[#5ECF82] mb-6">
              Under Active Development
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 text-[rgba(255,255,255,0.92)] leading-tight">
              Let AI finally care about your taxes,<br className="hidden md:block" />
              scan your receipts and analyze your expenses
            </h1>
            <p className="text-lg text-[rgba(255,255,255,0.60)] mb-8 max-w-2xl mx-auto font-light">
              Self-hosted accounting app crafted for freelancers, indie-hackers and small businesses
            </p>
            <div className="flex gap-4 justify-center text-sm md:text-base">
              <Link
                href="#start"
                className="px-8 py-3 bg-[rgba(94,207,130,0.10)] border border-[rgba(74,222,128,0.25)] text-[#5ECF82] font-semibold rounded-lg hover:bg-[rgba(94,207,130,0.18)] hover:shadow-[0_0_20px_rgba(94,207,130,0.18)] transition-all duration-200"
              >
                Get Started
              </Link>
              <Link
                href="mailto:me@vas3k.com"
                className="px-8 py-3 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.60)] font-semibold rounded-lg hover:border-[rgba(255,255,255,0.14)] hover:text-[rgba(255,255,255,0.92)] transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative aspect-auto rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
            <video className="w-full h-auto" autoPlay loop muted playsInline poster="/landing/ai-scanner-big.webp">
              <source src="/landing/video.mp4" type="video/mp4" />
              <Image src="/landing/ai-scanner-big.webp" alt="TaxHacker" width={1728} height={1080} priority />
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="flex flex-col gap-3 mb-4">
              <span className="text-5xl font-display font-bold text-[#5ECF82]">
                F*ck Taxes
              </span>
              <span className="text-3xl font-display font-bold text-[rgba(255,255,255,0.92)]">
                TaxHacker saves you time, money and nerves
              </span>
            </h2>
          </div>

          {/* Feature blocks */}
          {[
            {
              pill: "LLM-Powered",
              pillColor: "#58A6FF",
              title: "Analyze photos and invoices with AI",
              items: [
                "Upload your receipts or invoices in PDF for automatic recognition",
                "Extract key information like dates, items, and vendors",
                "Works with any language and any photo quality",
                "Automatically organize everything into a structured database",
                "Bulk upload and analyze multiple files at once",
              ],
              image: "/landing/ai-scanner.webp",
              imageAlt: "AI Document Analyzer",
              imageW: 1900,
              imageH: 1524,
              reverse: false,
            },
            {
              pill: "Currency Converter",
              pillColor: "#5ECF82",
              title: "Automatically convert currencies (even crypto!)",
              items: [
                "Detects foreign currencies and converts it to yours",
                "Knows historical exchange rates on a date of transaction",
                "Supports 170+ world currencies",
                "Works with popular cryptocurrencies (BTC, ETH, LTC, etc.)",
                "Still allows you to fill it manually",
              ],
              image: "/landing/multi-currency.webp",
              imageAlt: "Currency Converter",
              imageW: 1400,
              imageH: 1005,
              reverse: true,
            },
            {
              pill: "Filters & Categories",
              pillColor: "#F876A8",
              title: "Organize your transactions using fully customizable categories, projects and fields",
              items: [
                "Absolute freedom to create custom categories, projects and fields",
                "Add, edit and manage your transactions",
                "Filter by any column, category or date range",
                "Customize which columns to show in the table",
                "Import transactions from CSV",
              ],
              image: "/landing/transactions.webp",
              imageAlt: "Transactions Table",
              imageW: 2000,
              imageH: 1279,
              reverse: false,
            },
            {
              pill: "Invoice Generator",
              pillColor: "#9D84F5",
              title: "Create custom invoices",
              items: [
                "Advanced invoice generator to create any invoice in any language",
                "Edit any field, even labels and titles",
                "Export invoices to PDF or as transactions",
                "Save invoices as templates to reuse them later",
                "Native support for both included and excluded taxes (VAT, GST, etc.)",
              ],
              image: "/landing/invoice-generator.webp",
              imageAlt: "Invoice Generator",
              imageW: 1800,
              imageH: 1081,
              reverse: true,
            },
            {
              pill: "Control over AI",
              pillColor: "#4ECDC4",
              title: "Tune any LLM prompt to extract anything you need",
              items: [
                "Expand and improve your TaxHacker instance with custom LLM prompts",
                "Create custom fields and categories and tell AI how to parse them for you",
                "Extract any additional information you need",
                "Automatically categorize by project or category",
                "Ask AI to assess risk level or any other criteria",
              ],
              image: "/landing/custom-llm.webp",
              imageAlt: "Custom LLM prompts",
              imageW: 1800,
              imageH: 1081,
              reverse: false,
            },
            {
              pill: "Self-hosting & Data Export",
              pillColor: "#F0A856",
              title: "Your Data — Your Rules",
              items: [
                "Deploy your own instance of TaxHacker for 100% privacy",
                "Export your transactions to CSV for tax prep",
                "Full-text search across documents and invoices",
                "Download full data archive to migrate to another service. We don't take away or limit what you do with your data",
              ],
              image: "/landing/export.webp",
              imageAlt: "Export",
              imageW: 1200,
              imageH: 1081,
              reverse: true,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`flex flex-wrap items-center gap-12 mb-16 bg-[#0D1510] p-8 rounded-xl border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] transition-all duration-200 group ${feature.reverse ? "flex-row-reverse" : ""}`}
            >
              <div className="flex-1 min-w-60">
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border"
                  style={{
                    backgroundColor: `${feature.pillColor}15`,
                    borderColor: `${feature.pillColor}30`,
                    color: feature.pillColor,
                  }}
                >
                  {feature.pill}
                </div>
                <h3
                  className="text-xl font-display font-bold mb-4"
                  style={{ color: feature.pillColor }}
                >
                  {feature.title}
                </h3>
                <ul className="space-y-3 text-[rgba(255,255,255,0.60)] text-sm">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: feature.pillColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 relative aspect-auto rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(255,255,255,0.14)] transition-all duration-200">
                <Image src={feature.image} alt={feature.imageAlt} width={feature.imageW} height={feature.imageH} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment Options */}
      <section
        id="start"
        className="py-20 px-8 scroll-mt-20 relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-[#5ECF82]">
              Choose Your Version of TaxHacker
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Self-Hosted */}
            <div className="bg-[#0D1510] p-8 rounded-xl border border-[rgba(74,222,128,0.25)] hover:shadow-[0_0_24px_rgba(94,207,130,0.08)] transition-all duration-200">
              <div className="inline-block px-3 py-1 rounded-full bg-[rgba(94,207,130,0.10)] border border-[rgba(74,222,128,0.25)] text-xs font-semibold uppercase tracking-widest text-[#5ECF82] mb-6">
                Use Your Own Server
              </div>
              <h3 className="text-2xl font-display font-bold text-[#5ECF82] mb-4">
                Self-Hosted Edition
              </h3>
              <ul className="space-y-3 text-[rgba(255,255,255,0.60)] text-sm mb-8">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[#5ECF82] shrink-0" />
                  Free and Open Source
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[#5ECF82] shrink-0" />
                  Complete control over your data
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[#5ECF82] shrink-0" />
                  Deploy at your own infrastructure or home server
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[#5ECF82] shrink-0" />
                  Bring your own keys (OpenAI, Gemini, Mistral, etc.)
                </li>
              </ul>
              <Link
                href="https://github.com/vas3k/TaxHacker"
                target="_blank"
                className="block w-full text-center px-6 py-3 bg-[rgba(94,207,130,0.10)] border border-[rgba(74,222,128,0.25)] text-[#5ECF82] font-semibold rounded-lg hover:bg-[rgba(94,207,130,0.18)] hover:shadow-[0_0_12px_rgba(94,207,130,0.18)] transition-all duration-200"
              >
                Github + Docker Compose
              </Link>
            </div>

            {/* Cloud */}
            <div className="bg-[#0D1510] p-8 rounded-xl border border-[rgba(255,255,255,0.08)] opacity-70">
              <div className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-xs font-semibold uppercase tracking-widest text-[rgba(255,255,255,0.38)] mb-6">
                We Host It For You
              </div>
              <h3 className="text-2xl font-display font-bold text-[rgba(255,255,255,0.38)] mb-4">
                Cloud Edition
              </h3>
              <ul className="space-y-3 text-[rgba(255,255,255,0.38)] text-sm mb-8">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
                  SaaS version if you don&apos;t want to hassle with own servers
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
                  We provide you with AI keys and storage
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
                  Yearly subscription plans. No hidden fees
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)] shrink-0" />
                  Automatic updates and new features
                </li>
              </ul>
              <button
                type="button"
                disabled
                className="block w-full text-center px-6 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.38)] font-semibold rounded-lg cursor-not-allowed"
              >
                Temporarily unavailable
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-20 px-8 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#5ECF82] rounded-full opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#3A9E5F] rounded-full opacity-[0.03] blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-[#5ECF82] mb-4">
              Upcoming Features
            </h2>
            <p className="text-[rgba(255,255,255,0.60)] max-w-2xl mx-auto">
              We&apos;re a small, indie project constantly improving. Here&apos;s what we&apos;re working on next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {[
              {
                icon: "⚡",
                title: "Better AI Analytics & Agents",
                color: "#9D84F5",
                items: ["Income & expense insights", "AI agents to automate your workflows", "Recommendations for tax optimization", "Custom and local LLM models"],
              },
              {
                icon: "◎",
                title: "Smart Reports & Reminders",
                color: "#F876A8",
                items: ["Monthly or quarterly VAT reports", "Tax reminders", "Annual income & expense reports"],
              },
              {
                icon: "◈",
                title: "Multiple Transaction Review",
                color: "#5ECF82",
                items: ["Bank statement analysis", "Automatic data completeness checks", "Unpaid invoice tracking"],
              },
              {
                icon: "⬡",
                title: "Presets and Plugins",
                color: "#F0A856",
                items: ["Presets for different countries and industries", "Custom reports for various use-cases", "Community plugins and reports"],
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#0D1510] p-6 rounded-xl border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl" style={{ color: feature.color }}>{feature.icon}</span>
                  <h3 className="text-base font-display font-bold" style={{ color: feature.color }}>
                    {feature.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-[rgba(255,255,255,0.60)] text-sm">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: feature.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stay Tuned */}
          <div className="bg-[#0D1510] p-8 rounded-xl border border-[rgba(74,222,128,0.25)]">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-display font-semibold mb-4">Stay Tuned</h3>
              <p className="text-[rgba(255,255,255,0.60)] text-sm mb-6">
                We&apos;re working hard on making TaxHacker useful for everyone. Star and watch our GitHub repo to get
                notified about new features and releases.
              </p>
              <a
                href="https://github.com/vas3k/TaxHacker"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 bg-[rgba(94,207,130,0.10)] border border-[rgba(74,222,128,0.25)] text-[#5ECF82] font-semibold rounded-lg hover:bg-[rgba(94,207,130,0.18)] hover:shadow-[0_0_12px_rgba(94,207,130,0.18)] transition-all duration-200"
              >
                Open GitHub repo
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[rgba(255,255,255,0.38)]">
          Made with care in Berlin by{" "}
          <Link
            href="https://github.com/vas3k"
            className="underline text-[rgba(255,255,255,0.60)] hover:text-[#5ECF82] transition-colors"
          >
            @vas3k
          </Link>
        </div>

        <div className="py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { href: `mailto:${config.app.supportEmail}`, label: "Contact Us" },
                { href: "/docs/terms", label: "Terms of Service" },
                { href: "/docs/privacy_policy", label: "Privacy Policy" },
                { href: "/docs/ai", label: "AI Use Disclosure" },
                { href: "/docs/cookie", label: "Cookie Policy" },
                { href: "https://github.com/vas3k/TaxHacker", label: "Source Code", external: true },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: "_blank" } : {})}
                  className="text-xs text-[rgba(255,255,255,0.38)] hover:text-[#5ECF82] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
