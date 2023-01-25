import React from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import { styled } from '@stitches/react';
import { blue, mauve, blackA } from '@radix-ui/colors';
import { FontItalicIcon } from '@radix-ui/react-icons';

const ToggleComponent = ({children, onPressChanged, defaultChecked}) => (
  <ToggleRoot defaultPressed={defaultChecked} onPressedChange={(e)=>onPressChanged(e)} aria-label="Toggle italic">
    {children}
  </ToggleRoot>
);

const ToggleRoot = styled(Toggle.Root, {
  all: 'unset',
  backgroundColor: 'white',
  color: mauve.mauve11,
  height: 44,
  // width: '100%',
  borderRadius: 4,
  padding:8,
  borderRadius:12,
  border:`1px solid transparent`,
//   display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // boxShadow: `0 1px 3px ${blackA.blackA7}`,
  border:`1px solid ${blackA.blackA7}`,
  '&:hover': { backgroundColor: blue.blue1 },
  '&[data-state=on]': { backgroundColor: blue.blue6,border:`1px solid ${blue.blue8}`, color: blue.blue12 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

export default ToggleComponent;