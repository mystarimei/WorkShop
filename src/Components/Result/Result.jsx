import "./Result.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const Result = ({
  year,
  city,
  area,
  ordinary_f,
  ordinary_m,
  single_f,
  single_m,
}) => {
  const getOptions = (type) => ({
    chart: {
      type,
    },
    title: {
      text: "人口數統計",
    },
    yAxis: {
      title: {
        text: "數量",
      },
    },
    xAxis: {
      title: {
        text: "型態",
      },
      categories: ["共同生活", "單獨生活"],
    },
    series: [
      {
        name: "男性",
        data: [ordinary_m, single_m],
      },
      {
        name: "女性",
        data: [ordinary_f, single_f],
      },
    ],
  });
  const getOptions2 = (type) => ({
    chart: {
      type,
    },
    title: {
      text: "戶數統計",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    series: [
      {
        data: [
          {
            name: "共同生活",
            y: ordinary_m + ordinary_f,
          },
          {
            name: "單獨生活",
            y: single_m + single_f,
          },
        ],
      },
    ],
  });

  return (
    <div className="Result">
      {year && city && area ? (
        <div className="resultTitle">
          <div className="year">{year}年</div>
          <div className="year">{city}</div>
          <div className="year">{area}</div>
        </div>
      ) : null}
      {year && city && area ? (
        <div className="Charts">
          <div className="column">
            <HighchartsReact
              highcharts={Highcharts}
              options={getOptions("column")}
            />
          </div>
          <div className="pie">
            <HighchartsReact
              highcharts={Highcharts}
              options={getOptions2("pie")}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Result;
