import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from '@stitches/react';
import { blue, blackA } from '@radix-ui/colors';
import { CheckIcon } from '@radix-ui/react-icons';

const CheckboxComponent = ({defaultChecked, option, onCheckChange}) => (
  <form>
    <Flex css={{ alignItems: 'center' }}>
      <CheckboxRoot onCheckedChange={(val)=>onCheckChange(option, val)} defaultChecked={defaultChecked} id={option.slug}>
        <CheckboxIndicator>
          <CheckIcon />
        </CheckboxIndicator>
      </CheckboxRoot>
      <Label css={{ paddingLeft: 15 }} className='text-gray-800' htmlFor={option.slug}>
        {option.name}
      </Label>
    </Flex>
  </form>
);

const CheckboxRoot = styled(Checkbox.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border:`1px solid ${blackA.blackA6}`,
  boxShadow: `0 1px 3px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: blue.blue3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: blue.blue11,
});

const Label = styled('label', {
//   color: '',
  fontSize: 15,
  lineHeight: 1,
});

const Flex = styled('div', { display: 'flex' });

export default CheckboxComponent;