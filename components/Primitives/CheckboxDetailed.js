import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from '@stitches/react';
import { blue, blackA } from '@radix-ui/colors';
import { CheckIcon } from '@radix-ui/react-icons';

const CheckboxDetailedComponent = ({onCheckChange,defaultChecked, option}) => (
  <form>
    <Flex css={{ alignItems: 'center' }}>
      <CheckboxRoot className='min-w-[25px]' onCheckedChange={(val)=>onCheckChange(option, val)} defaultChecked={defaultChecked} id={option.slug}>
        <CheckboxIndicator >
          <CheckIcon />
        </CheckboxIndicator>
      </CheckboxRoot>
        <Label htmlFor={option.slug}>
      <div className="flex pl-6 text-left flex-col">
        <div className='text-gray-800 mb-1 font-semibold'>

          {option.name}
        </div>
          <div className='text-sm text-gray-600 max-w-xs'>
          {option.description}
        </div>
      </div>
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
  border:`1px solid ${blackA.blackA9}`,
  // boxShadow: `0 1px 3px ${blackA.blackA7}`,
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

export default CheckboxDetailedComponent;