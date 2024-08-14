import { UserCircle, Article, CircleWavyCheck } from "@/components/icons"

export const loggedInMenu = {
    show:true,
    items: [
      {
        link: user =>
          user?.profile?.approved
            ? `/people/${user?.profile?.slug}`
            : `/account/profile`,
        icon: <UserCircle size={26} className="opacity-80 mr-3" />,
        label: "Profile",
      },
      { separator: true },
      {
        link: "/dashboard/drafts",
        icon: <Article size={26} className="opacity-80 mr-3" />,
        label: "Posts",
      },
      {
        condition: user => user?.profile?.onboardComplete !== true,
        items: [
          { separator: true },
          {
            link: "/onboard?onboard=true",
            icon: <CircleWavyCheck size={26} className="opacity-80 mr-3" />,
            label: "Setup",
          },
        ],
      },
      { separator: true },
      {
        link: "/account",
        label: "Edit profile",
      },
    ],
    adminMenu: [
      { separator: true },
      {
        link: "/admin/drafts",
        label: "👩‍✈️ Admin",
      },
      {
        link: "https://api.prototypr.io/admin/content-manager/collectionType/api::post.post?page=1&pageSize=10&sort=date:DESC&plugins[i18n][locale]=en",
        label: "👾 Strapi",
      },
    ],
    businessMenu: [
      { separator: true },
      {
        link: "/dashboard/partner",
        label: "Business hub",
      },
    ],
  }