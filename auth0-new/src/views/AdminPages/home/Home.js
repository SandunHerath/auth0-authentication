import Chart from "../../../components/AdminComponents/chart/Chart";
import FeaturedInfo from "../../../components/AdminComponents/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../utils/dummyData";
import WidgetSm from "../../../components/AdminComponents/widgetSm/WidgetSm";
import WidgetLg from "../../../components/AdminComponents/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
