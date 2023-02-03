import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import WarningIcon from "@mui/icons-material/Warning";
import { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

const Widget = ({ type, data }) => {
  const [diff, setDiff] = useState(null);
  const dt = data.slice(-1);
  console.log("====================================");
  console.log(dt);
  console.log("====================================");
  let dulieu;
  switch (type) {
    case "nhietdo":
      dulieu = {
        title: "Nhiệt độ",
        isMoney: true,
        query: "users",
        amount: dt[0] ? dt[0].nhietdo : 0,
        icon: (
          <ThermostatIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "doam":
      dulieu = {
        title: "Độ ẩm",
        isMoney: true,
        amount: dt[0] ? dt[0].doam : 0,
        icon: (
          <ThermostatIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "canhbao":
      dulieu = {
        title: "Cảnh báo",
        isMoney: false,
        amount: dt[0] ? dt[0].Flame : 0,
        icon: (
          <WarningIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "dieukhien":
      dulieu = {
        title: "Chuyển động",
        query: "products",
        amount: dt[0] ? dt[0].chuyendong : 0,
        isMoney: false,
        icon: (
          <DirectionsWalkIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dulieu.title}</span>
        <span className="counter">
          {dulieu.amount} {dulieu.isMoney && "°C"}
        </span>
        <span className="link">{dulieu.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff} %
        </div>
        {dulieu.icon}
      </div>
    </div>
  );
};

export default Widget;
