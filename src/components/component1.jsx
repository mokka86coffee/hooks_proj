// import React, { useState, useEffect, useCallback, useMemo } from 'react';
import React, { useContext } from 'react';
import { SomeTextContext } from '../App';

const Component1 = React.memo(function Component1(props){
  console.log('in Component1');
  const fromProvider = useContext(SomeTextContext);

  return (
    <div style={{ display: 'inline-block' }}>
      <p>Component1: { fromProvider.id }</p>
      <input { ...props } type='text'/>
    </div>
  )
});

export default Component1;