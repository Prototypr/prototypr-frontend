export default function Credentials(options) {
    return {
        id: "credentials",
        name: "Credentials",
        type: "oauth",
        credentials: {},
        authorization: { params: { scope: "openid email profile" } },

        idToken: true,
        // userinfo: {
        //     url: "https://example.com/oauth/userinfo",
        //     params: { some: "param" }
        //   },
        authorize: function () { return null; },
        options: options,
    };
}