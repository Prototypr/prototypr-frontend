import { Line } from "react-chartjs-2";

export const Graph = ({ options, data, label = "Stats" }) => {
  return (
    <div className="py-5">
      {data ? (
        <div className="my-5">
          <h2 className="text-xl font-semibold my-4">{label}</h2>
          {data && (
            <div className="p-6 bg-[#F1F2F2] rounded-xl">
              <Line options={options} data={data} />
            </div>
          )}
        </div>
      ) : (
        <div className="my-5">
          <h2 className="text-xl font-semibold my-4 flex flex-row gap-2">
            <div className="w-20 h-2 bg-[#F1F2F2] rounded-full"></div>
            <div className="w-10 h-2 bg-[#F1F2F2] rounded-full"></div>
          </h2>
          {data && (
            <div className="p-6 h-[400px] grid place-items-center bg-[#F1F2F2] rounded-xl">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
