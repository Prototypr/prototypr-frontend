export const addTwitterScript = () => {

  if (!document.getElementById("twitter-widget")) {

    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "twitter-widget");
    s.setAttribute("async", "true");

    document.head.appendChild(s);
  }
};
