import ChartSession from "@/components/ChartSession";
import HomePageInfoCardList from "@/components/HomePageInfoCardList";

export default function Home() {

  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2 *:m-4">
      <h1 className="text-2xl font-semibold">Welcome Guest!</h1>
      <HomePageInfoCardList/>
      <ChartSession/>
    </div>
  )
}