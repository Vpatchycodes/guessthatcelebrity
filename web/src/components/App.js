import { React, useState, useRef } from 'react';
import Home from './Home';
import '../assets/App.css';
import './style.css';

function App() {
  const [, setLogin] = useState(false);
  const login = useRef(false);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [bestScore, setBestScore] = useState(0);
  const [overallBest, setOverallBest] = useState(0);

  function onAddressChanged(e) {
    setInput(e.currentTarget.value);
  }

  // get the app's overall top score
  function handleBestScore() {
    var topScore = 0;
    for (var key in localStorage) {
      if (key.valueOf() !== 'length' && !isNaN(localStorage[key])) {
        topScore = Math.max(topScore, parseInt(localStorage[key]));
      }
    }
    setOverallBest(topScore);
  }

  function handleLogin(e) {
    //search for given username
    let entry = localStorage.getItem(input);

    //if does not exist, create new account
    if (entry == null) {
      localStorage.setItem(input, bestScore);
      console.log('new');
    } else {
      setBestScore(entry);
    }

    setUsername(input);
    //complete login
    setLogin(true);
    login.current = true;
    handleBestScore();
  }

  if (!login.current) {
    return (
      <div>
        <h1> Guess That Celebrity </h1>
        <h2>
          {' '}
          Do you REALLY think you know celebrities that well? Play the quiz to
          find out!{' '}
        </h2>
        <form onSubmit={handleLogin}>
          <label>
            Username
            <input
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
              onChange={onAddressChanged}
              required
              pattern="[a-zA-Z0-9]+"
            ></input>
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Home data={[username, bestScore, overallBest]} />
    </div>
  );
}

export default App;
