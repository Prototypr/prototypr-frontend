import Avatar from "../components/v4/avatar/Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      description: "Size of avatar and text",
      options: ["sm", "lg"],
      control: { type: "options" },
    },
  },
};

const Template = (args) => <Avatar {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  author: { firstName: "Graeme", lastName: "Fulton" },
};

export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
  size: "sm",
  author: { firstName: "Graeme", lastName: "Fulton" },
};
