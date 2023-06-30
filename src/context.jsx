import { useState, useContext, createContext, useEffect } from "react";

const url = "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [newData, setNewData] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${year}`);
      const data = await response.json();
      console.log(data);
      // const { responseData } = data;
      // if (data) {
      //   const newData = responseData.map((data) => {
      //     const {
      //       tatistic_yyy,
      //       site_id,
      //       household_ordinary_m,
      //       household_single_m,
      //       household_ordinary_f,
      //       household_single_f,
      //     } = data;
      //     return {
      //       year: tatistic_yyy,
      //       site: site_id,
      //       ordinary_m: household_ordinary_m,
      //       single_m: household_single_m,
      //       ordinary_f: household_ordinary_f,
      //       single_f: household_single_f,
      //     };
      //   });
      //   setNewData(newData);
      // } else {
      //   setNewData([]);
      // }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  fetchData();

  // const value = {
  //   loading,
  //   newData,
  //   setYear,
  //   setCity,
  //   setArea,
  // };
  // return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
