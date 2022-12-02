import { useEffect, useState } from "react";
import { getAllSkills } from "@/lib/api";

const useGetSkills = (user) => {
  const [skills, setSkills] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (user) {
    //   setLoading(true);

    // }
    refetch();
  }, []);

  const refetch = async () => {
      console.log("loading skills");
      //load data
      await getLocations();
      setLoading(false);
  };

  const getLocations = async () => {
    setLoading(true);

    try {
      const allSkills = await getAllSkills();        
      let skls = []
      for(var x = 0;x<allSkills?.data?.length;x++){
        let skl = {name:allSkills?.data[x]?.attributes?.name, value:allSkills?.data[x]?.id}
        skls.push(skl)
      }
      setSkills(skls)

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    skills
  };
};

export default useGetSkills;
