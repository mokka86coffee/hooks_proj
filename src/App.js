import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import masFromMemo from './someMemo';

import _ from 'lodash';
import Component1 from './components/component1';
import Component2 from './components/component2';
import Component3 from './components/component3';

export const SomeTextContext = createContext('someText');

function App(props) {

  const [id, setId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  console.log('in render - ', id);
  
  const todos20 = useMemo(
    () => {
      console.log('in todos20');
        const bufTodos = [...todos];
      const style = { padding: '10px', background: 'skyblue', display: 'inline-block' }
      bufTodos.length = bufTodos.length > 5 ? 5 : bufTodos.length;
      return bufTodos.map( (todo, idx) => <span style={style} key={idx}>{ todo.title || todo }</span>);
    }, [todos]
  );

  const memoizeOnChange = useCallback(
    (e)=>{ setId(e.target.value) },
    []
  );

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then(data => {
        if (!_.isEqual(data, todos)) { workWithFetched(data); };
      })
      .catch(err => workWithFetched(err));
  }, [id]);
  
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      { todos20 }
      <br />
      <button disabled={btnDisabled} onClick={handleClick}>{btnDisabled ? 'DISABLED' : 'BUTTON' }</button>
      <br />
      <SomeTextContext.Provider value={{id, setId}}>
        <Component1 />
        <Component2 />
        <Component3 />
      </SomeTextContext.Provider>
      {masFromMemo()}
    </div>
  );

  function handleClick() {
    setId( Math.ceil(Math.random() * 10) );
    // setBtnDisabled(true);
  }

  async function workWithFetched(fetched){
    setTodos(fetched);
    setBtnDisabled(false);
  }
}

export default App;
