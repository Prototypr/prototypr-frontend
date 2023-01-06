import * as NextImage from "next/image";

import '../styles/globaltailwind.css'
import '!style-loader!css-loader!sass-loader!../styles/index.scss'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
   options: {
    storySort: {
      order: ['Components',['Card', 'Button', 'Avatar'],'Layout'],
    },
  },
}
// .storybook/preview.js

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});