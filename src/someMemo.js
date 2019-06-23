import React, { useState, useEffect, useMemo } from 'react';

export default function() {
  const [massiv, setMassiv] = useState(Array.from({length: 5}, () => 1));
  const [interval, setStateInterval] = useState(Array.from({length: 5}, () => 1));

  useEffect(() => {
    setStateInterval(setInterval(() => { setMassiv(
        (prevMassiv) => {
            console.log('prevMassiv - ', prevMassiv);
            return prevMassiv.length === 5 ? [...massiv, ...Array.from({length: 5}, () => 1)] : prevMassiv;
        }
    )}, 22000)
    );
  }, []);

  const masFromMemo = useMemo(
    () => {
      console.log('in masFromMemo');
      return massiv.map((el,idx) =><button key={idx} onClick={()=>{ console.log(idx); clearInterval(interval)}}>idx: {idx}</button>);
    },
    [massiv]
  );
  return masFromMemo;
}