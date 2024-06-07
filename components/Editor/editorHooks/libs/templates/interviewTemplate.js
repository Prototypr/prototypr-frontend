export const getInterViewTemplate = ({ productName }) => {
  return {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: `${productName}: Creator Story`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "Welcome to your creator story! This is an interview template that will help share your story and show the human behind the product. The purpose is to showcase work you're excited about, whilst also helping and inspiring readers with their own projects. ",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "italic",
                      },
                    ],
                    text: "Add your responses under the headings marked with Q.",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "italic",
                      },
                    ],
                    text: "Feel free to add your own questions to steer the article ",
                  },
                ],
              },
              {
                type: "paragraph",
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "italic",
                      },
                    ],
                    text: "Long answers are encouraged, we will scope it down where needed when editing the submission",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "italic",
                      },
                    ],
                    text: "Add pictures and videos (this editor is still WIP, so add links to videos if they don't upload)",
                  },
                ],
              },
              {
                type: "paragraph",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "Once completed, submit it for review, and we'll work with you to turn it into a piece ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://prototypr.io/post/framer-sites-building-landing-pages-that-tell-stories-with-olvy",
                  target: "_blank",
                  rel: null,
                  class: null,
                },
              },
              {
                type: "italic",
              },
            ],
            text: "like this one",
          },
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: " or ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://prototypr.io/post/from-design-system-to-nft-design-system-creating-tinyfaces",
                  target: "_blank",
                  rel: null,
                  class: null,
                },
              },
              {
                type: "italic",
              },
            ],
            text: "this one",
          },
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: ". ",
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "Introduction",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "What's your story? This section is to share your background and what inspires you.",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Q. Tell us about yourself, current work and side projects",
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: `What inspired you to work on ${productName}?`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "How you decided what to work on, and what inspires and drives you to do it. It will also help other people decide on what they should work on.",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: `Q. What is ${productName}, and how did you discover the problem you’re trying to solve?`,
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Q. Who is it for, and how are you discovering your first users?",
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "Sharing the process",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "This section gives a look into your craft, and also teaches readers how they can approach certain tasks you undertook.",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: `Q. What are the piece(s) of ${productName} you're most proud of, and why?`,
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Q. Share some of the process behind creating a piece you're proud of? What tools did you use along the way, and for what purpose?",
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: `What's Next for ${productName}?`,
          },
        ],
      },

      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "Share your plans for the future of your project, and what you're excited about.",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Q. Where do you want to take the project next? ",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Q. Do you have any predictions about the future of your project industry?",
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "Once you're done, submit the article for review. ",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "An editor (Graeme) will work on it and get back to you with edits and any additional questions.",
          },
        ],
      },
      {
        type: "paragraph",
      },
    ],
  };
};
