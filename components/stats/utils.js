import axios from "axios";

const plausibleKey = process.env.NEXT_PUBLIC_PLAUSIBLE;

const baseURL = "https://analytics.prototypr.io/api/v1";

export const fetchPlausibleData = async (slug, metrics = ["pageviews"]) => {
  const metricsString = metrics.join(",");
  // visits,bounce_rate,visit_duration,pageviews
  const apiEndpoint = `${baseURL}/stats/aggregate`;

  const siteId = "4.prototypr.io";
  const todayDate = new Date().toISOString().slice(0, 10);

  // const plausibleRequest = `${apiEndpoint}?site_id=${siteId}&metrics=${metricsString}&filters=event:page==${slug}`
  // const plausibleRequest = `https://${apiEndpoint}/stats/aggregate?site_id=${siteId}&filters=event:page%3D%3D%2Fpost/${slug}&metrics=visits,bounce_rate,visit_duration,pageviews&period=custom&date=${todayDate}`
  const plausibleRequest = `${apiEndpoint}?site_id=${siteId}&filters=event:page%3D%3D%2Fpost/${slug}&metrics=${metricsString}&period=custom&date=2021-01-01,${todayDate}`

  let configUpload = {
    method: "get",
    url: plausibleRequest,
    headers: {
      Authorization: `Bearer ${plausibleKey}`,
    },
    data: {},
  };

  const response = await axios(configUpload).catch(function (error) {
    console.log(error);
  });

  return response.data.results;
};

// fetch time series data
export const fetchTimeSeriesData = async (slug, metrics = ["pageviews"]) => {
  const metricsString = metrics.join(",");
  const apiEndpoint = `${baseURL}/stats/timeseries`;
  const siteId = "4.prototypr.io";

  // https://analytics.prototypr.io/api/v1/stats/timeseries?site_id=4.prototypr.io&metrics=visits,bounce_rate,visit_duration,pageviews&period=30d&filters=event:page%3D%3D%2Fpost/are-ui-ux-tips-the-new-clickbait-for-designerse29ca8
  const plausibleRequest = `${apiEndpoint}?site_id=${siteId}&metrics=${metricsString}&period=30d&filters=event:page%3D%3D%2Fpost/${slug}`

  let configUpload = {
    method: "get",
    url: plausibleRequest,
    headers: {
      Authorization: `Bearer ${plausibleKey}`,
    },
  };

  const response = await axios(configUpload).catch(function (error) {
    console.log(error);
  });

  return response.data.results;
};

// graph styling options
export const options = {
  scales: {
    x: {
      grid: {
        color: "rgba(0,0,0,0.1)",
        borderColor: "#000",
        borderDash: [5],
      },
    },
    y: {
      grid: {
        color: "rgba(0,0,0,0)",
        borderColor: "#000",
      },
    },
  },

  tooltips: {
    backgroundColor: "#FFF",
    titleFontSize: 16,
    titleFontColor: "#0066ff",
    bodyFontColor: "#000",
    bodyFontSize: 14,
    displayColors: false,
    padding: 10,
  },
  responsive: true,
  stacked: false,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "",
    },
  },
};