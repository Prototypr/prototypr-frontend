import Link from 'next/link'

const ALL_SLUGS_GROUPS = [
    {
      title: "UI",
      subItems: [
        {
          key: "accessibility",
          name: "Accessibility",
          tags: ["accessibility", "contrast"],
        },
        {
          key: "color",
          name: "Color",
          tags: ["color", "colour", "colors"],
        },
        {
          key: "css",
          name: "CSS",
          tags: ["css"],
        },
        {
          key: "icons",
          name: "Icons",
          tags: ["icons"],
        },
        {
          key: "illustration",
          name: "Illustration",
          tags: ["illustration", "illustrations"],
        },
      ],
    },
    {
      title: "UX",
      moreLink:{url:'/toolbox/ux-tools/page/1', text:'Browse all UX →'},
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
        },
        {
          key: "journey",
          name: "User Journey",
          tags: ["journey", "journey-map", "user-flow"],
        },
        {
          key: "research",
          name: "User Research",
          tags: ["exploration", "research", "user-research"],
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
        },
        {
          key: "figma",
          name: "Figma",
          tags: ["figma", "figma-plugin"],
        },
        {
          key: "marvel",
          name: "Marvel",
          tags: ["marvel", "marvel-app"],
        },
        {
          key: "sketch",
          name: "Sketch",
          tags: ["sketch", "sketch-app", "sketch-plugin"],
        },
      ],
    },
    {
      title: "Prototyping",
      moreLink:{url:'/prototyping/page/1', text:'Browse all Prototyping →'},
      subItems: [
        {
          key: "design",
          name: "Design",
          tags: ["prototyping", "design-tool", "prototyping-tool"],
        },
        {
          key: "handoff",
          name: "Handoff",
          tags: ["handoff", "design-to-code"],
        },
        {
          key: "interactions",
          name: "Interactions",
          tags: ["microinteractions", "interactions", "animation"],
        },
      ],
    },
    {
      title: "Mixed Reality",
      moreLink:{url:'/toolbox/augmented-reality-tools/page/1', text:'Browse all VR/AR →'},
      subItems: [
        {
          key: "ar",
          name: "Augmented Reality",
          tags: ["ar", "augmented-reality"],
        },
        {
          key: "vr",
          name: "Virtual Reality",
          tags: ["vr", "virtual-reality"],
        },
      ],
    },
    {
      title: "Conversational Design",
      moreLink:{url:'/toolbox/conversational-design-tools/page/1', text:'Browse all Conversational →'},
      subItems: [
        {
          key: "chatbots",
          name: "Chat Bots",
          tags: ["chat", "chat-bot"],
        },
      ],
    },
  ];

  export default ALL_SLUGS_GROUPS