import { React, useState } from 'react';
import Board from './Leaderboard';

function Questions({ questionslist, data }) {
  const [counter, setCounter] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelect] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [localBest, setBest] = useState(data[1]);
  const overallBest = useState(data[2]);

  // pick a question
  const [question, setQuestion] = useState(
    questionslist[Math.floor(Math.random() * 10) % 10]
  );

  // get the app's overall top score
  function computeOverallBest() {
    var topScore = 0;
    for (var key in localStorage) {
      if (key.valueOf() !== 'length' && !isNaN(localStorage[key])) {
        topScore = Math.max(topScore, parseInt(localStorage[key]));
      }
    }
  }
  computeOverallBest();

  // submit button
  function handleSubmit(e) {
    e.preventDefault();
    setCounter(counter + 1);

    //display correct or not
    if (selected === question.correct) {
      setCorrect(correct + 1);
      let best = Math.max(correct + 1, data[1]); //correct doesn't update until after render
      setBest(best);
      alert('Correct Answer');
    } else {
      alert('Wrong Answer');
    }

    //move to next question
    if (counter >= 10) {
      setGameOver(true);
      //TODO fix update to bestScore for case where last question made localBest better than bestScore (since only updates after render)
      if (data[1] < localBest) {
        localStorage.setItem(data[0], localBest);
      }
      alert('Game Over');
      console.log(localStorage.getItem(data[0])); //should equal new best score
    } else {
      setQuestion(questionslist[Math.floor(Math.random() * 10) % 10]);
      setSelect('');
    }
  }

  if (gameOver) {
    return (
      <div>
        <Board data={[data[0], data[1]]} />
      </div>
    );
  }

  return (
    <div>
      <h6> Question {counter} of 10</h6>
      <img src={question.img} alt="hello" width="100" height="100" />
      <form onSubmit={handleSubmit}>
        <p>Your answer</p>
        <div>
          <label>
            {question.option1}
            <input
              type="radio"
              id="ans1"
              name="ans"
              value={question.option1}
              checked={selected === question.option1}
              onChange={(e) => setSelect(e.currentTarget.value)}
            />
          </label>

          <label>
            {question.option2}
            <input
              type="radio"
              id="ans2"
              name="ans"
              value={question.option2}
              checked={selected === question.option2}
              onChange={(e) => setSelect(e.currentTarget.value)}
            />
          </label>
          <label>
            {question.option3}
            <input
              type="radio"
              id="ans3"
              name="ans"
              value={question.option3}
              checked={selected === question.option3}
              onChange={(e) => setSelect(e.currentTarget.value)}
            />
          </label>
          <label>
            {question.option4}
            <input
              type="radio"
              id="ans4"
              name="ans"
              value={question.option4}
              checked={selected === question.option4}
              onChange={(e) => setSelect(e.currentTarget.value)}
            />
          </label>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <h4> Your Current Score: {correct} </h4>
        <h4> Your Best Score: {localBest} </h4>
        <h4> Overall Best Score: {overallBest} </h4>
      </form>
    </div>
  );
}
export default Questions;
