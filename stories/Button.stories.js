import Button from "../components/Primitives/Button";

export default {
  title: "Button",
  component: Button,
  argTypes:{
    onClick:{action:'OnClick'},
    variant: {
      options: ['confirm', 'red', 'confirmRounded'],
      control: { type: 'select' },
    },
  }
}

const Template = args => (
  <div className="font-inter">  
  <Button variant="" {...args}>{args.label}</Button>
  </div> 
)


export const Confirm = Template.bind({})
Confirm.args = {
  variant:'confirm',
  label:'Confirm'
}
export const Warning = Template.bind({})
Warning.args = {
  variant:'red',
  label:'Warning'
}
export const Rounded = Template.bind({})
Rounded.args = {
  variant:'confirmRounded',
  label:'Confirm Rounded'
}