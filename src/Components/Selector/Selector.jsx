import { useState, useEffect } from "react";
import "./Selector.css";
import Result from "../Result/Result";
import Loading from "../Loading";
const url = "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/";
const Selector = () => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("111");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [flag, setflag] = useState(false);
  const [newData, setNewData] = useState([]);
  const sortArea = new Set(newData.map((data) => data.site_id));
  const typeArea = [...sortArea];

  const tmpCity = [];
  const tmpArea = [];
  typeArea.map((data) => {
    tmpCity.push(data.substring(0, 3));
  });
  const completeCity = new Set(tmpCity);

  const finalCity = [...completeCity];

  const includeArea = [];
  typeArea.forEach((data) => {
    if (data.includes(city)) {
      includeArea.push(data);
    }
  });

  includeArea.map((data) => {
    tmpArea.push(data.substring(3));
  });

  let ordinary_m = 0;
  let ordinary_f = 0;
  let single_m = 0;
  let single_f = 0;
  const findData = newData.filter((data) => data.site_id === `${city}${area}`);
  findData.forEach((data) => {
    ordinary_f += Number(data.household_ordinary_f);
    ordinary_m += Number(data.household_ordinary_m);
    single_f += Number(data.household_single_f);
    single_m += Number(data.household_single_m);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setflag(true);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
    setCity("");
    setArea("");
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
    setArea("");
  };
  const handleChangeArea = (e) => {
    setArea(e.target.value);
    setflag(false);
  };

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch(`${url}${year}`);
      const data = await response.json();
      const { responseData } = data;
      if (responseData) {
        setNewData(responseData);
      } else {
        setNewData([]);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [year, city, area]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Selector">
      <p className="selectorTitle">人口數、戶數按戶別及性別統計</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="year">
          <label htmlFor="year">年份：</label>
          <select
            name="year"
            id="year"
            value={year}
            onChange={handleChangeYear}
          >
            <option value="111">111</option>
            <option value="110">110</option>
            <option value="109">109</option>
            <option value="108">108</option>
            <option value="107">107</option>
            <option value="106">106</option>
          </select>
        </div>

        <div className="city">
          <label htmlFor="city">縣市：</label>
          <select
            name="city"
            id="city"
            value={city}
            onChange={handleChangeCity}
          >
            <option value="" style={{ color: "gray" }} hidden>
              請選擇 縣/市：
            </option>
            {finalCity.map((city) => {
              return <option value={city}>{city}</option>;
            })}
          </select>
        </div>

        <div className="area">
          <label htmlFor="area">區域：</label>
          <select
            name="area"
            id="area"
            value={area}
            onChange={handleChangeArea}
            disabled={city ? false : true}
          >
            <option value="" style={{ color: "gray" }} hidden>
              請先選擇 縣/市
            </option>
            {tmpArea.map((area) => {
              return <option value={area}>{area}</option>;
            })}
          </select>
        </div>
        <div className="btn">
          <input
            disabled={city && area ? false : true}
            type="submit"
            value="SUBMIT"
          />
        </div>
      </form>
      {flag ? (
        <Result
          year={year}
          city={city}
          area={area}
          ordinary_f={ordinary_f}
          ordinary_m={ordinary_m}
          single_f={single_f}
          single_m={single_m}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Selector;
