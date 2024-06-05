export const addSupportScript = () => {

    if(window.$chatwoot) return;

  if (document && !document.getElementById("support-script")) {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("id", "support-script");
    s.setAttribute("async", "true");

    s.textContent =`
    (function (d, t) {
        var BASE_URL = "https://chatwoot-3n2v4-u6349.vm.elestio.app";
        var g = d.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
          window.chatwootSDK.run({
            websiteToken: "oh8AKRPnciiHjLwsjNZ1hTW7",
            baseUrl: BASE_URL,
          });
        };
      })(document, "script");
    `
    document.head.appendChild(s);
  }
};
