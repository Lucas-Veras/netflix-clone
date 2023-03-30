import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import { getHeaders } from "../../utils/getHeaders";

export default function Home() {
  const [userStats, setUserStats] = useState([])

  const months = useMemo(() => [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ], [])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await api.get("/users/stats", getHeaders())
        const statsList = res.data.sort((a, b) => a._id - b._id)
        statsList.map(item => setUserStats(prev => [
          ...prev, { name: months[item._id - 1], "New User": item.total }
        ])
        )
      } catch (err) {
        console.log(err)
      }
    }
    getStats()
  }, [months])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="New User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
