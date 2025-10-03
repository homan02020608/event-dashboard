import ChartSession from "@/components/chart/ChartSession";
import { EventTable } from "@/components/EventTable";
import HomePageInfoCardList from "@/components/HomePageInfoCardList";
import { getAllEventDataById } from "./action/action";

export default async function Home() {
  const eventData = await getAllEventDataById()
  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2 *:m-4">
      <h1 className="text-2xl font-semibold">Welcome Guest!</h1>
      <HomePageInfoCardList
        eventCount={eventData.length}
        recentEventTitle={eventData[eventData.length - 1].title}
      />
      <div className="flex justify-center flex-col lg:flex-row gap-16 ">
        <EventTable events={eventData} />
        <ChartSession />
      </div>

    </div>
  )
}