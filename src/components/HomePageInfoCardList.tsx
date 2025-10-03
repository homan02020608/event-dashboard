import React from 'react'
import HomePageInfoCard from './HomePageInfoCard'

type infoCardProps = {
    eventCount: number
    recentEventTitle: string
}

const HomePageInfoCardList = async ({ eventCount ,recentEventTitle }: infoCardProps) => {

    return (
        <div className='flex-Center flex-col lg:flex-row gap-8 lg:gap-12 '>
            <HomePageInfoCard
                title='累計参戦数'
                infoData={`${eventCount}`}
            />
            <HomePageInfoCard
                title='年間支出'
                infoData={`¥${10000 * eventCount}`}
            />
            <HomePageInfoCard
                title='次のイベント'
                infoData={`${recentEventTitle}`}
            />
        </div>
    )
}

export default HomePageInfoCardList