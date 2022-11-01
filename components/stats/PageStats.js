// import axios from "axios";
import { useEffect } from "react";
// import Meta from "@/components/meta";
import { useState } from "react";
import {
  fetchPlausibleData,
  fetchTimeSeriesData,
  options,
} from "@/components/stats/utils";
import axios from "axios";

import { Graph } from "@/components/stats/Graph";
import format from "date-fns/format";
import Link from "next/link";
import Layout from "@/components/layout-editor";
import useUser from "@/lib/iron-session/useUser";

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
import { useRouter } from "next/router";

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
  const [showError, setShowError] = useState(false);

  const { user } = useUser();

  const router = useRouter();
  const { slug: slugger } = router.query;

  useEffect(() => {
    async function fetch() {
      let configUpload = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/posts/stats`,
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
        },
        data: {
          id: user.id,
          slug: slugger,
        },
      };

      await axios(configUpload)
        .then(async function (response) {
          const data = response.data;
          console.log("bing bong -", data);
          const { plausibleData, status } = data;

          if (status === 401) {
            setShowError(true);
            console.log("You can't view someone else's stats!");
          }

          if (status === 200) {
            const { timeSeries, monthlyAggregate } = plausibleData;

            console.log(timeSeries, monthlyAggregate);

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
                  backgroundColor: "#0542DF",
                  fill: "origin",
                  lineTension: 0.3,

                  borderColor: "#0542DF",
                  data: visits,
                },
              ],
            };

            const d = { monthlyAggregate, timeSeries, visitsData };
            setMetrics(d);
            setLoaded(true);
            setShowError(false);
          }
        })
        .catch(function (error) {
          console.log("error -", error);
        });
    }

    if (user) {
      fetch();
    }
  }, [user]);

  const labels = {
    bounce_rate: { title: "Bounce Rate", suffix: "%" },
    pageviews: { title: "Page Views", suffix: " views" },
    visit_duration: { title: "Visits Duration", suffix: " min" },
    visits: { title: "Visits", suffix: " uniques" },
  };

  return (
    <Layout>
      <div>
        <div className="p-10">
          {showError && (
            <div className="bg-gray-100 mt-10 p-10 rounded">
              {" "}
              Oops, only the author can view this post!
            </div>
          )}
          {loaded && !showError && (
            <div className="flex flex-col gap-3 mt-10">
              <div>
                <Link href="/my-posts/stats">
                  <button className="text-sm"> Back</button>
                </Link>
              </div>
              <h2 className="text-2xl font-bold">Page visits</h2>
              <p className="underline text-sm cursor-pointer">
                /posts/{slugger}
              </p>

              <div className="w-full bg-[#EFF2F8] rounded-lg border border-opacity-10 h-auto p-10 flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                  {Object.keys(metrics.monthlyAggregate).map((data, i) => {
                    const value = metrics.monthlyAggregate[data].value;
                    return (
                      <div
                        className="bg-white w-[200px] rounded p-5 border border-opacity-10"
                        key={`${data}-${i}`}
                      >
                        <p className="text-xs text-[#696969]">
                          {labels[data].title}
                        </p>
                        <p className="text-2xl font-semibold text-[#333]">
                          {`${value}`}
                          <span className="text-base font-medium">
                            {labels[data].suffix}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
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
    </Layout>
  );
};
