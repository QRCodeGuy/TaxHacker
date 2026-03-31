import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ProjectStats } from "@/models/stats"
import { Project } from "@/prisma/client"
import { Plus } from "lucide-react"
import Link from "next/link"

export function ProjectsWidget({
  projects,
  statsPerProject,
}: {
  projects: Project[]
  statsPerProject: Record<string, ProjectStats>
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {projects.map((project) => (
        <Link key={project.code} href={`/transactions?projectCode=${project.code}`}>
          <Card className="grayza-card cursor-pointer">
            <CardHeader>
              <CardTitle>
                <Badge
                  className="text-sm font-mono"
                  style={{ backgroundColor: project.color }}
                >
                  {project.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Income</div>
                  <div className="text-xl font-mono font-bold text-emerald-400">
                    {Object.entries(statsPerProject[project.code]?.totalIncomePerCurrency).map(([currency, total]) => (
                      <div key={currency} className="flex flex-col gap-1 font-mono font-bold text-emerald-400 text-sm first:text-xl">
                        {formatCurrency(total, currency)}
                      </div>
                    ))}
                    {!Object.entries(statsPerProject[project.code]?.totalIncomePerCurrency).length && (
                      <div className="font-mono font-bold text-sm first:text-xl text-muted-foreground">0.00</div>
                    )}
                  </div>
                </div>
                <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Expenses</div>
                  <div className="text-xl font-mono font-bold text-red-400">
                    {Object.entries(statsPerProject[project.code]?.totalExpensesPerCurrency).map(
                      ([currency, total]) => (
                        <div key={currency} className="flex flex-col gap-1 font-mono font-bold text-red-400 text-sm first:text-xl">
                          {formatCurrency(total, currency)}
                        </div>
                      )
                    )}
                    {!Object.entries(statsPerProject[project.code]?.totalExpensesPerCurrency).length && (
                      <div className="font-mono font-bold text-sm first:text-xl text-muted-foreground">0.00</div>
                    )}
                  </div>
                </div>
                <div className="bg-[var(--grayza-accent-subtle)] p-3 rounded-lg border border-[var(--grayza-border-accent)]/50">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Profit</div>
                  <div className="text-xl font-mono font-bold">
                    {Object.entries(statsPerProject[project.code]?.profitPerCurrency).map(([currency, total]) => (
                      <div
                        key={currency}
                        className={`flex flex-col gap-1 items-center text-xl font-mono font-bold ${
                          total >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {formatCurrency(total, currency)}
                      </div>
                    ))}
                    {!Object.entries(statsPerProject[project.code]?.profitPerCurrency).length && (
                      <div className="text-xl font-mono font-bold text-muted-foreground">0.00</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      <Link
        href="/settings/projects"
        className="flex items-center justify-center gap-2 border-dashed border border-border rounded-[10px] p-6 text-muted-foreground transition-all duration-200 hover:border-[var(--grayza-border-accent)] hover:text-[var(--grayza-accent)] group"
      >
        <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
        <span className="font-medium text-sm">Create New Project</span>
      </Link>
    </div>
  )
}
