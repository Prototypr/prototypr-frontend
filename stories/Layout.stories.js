import LargePostGrid from "../components/v4/layout/LargePostGrid";
import { largePost, smallPosts } from "../lib/mockData.js";
export default {
  title: "Layout",
  component: LargePostGrid,
};

const Template = (args) => <LargePostGrid {...args} />;

export const LargeGrid = Template.bind({});
LargeGrid.args = {
  largePost,
  smallPosts,
};
