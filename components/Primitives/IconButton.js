import { blue, mauve, blackA, slate } from '@radix-ui/colors';
import { styled } from '@stitches/react';

const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: 4,
    height: 28,
    width: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: slate.slate12,
    backgroundColor: 'white',
    margin:'0 auto',
    marginBottom:5,
    //boxShadow: `0 1px 3px ${blackA.blackA7}`,
  border:`1px solid ${blackA.blackA5}`,
    '&:hover': { backgroundColor: blue.blue3 },
     '&:focus': { boxShadow: `0 0 0 2px ${blue.blue9}` },
     variants:{
      variant:{
        sidemenu:{
          '&[data-state="open"]': {
            color: '#fff',
            background: slate.slate12,
          },
        }
      }
     }
  });

  export default IconButton