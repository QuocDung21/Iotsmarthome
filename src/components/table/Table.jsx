import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDatabase, ref, child, get } from "firebase/database";
import { useState, useEffect } from "react";
import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import axios from "axios";

const List = () => {
  const [dieukhien, setDieukhien] = useState([]);
  const [status, setStatus] = useState(true);
  const dbRef = ref(getDatabase());

  const [cheked, setChecked] = useState("defaultChecked ");

  const updateOn = async (key, status, name) => {
    await axios
      .put(
        "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata/control/" +
          key +
          ".json",

        {
          name: name,
          status: -status,
        }
      )
      .then((result) => {
        alert("Update success!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    setInterval(() => {
      const getData = async () => {
        await axios
          .get(
            "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata.json"
          )
          .then(async (result) => {
            await setDieukhien(result.data.control);
            console.log(dieukhien);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }, 1000);
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Stt</TableCell>
            <TableCell className="tableCell">Thiết bi</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
            <TableCell className="tableCell">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dieukhien
            ? dieukhien.map((data, key) => (
                <TableRow key={key}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">{key}</div>
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      {data ? data.name : "Loading..."}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${data ? data.status : ""}`}>
                      {data.status === 1 ? "Tắt" : "Bật"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        updateOn(key, data.status, data.name);
                        // alert(key);
                      }}
                    >
                      {data.status === 1 ? "Tắt" : "Bật"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : "Loading..."}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
