import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

export const getData = async () => {
  await get(child(dbRef, `DHT`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
