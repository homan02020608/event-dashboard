import React from 'react'
import HomePageInfoCard from './HomePageInfoCard'

const HomePageInfoCardList = () => {
    return (
        <div className='flex-Center flex-col lg:flex-row gap-8 lg:gap-12 '>
            <HomePageInfoCard
                title='累計参戦数'
                infoData={`30`}
            />
            <HomePageInfoCard
                title='年間支出'
                infoData={`¥${20000}`}
            />
            <HomePageInfoCard
                title='次のイベント'
                infoData={`東京公演`}
            />
        </div>
    )
}

export default HomePageInfoCardList