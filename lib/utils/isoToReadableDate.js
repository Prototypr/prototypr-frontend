const suffixes = {
    1: "st",
    2: "nd",
    3: "rd",
    21: "st",
    22: "nd",
    23: "rd",
    31: "st",
  };
  
  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    const suffix = suffixes[day % 10] || "th";
    return suffix;
  }
  
  export default function isoToReadableDate(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${month} ${year}`;
  }