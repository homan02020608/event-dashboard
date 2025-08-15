"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "A line chart with a label"

const chartData = [
    { month: "January", event: 20000, concert: 30000 },
    { month: "February", event: 10000, concert: 30000 },
    { month: "March", event: 26000, concert: 0 },
    { month: "April", event: 36000, concert: 22000 },
    { month: "May", event: 50000, concert: 22000 },
    { month: "June", event: 18000, concert: 0 },
    { month: "July", event: 0, concert: 44000 },
]

const chartConfig = {
    event: {
        label: "event",
        color: "var(--chart-1)",
    },
    concert: {
        label: "concert",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartLineLabel() {
    return (
        <Card className="max-w-lg w-full mx-auto border-none shadow-xl ">
            <CardHeader>
                <CardTitle>2025年度 イベント費用グラフ</CardTitle>
                <CardDescription>January - July 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="event"
                            type="natural"
                            stroke="var(--color-event)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-event)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={10}
                            />
                        </Line>
                        <Line
                            dataKey="concert"
                            type="natural"
                            stroke="var(--color-concert)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-concert)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={10}
                                className="fill-foreground"
                                fontSize={10}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
