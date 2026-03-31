import { FiltersWidget } from "@/components/dashboard/filters-widget"
import { IncomeExpenseGraph } from "@/components/dashboard/income-expense-graph"
import { ProjectsWidget } from "@/components/dashboard/projects-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth"
import { formatCurrency } from "@/lib/utils"
import { getProjects } from "@/models/projects"
import { getSettings } from "@/models/settings"
import { getDashboardStats, getDetailedTimeSeriesStats, getProjectStats } from "@/models/stats"
import { TransactionFilters } from "@/models/transactions"
import { ArrowDown, ArrowUp, BicepsFlexed } from "lucide-react"
import Link from "next/link"

export async function StatsWidget({ filters }: { filters: TransactionFilters }) {
  const user = await getCurrentUser()
  const projects = await getProjects(user.id)
  const settings = await getSettings(user.id)
  const defaultCurrency = settings.default_currency || "EUR"

  const [statsResult, statsTimeSeriesResult, statsPerProjectResult] = await Promise.allSettled([
    getDashboardStats(user.id, filters),
    getDetailedTimeSeriesStats(user.id, filters, defaultCurrency),
    Promise.all(
      projects.map((project) => getProjectStats(user.id, project.code, filters).then((stats) => [project.code, stats]))
    ),
  ])

  const stats = statsResult.status === "fulfilled" ? statsResult.value : null
  const statsTimeSeries = statsTimeSeriesResult.status === "fulfilled" ? statsTimeSeriesResult.value : []
  const statsPerProject =
    statsPerProjectResult.status === "fulfilled" ? Object.fromEntries(statsPerProjectResult.value) : {}

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold tracking-tight">Overview</h2>

        <FiltersWidget defaultFilters={filters} defaultRange="last-12-months" />
      </div>

      {statsTimeSeries.length > 0 && <IncomeExpenseGraph data={statsTimeSeries} defaultCurrency={defaultCurrency} />}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/transactions?type=income">
          <Card className="grayza-card border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Total Income</CardTitle>
              <ArrowUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              {stats ? (
                <>
                  {Object.entries(stats.totalIncomePerCurrency).map(([currency, total]) => (
                    <div
                      key={currency}
                      className="flex gap-2 items-center font-mono font-bold text-base first:text-2xl text-emerald-400"
                    >
                      {formatCurrency(total, currency)}
                    </div>
                  ))}
                  {!Object.entries(stats.totalIncomePerCurrency).length && <div className="text-2xl font-mono font-bold text-muted-foreground">0.00</div>}
                </>
              ) : (
                <div className="text-2xl font-mono font-bold text-muted-foreground">--</div>
              )}
            </CardContent>
          </Card>
        </Link>
        <Link href="/transactions?type=expense">
          <Card className="grayza-card border-red-500/20 hover:border-red-500/40 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Total Expenses</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              {stats ? (
                <>
                  {Object.entries(stats.totalExpensesPerCurrency).map(([currency, total]) => (
                    <div key={currency} className="flex gap-2 items-center font-mono font-bold text-base first:text-2xl text-red-400">
                      {formatCurrency(total, currency)}
                    </div>
                  ))}
                  {!Object.entries(stats.totalExpensesPerCurrency).length && <div className="text-2xl font-mono font-bold text-muted-foreground">0.00</div>}
                </>
              ) : (
                <div className="text-2xl font-mono font-bold text-muted-foreground">--</div>
              )}
            </CardContent>
          </Card>
        </Link>
        <Link href="/transactions">
          <Card className="grayza-card border-[var(--grayza-border-accent)] hover:shadow-[0_0_20px_var(--grayza-accent-glow-lg)] cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Net Profit</CardTitle>
              <BicepsFlexed className="h-4 w-4 text-[var(--grayza-accent)]" />
            </CardHeader>
            <CardContent>
              {stats ? (
                <>
                  {Object.entries(stats.profitPerCurrency).map(([currency, total]) => (
                    <div
                      key={currency}
                      className={`flex gap-2 items-center font-mono font-bold text-base first:text-2xl ${
                        total >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(total, currency)}
                    </div>
                  ))}
                  {!Object.entries(stats.profitPerCurrency).length && <div className="text-2xl font-mono font-bold text-muted-foreground">0.00</div>}
                </>
              ) : (
                <div className="text-2xl font-mono font-bold text-muted-foreground">--</div>
              )}
            </CardContent>
          </Card>
        </Link>
        <Link href="/transactions">
          <Card className="grayza-card border-blue-500/20 hover:border-blue-500/40 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Processed Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold">{stats?.invoicesProcessed ?? "--"}</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold tracking-tight">Projects</h2>
      </div>

      <ProjectsWidget projects={projects} statsPerProject={statsPerProject} />
    </div>
  )
}
