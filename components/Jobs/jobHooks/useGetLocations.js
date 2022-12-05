import { useEffect, useState } from "react";
import { getAllLocations } from "@/lib/api";

const useGetLocations = (user) => {
  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (user) {
    //   setLoading(true);

    // }
    refetch();
  }, []);

  const refetch = async () => {
      console.log("loading locations");
      //load data
      await getLocations();
      setLoading(false);
  };

  const getLocations = async () => {
    setLoading(true);

    try {
      const allLocations = await getAllLocations();
        
      let locs = []
      for(var x = 0;x<allLocations?.data?.length;x++){
        let loc = {name:allLocations?.data[x]?.attributes?.name, value:allLocations?.data[x]?.id}
        locs.push(loc)
      }
      setLocations(locs)

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    locations
  };
};

export default useGetLocations;
