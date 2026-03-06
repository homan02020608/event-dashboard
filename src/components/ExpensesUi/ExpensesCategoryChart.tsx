"use client"

import { Pie, PieChart } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { ExpensesDataTypes } from "@/types/type"


const chartData = [
    { browser: "TICKET", visitors: 275, fill: "var(--color-TICKET)" },
    { browser: "GOODS", visitors: 200, fill: "var(--color-GOODS)" },
    { browser: "TRANSPORTATION", visitors: 187, fill: "var(--color-TRANSPORTATION)" },
    { browser: "ACCOMMODATION", visitors: 173, fill: "var(--color-ACCOMMODATION)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    TICKET: {
        label: "チケット代",
        color: "var(--chart-1)",
    },
    GOODS: {
        label: "グッズ代",
        color: "var(--chart-2)",
    },
    TRANSPORTATION: {
        label: "交通費",
        color: "var(--chart-3)",
    },
    ACCOMMODATION: {
        label: "宿泊費",
        color: "var(--chart-4)",
    },
    other: {
        label: "その他",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ExpensesCategroyChart({ expensesData }: { expensesData: ExpensesDataTypes[] }) {
    return (
        <div className="mx-auto w-full h-[180px] flex-Start flex-col p-2">
            <div className="font-semibold w-full p-2">年間出費割合</div>
            <ChartContainer
                config={chartConfig}
                className="aspect-square h-full w-full "
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="visitors"
                        nameKey="browser"
                        innerRadius={50}
                        outerRadius={70}
                    />
                </PieChart>
            </ChartContainer>
        </div>
    )
}
