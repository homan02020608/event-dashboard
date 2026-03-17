"use client"
import { EventsForChartDataProps } from '@/types/type';
import React, { useMemo } from 'react'
import { ChartConfig } from '../ui/chart';

const chartConfig = {
    count: { label: '参加回数', color: "hsl(var(--chart-1))" },
    CONCERT: { label: 'コンサート', color: "hsl(var(--chart-2))" },
    REAL_MEETING: { label: 'リアミ', color: "hsl(var(--chart-3))" },
    REAL_SIGN: { label: 'リアルサイン', color: "hsl(var(--chart-4))" },
    ONLINE_MEETING: { label: 'オンラインミーグリ', color: "hsl(var(--chart-5))" },
    OTHER: { label: 'その他', color: "hsl(var(--muted))" },
} satisfies ChartConfig

const ExpensesTypeChart = ({ eventsForChartData }: { eventsForChartData: EventsForChartDataProps[] }) => {
    const currentYear = new Date().getFullYear();

    //今年参加したイベントを種類ごとに集計するロジック
    const chartData = useMemo(() => {
        const eventTypeCounts: Record<string, number> = {};

        eventsForChartData.forEach((event) => {
            const type = event.eventType || 'OTHER';
            eventTypeCounts[type] = (eventTypeCounts[type] || 0) + 1;
        });

        return Object.entries(eventTypeCounts).map(([type, count]) => ({
            type,
            count,
            fill: chartConfig[type as keyof typeof chartConfig]?.color || "hsl(var(--muted))",
        })).sort((a, b) => b.count - a.count)
    }, [eventsForChartData, currentYear])

    //本年度の合計イベント参加数
    const totalEvents = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    },[chartData])

    
    return (
        <div>ExpensesTypeChart</div>
    )
}

export default ExpensesTypeChart