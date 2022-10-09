import dynamic from "next/dynamic";
// import axios from "axios";
import { useEffect } from "react";
// import Meta from "@/components/meta";
import { useState } from "react";
import {
  fetchPlausibleData,
  fetchTimeSeriesData,
  options,
} from "@/components/Stats/utils";
import { Graph } from "@/components/Stats/Graph";
import format from "date-fns/format";
import Link from "next/link";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const PageStats = () => {
  const [loaded, setLoaded] = useState(false);
  const [metrics, setMetrics] = useState(undefined);
  useEffect(() => {
    async function run() {
      const slug = "/post/adobe-figma-meme";
      const monthlyAggregate = await fetchPlausibleData(slug, [
        "visits",
        "bounce_rate",
        "visit_duration",
        "pageviews",
      ]);

      const timeSeries = await fetchTimeSeriesData(slug, [
        "visits",
        "bounce_rate",
        "visit_duration",
        "pageviews",
      ]);

      const visits = timeSeries.map((x) => {
        return x.visits;
      });

      const labels = timeSeries.map((x) => {
        const date = format(new Date(x.date), "dd MMM yyyy");
        return date;
      });

      const visitsData = {
        labels: labels,
        type: "line",
        display: false,
        datasets: [
          {
            label: "Visits ",
            backgroundColor: "#175BE0",
            fill: "origin",
            lineTension: 0.1,

            borderColor: "#175BE0",
            data: visits,
          },
        ],
      };

      const data = { monthlyAggregate, timeSeries, visitsData };
      setMetrics(data);
      setLoaded(true);
    }

    run();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-10">
        {loaded && (
          <div className="flex flex-col gap-3">
            <div>
              <Link href="/my-posts/stats">
                <button> Back</button>
              </Link>
            </div>
            <h2 className="text-2xl font-bold">Page Stats</h2>
            <div className="flex flex-row gap-4">
              {Object.keys(metrics.monthlyAggregate).map((data, i) => {
                const value = metrics.monthlyAggregate[data].value;
                return (
                  <div className="bg-gray-200 rounded p-5" key={`${data}-${i}`}>
                    <p>{data}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-gray-300 rounded h-[300px]">
              <Graph
                options={options}
                data={metrics.visitsData}
                label={"Visits Stats"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
