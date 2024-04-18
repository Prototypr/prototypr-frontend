export const addTwitterScript = () => {
  const s = document.createElement("script");
  s.setAttribute("src", "https://platform.twitter.com/widgets.js");
  s.setAttribute("id", "twitter-widget");
  s.setAttribute("async", "true");

  if (!document.getElementById("twitter-widget")) {
    document.head.appendChild(s);
  }
};
