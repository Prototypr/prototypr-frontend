import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import dynamic from "next/dynamic";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));

const customStyles = {
  tableWrapper: {
    style: {
      borderRadius: "6px",
      border: "1px solid #eee",
      overflow: "hidden",
      padding: "20px",
    },
  },
  rows: {
    style: {
      color: "red",
    },
  },
  cells: {
    style: {
      padding: "20px",
      color: "black",
    },
  },
};

const columns = [
  {
    name: "Article",
    selector: (row) => {
      return (
        <div>
          <a target="_blank" className="text-blue-800 underline" href={row.url}>
            {row.title}
          </a>
        </div>
      );
    },
    sortable: true,
  },
  {
    name: "Total Micropayments",
    selector: (row) => row.total_payout,
    sortable: true,
  },
  {
    name: "Currency",
    selector: (row) => row.currency,
    sortable: true,
  },
];

const PayoutTable = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON
  );

  const [payouts, setPayouts] = useState(null);

  useEffect(() => {
    const getPayouts = async () => {
      const { data, error } = await supabase.from("payouts").select();

      setPayouts(data);
    };

    getPayouts();
  }, []);

  return (
    <div className="mt-6 mb-8">
      {payouts?.length ? (
        <div>
          <DataTable
            columns={columns}
            data={payouts}
            striped={false}
            customStyles={customStyles}
          />
        </div>
      ) : (
        <div
          style={{ maxWidth: "100%", height: 400 }}
          className="mx-2 top-0 left-0 flex flex-col justify-center w-screen"
        >
          <div className="-mt-32 mx-auto text-blue-800 opacity-80">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutTable;
