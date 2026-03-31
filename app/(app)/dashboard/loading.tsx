export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-5 p-5 w-full max-w-7xl self-center animate-[fadeIn_200ms_ease-out]">
      <div className="flex flex-col sm:flex-row gap-5 items-stretch h-full">
        <div className="h-[200px] w-full rounded-[10px] grayza-shimmer" />
        <div className="h-[200px] w-full rounded-[10px] grayza-shimmer" />
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex items-center justify-between">
        <div className="h-8 w-32 rounded-md grayza-shimmer" />
        <div className="h-8 w-48 rounded-md grayza-shimmer" />
      </div>

      <div className="h-[250px] w-full rounded-[10px] grayza-shimmer" />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[120px] rounded-[10px] grayza-shimmer" />
        ))}
      </div>

      <div className="h-8 w-24 rounded-md grayza-shimmer" />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[100px] rounded-[10px] grayza-shimmer" />
        ))}
      </div>
    </div>
  )
}
