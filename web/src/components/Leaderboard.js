import { React, useState } from 'react';
import Home from './Home';

function Board(props) {
  const [showBoard, setBoard] = useState(true);

  function handleBoard() {
    setBoard(false);
  }

  var allPairs = [];
  var topScores = [];
  for (var key in localStorage) {
    if (key.valueOf() !== 'length' && !isNaN(localStorage[key])) {
      allPairs.push({
        score: parseInt(localStorage[key]),
        player: key,
      });
    }
  }
  allPairs.sort((a, b) => b.score - a.score);
  console.log('printing the current leaderboard');
  for (let x = 0; x < 10; x++) {
    console.log(allPairs[x].score, allPairs[x].player);
    topScores.push(allPairs[x]);
  }

  if (!showBoard) {
    return (
      <div>
        <Home data={[props.data[0], props.data[1], props.data[2]]}></Home>
      </div>
    );
  }
  return (
    <div>
      <h4>Leaderboard of Top 10 Players</h4>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((pair) => {
            return (
              <tr key={pair.player}>
                <td>{pair.score}</td>
                <td>{pair.player}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="returnHome" onClick={handleBoard}>
        Return to Home
      </button>
    </div>
  );
}
export default Board;
