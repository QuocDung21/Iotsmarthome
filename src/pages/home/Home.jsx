import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import ExampleChart from "../../components/chart/ExampleChart";
import axios from "axios";
const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    setInterval(() => {
      const fetchData = async () => {
        const result = await axios
          .get(
            "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata/dht.json"
          )
          .then(async (result) => {
            await setWeatherData(result.data);
          })
          .catch((err) => {});
      };
      console.log(weatherData);
      fetchData();
      clearInterval(setInterval);
    }, 1000);
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget data={weatherData} type="nhietdo" />
          <Widget data={weatherData} type="doam" />
          <Widget data={weatherData} type="canhbao" />
          <Widget data={weatherData} type="dieukhien" />
        </div>
        <div className="charts">
          <Featured data={weatherData} />
          <ExampleChart title="" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
