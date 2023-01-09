import Link from 'next/link'

const ALL_SLUGS_GROUPS = [
    {
      title: "All",
      moreLink:{url:'/toolbox/page/1'},
    },
    {
      title: "UI",
      moreLink:{url:'/toolbox/ui-tools/page/1'},
      subItems: [
        {
          key: "accessibility",
          name: "Accessibility",
          tags: ["accessibility", "contrast"],
          title:"Accessibility Tools"
        },
        {
          key: "color",
          name: "Color",
          tags: ["color", "colour", "colors"],
          title:"Color Tools"
        },
        {
          key: "css",
          name: "CSS",
          tags: ["css"],
          title:"CSS Tools"
        },
        {
          key: "icons",
          name: "Icons",
          tags: ["icons"],
          title:"Icon Packs"
        },
        {
          key: "illustration",
          name: "Illustration",
          tags: ["illustration", "illustrations"],
          title:"Illustration Kits"
        },
      ],
    },
    {
      title: "UX",
      moreLink:{url:'/toolbox/ux-tools/page/1', text:'All UX →'},
      subItems: [
        {
          key: "analysis",
          name: "User Analysis",
          tags: [
            "testing",
            "analytics",
            "user-analytics",
            "interview",
            "persona",
          ],
          title:"User Analysis Tools"
        },
        {
          key: "journey",
          name: "User Journey",
          tags: ["journey", "journey-map", "user-flow"],
          title:"User Journey Tools"
        },
        {
          key: "research",
          name: "User Research",
          tags: ["exploration", "research", "user-research"],
          title:"User Research Tools"
        },
      ],
    },
    {
      title: "Plugins",
      subItems: [
        {
          key: "xd",
          name: "Adobe XD",
          tags: ["xd", "adobe-xd", "xd-plugin"],
          title:"Adobe XD Plugins"
        },
        {
          key: "figma",
          name: "Figma",
          tags: ["figma", "figma-plugin"],
          title:"Figma Plugins"
        },
        {
          key: "marvel",
          name: "Marvel",
          tags: ["marvel", "marvel-app"],
          title:"Marvel Plugins"
        },
        {
          key: "sketch",
          name: "Sketch",
          tags: ["sketch", "sketch-app", "sketch-plugin"],
          title:"Sketch Plugins"
        },
      ],
      moreLink:{url:'/toolbox/plugins/page/1'},
    },
    {
      title: "Prototyping",
      moreLink:{url:'/prototyping/page/1', text:'All Prototyping →'},
      subItems: [
        {
          key: "design",
          name: "Design",
          tags: ["prototyping", "design-tool", "prototyping-tool"],
          title:"Design Tools"
        },
        {
          key: "handoff",
          name: "Handoff",
          tags: ["handoff", "design-to-code"],
          title:"Design Handoff Tools"
        },
        {
          key: "interactions",
          name: "Interactions",
          tags: ["microinteractions", "interactions", "animation"],
          title:"Interaction Design Tools"
        },
      ],
    },
    {
      title: "Mixed Reality",
      moreLink:{url:'/toolbox/augmented-reality-tools/page/1', text:'All VR/AR →'},
      subItems: [
        {
          key: "ar",
          name: "Augmented Reality",
          tags: ["ar", "augmented-reality"],
          title:"Mixed Reality Tools"
        },
        {
          key: "vr",
          name: "Virtual Reality",
          tags: ["vr", "virtual-reality"],
          title:"Virtual Reality Tools"
        },
      ],
    },
    {
      title: "Chat",
      moreLink:{url:'/toolbox/conversational-design-tools/page/1', text:'All Chat Tools →'},
      subItems: [
        {
          key: "chatbots",
          name: "Chat Bots",
          tags: ["chat", "chat-bot"],
          title:"Chat Design Tools"
        },
      ],
    },
  ];

  export default ALL_SLUGS_GROUPS