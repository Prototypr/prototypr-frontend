import BigCard from "../components/v4/card/BigCard/BigCard";

export default {
  title: "Components/Card/Big Card",
  component: BigCard,
};

const Template = (args) => <BigCard {...args} />;
export const Large = Template.bind({});
Large.storyName = "BigCard";

Large.args = {
  author: { firstName: "Graeme", lastName: "Fulton" },
  link: "https://prototypr.io/post/microsoft-designer-ai-prompt-design-principles",
  title: "Microsoft Designer: AI Prompt Design Principles",
  image: "/static/images/storybook/bigcardimage.png",
  tags: [
    { attributes: { name: "Accessibility", slug: "accessibility" } },
    { attributes: { name: "AI", slug: "ai" } },
  ],
};
