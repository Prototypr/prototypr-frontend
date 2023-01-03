import AvatarLine from "../components/v4/avatar/AvatarLine";

export default {
  title: "Components/Avatar/AvatarLine",
  component: AvatarLine,
  argTypes: {
    size: {
      description: "Size of AvatarLine and text",
      options: ["sm", "lg"],
      control: { type: "options" },
    },
  },
};

const Template = (args) => <AvatarLine {...args} />;

export const SmallAvatarLine = Template.bind({});
SmallAvatarLine.args = {
  size: "sm",
  author: { firstName: "Graeme", lastName: "Fulton" },
};
