import { Line } from "react-chartjs-2";
import Spinner from "../atom/Spinner/Spinner";

export const Graph = ({ options, data, label = "Stats" }) => {
  return (
    <div className="py-5">
      {data ? (
        <div className="my-5">
          {data && (
            <div className="p-6 bg-[#fff] rounded-xl">
              <Line options={options} data={data} />
            </div>
          )}
        </div>
      ) : (
        <div className="my-5">
          {data && (
            <div className="p-6 h-[400px] grid place-items-center bg-[#fff] rounded-xl">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
