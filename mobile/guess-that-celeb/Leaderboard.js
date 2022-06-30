/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import HomePage from './Home';
import App from './App';

function Board({ route, navigation }) {
  let { player, points } = route.params;
  // const [showBoard, setShowBoard] = useState(0);
  // const [playerBest, setPlayerBest] = React.useState(0);
  const [topScores, setTopScores] = React.useState([]);

  // async function checkUserBest() {
  //   try {
  //     const val = await AsyncStorage.getItem(player);
  //     setPlayerBest(val);
  //     return val;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function handleReturnHome(e) {
    console.log('Board: Pressed return to home button');
    navigation.navigate('HomePage', {
      player: player,
      points: points,
    });
  }

  function displayBoard(allPairs) {
    var topScores = [];
    console.log('Board: printing the current leaderboard');
    for (let x = 0; x < 10; x++) {
      if (typeof(allPairs[x]) !== 'undefined') {
        console.log(allPairs[x].score, allPairs[x].player);
        topScores.push([allPairs[x].score, allPairs[x].player]);
      }
    }
    setTopScores(topScores);
  }

  async function computeTopK() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log(items.toString());
      console.log('Board: got array of scores');
      var allPairs = [];
      for (var x = 0; x < items.length; x++) {
        if (items[x][0] !== 'undefined' && !isNaN(parseInt(items[x][1]))) {
          allPairs.push({
            score: parseInt(items[x][1]),
            player: keys[x],
          });
          console.log('Board: pair', items[x][1], keys[x]);
        }
      }
      allPairs.sort((a, b) => b.score - a.score);
      return allPairs;
    } catch (error) {
      console.log(error, 'Board: Error with retrieving all keys,items');
    }
  }

  // run on first load and every rerender
  useEffect(() => {
    computeTopK().then((allPairs) => displayBoard(allPairs));
  }, []);

  // // creating the row and cell components
  // function Row({ column }) {
  //   return (
  //     <View style={styles.rowStyle}>
  //       {column.map((data) => (
  //         <Cell data={data} />
  //       ))}
  //     </View>
  //   );
  // }
  // function Cell({ data }) {
  //   return (
  //     <View style={styles.cellStyle}>
  //       <Text>{data}</Text>
  //     </View>
  //   );
  // }
  // function Grid({ scores }) {
  //   const data = scores;
  //   return (
  //     <View style={styles.gridContainer}>
  //       {data.map((column) => (
  //         <Row column={column} />
  //       ))}
  //     </View>
  //   );
  // }

  return (
    <View>
      <View></View>
      <Text> Leaderboard of Top 10 Scores </Text>
      <FlatList
        data={topScores}
        renderItem={({ item }) => (
          <Text>
            Player: {item[1]}, Score: {item[0]}
          </Text>
        )}
      />
      <Button title="Return to Home" onPress={(e) => handleReturnHome(e)} />
      {/* <Grid scores={topScores}></Grid> */}
    </View>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    width: 220,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cellStyle: {
    flex: 1,
    margin: 10,
  },
});
export default Board;
