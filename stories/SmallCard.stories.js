import SmallCard from "../components/v4/card/SmallCard/SmallCard";

export default {
  title: "Components/Card/Small Card",
  component: SmallCard,
  argTypes: {
    image: {
      description: "Image src for card thumbnail.",
    },
    tags: {
      description: "Array of objects, with name and link",
    },
    link: {
      description: "Url for the image and title",
    },
    title: {
      description: "The title text",
    },
  },
};

const Template = (args) => <SmallCard {...args} />;
export const Small = Template.bind({});
Small.storyName = "SmallCard";
Small.args = {
  author: { firstName: "Graeme", lastName: "Fulton" },
  link: "https://prototypr.io/post/microsoft-designer-ai-prompt-design-principles",
  title: "Microsoft Designer: AI Prompt Design Principles",
  image: "/static/images/storybook/smallcard.png",
  tags: [
    { attributes: { name: "Accessibility", slug: "accessibility" } },
    { attributes: { name: "AI", slug: "ai" } },
  ],
};
