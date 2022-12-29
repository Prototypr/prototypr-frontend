import Button from "../components/Primitives/Button";

export default {
  title: "Components/ Button",
  component: Button,
  argTypes: {
    onClick: { action: "OnClick" },
    variant: {
      description: "Based on Radix variants in the button component.",
      options: ["confirm", "red", "confirmRounded"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <div className="font-inter">
    <Button variant="" {...args}>
      {args.children}
    </Button>
  </div>
);

export const Confirm = Template.bind({});
Confirm.args = {
  variant: "confirm",
  children: "Confirm",
};
export const Warning = Template.bind({});
Warning.args = {
  variant: "red",
  label: "Warning",
  children: "Warning",
};
export const Rounded = Template.bind({});
Rounded.args = {
  variant: "confirmRounded",
  children: "Confirm",
};
