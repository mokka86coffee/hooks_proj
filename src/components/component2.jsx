import React, { useContext, useState } from 'react';
import { SomeTextContext } from '../App';
const Component2 = React.memo(function Component2(props){
  console.log('in Component2');
  const [value, setValue] = useState('');
  // const fromProvider = useContext(SomeTextContext);
  return (
    <div style={{ display: 'inline-block' }}>
      <p>Component2</p>
      <input onChange={e => setValue(e.target.value)} type='text' value={value} />
    </div>
  );
});

export default Component2;