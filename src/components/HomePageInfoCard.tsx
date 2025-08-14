import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface InfoCardProps {
    title: string;
    infoData: string
}

const HomePageInfoCard = ({ title, infoData }: InfoCardProps) => {
    return (
        <Card className="w-full max-w-xl lg:max-w-sm border-none shadow-xl">
            <CardHeader>
                <CardTitle className='font-light text-md border-l border-gray-400 pl-2'>{title}</CardTitle>
                <CardAction></CardAction>
            </CardHeader>
            <CardContent>
                <div className='font-medium text-xl text-gray-600'>{infoData}</div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
            </CardFooter>
        </Card>
    )
}

export default HomePageInfoCard