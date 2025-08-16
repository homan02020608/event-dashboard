"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "2025年参戦データグラフ"

const chartData = [
  { month: "January", event: 3, concert: 3 },
  { month: "February", event: 2, concert: 2 },
  { month: "March", event: 4, concert: 0 },
  { month: "April", event: 2, concert: 2 },
  { month: "May", event: 3, concert: 2 },
  { month: "June", event: 3, concert: 0 },
  { month: "July", event: 0, concert: 6 },
]

const chartConfig = {
  desktop: {
    label: "event",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "concert",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <Card className="max-w-xl  w-full mx-auto  border-none shadow-xl  ">
      <CardHeader>
        <CardTitle>2025年参戦データグラフ</CardTitle>
        <CardDescription>January - July 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="event" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="concert" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          過去七ヶ月のイベント参加データ
        </div>
      </CardFooter>
    </Card>
  )
}
