import { React, useState, useRef } from 'react';
import Questions from './Questions';
import questionsList from '../assets/questions.json';
import App from './App';
import Board from './Leaderboard';

function Home(props) {
  // initiatize state, the game hasnt started yet
  const [, setStarted] = useState(false);
  //keep track of the state of the game (started or not)
  const start = useRef(false);

  const [isDeleted, setDelete] = useState(false);
  const [showBoard, setBoard] = useState(false);

  function handleStart() {
    setStarted(true); //update the state
    //update start
    start.current = true;
  }

  function handleDeleteAcct() {
    alert('Are You Sure You Want To Delete Your Account?');
    localStorage.removeItem(props.data[0]);
    setDelete(true);
  }

  function handleBoard() {
    setBoard(true);
  }

  if (isDeleted) {
    return (
      <div>
        <App />
      </div>
    );
  }

  if (start.current) {
    return (
      <div>
        <Questions
          questionslist={questionsList}
          data={[props.data[0], props.data[1], props.data[2]]}
        />
      </div>
    );
  }

  if (showBoard) {
    return (
      <div>
        {/* <Board data={props.data[0]} /> */}
        <Board data={[props.data[0], props.data[1], props.data[2]]} />
      </div>
    );
  }
  return (
    <div>
      <h1> Guess That Celebrity </h1>
      <h2> Welcome {props.data[0]}!</h2>
      <h4> Your current high score is: {props.data[1]}</h4>
      <button type="submit" onClick={handleStart}>
        Play Quiz
      </button>
      <button type="deleteAcct" onClick={handleDeleteAcct}>
        Delete Account
      </button>
      <button type="board" onClick={handleBoard}>
        Leaderboard
      </button>
    </div>
  );
}

export default Home;
