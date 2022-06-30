/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import HomePage from './Home';

// image style
const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 90,
  },
});

// retrieve the props
// pros are in the params attribute of the route
function Questions({ route, navigation }) {
  //questionslist, player
  // retrieve the props
  let { questionslist, player, points, count, best, score } = route.params;

  //state variables
  let answer = useRef('');

  //local variables retrieving props
  const [counter, setCounter] = useState(count);
  const [foundBest, setFoundBest] = useState(0);
  // const [topScore, setTopScore] = useState(0);
  let localBest = points;
  let currentScore = score;
  const [overallBest, setOverallBest] = useState(0);
  console.log(localBest, currentScore, overallBest);

  // pick a question
  const question = questionslist[Math.floor(Math.random() * 10) % 10];

  // get the app's overall top score
  function computeOverallBest2(items) {
    console.log('Questions: got array of scores');
    var scores = [];
    for (var x = 0; x < items.length; x++) {
      const curr = parseInt(items[x][1]);
      if (!isNaN(curr)) {
        scores.push(curr);
      }
    }
    const topScore = Math.max.apply(null, scores);
    console.log('Questions: printing items');
    console.log(items);
    return topScore;
  }

  async function computeOverallBest() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log('Questions: passed the keys,items multiget');
      return items;
    } catch (e) {
      console.log('Questions: could not get items in computeOverallBest');
    }
  }

  async function updatePlayerBest(newVal) {
    try {
      const updated = await AsyncStorage.setItem(player, String(newVal));
      console.log(
        'Questions updatePlayerBest(): checking async storage',
        storedplayerbest
      );
      return updated;
    } catch (e) {
      console.log('Questions updatePlayerBest(): unable to set player best');
    }
  }

  function switchToHomePage(newVal) {
    updatePlayerBest(newVal).then(() => {
      console.log('Questions switchToHome(): reached promise');
      navigation.navigate('HomePage', {
        player: player,
        points: localBest,
      });
    });
  }

  // test correctness move to the next question
  function handleSubmit(e) {
    if (answer.current === question.correct) {
      alert('Correct Answer');
      currentScore = score + 1;
      localBest = Math.max(localBest, currentScore);
      setOverallBest(Math.max(overallBest, currentScore));
    } else {
      alert('Wrong Answer');
    }
    setCounter(counter + 1);

    //navigate to the next question
    if (counter >= 10) {
      console.log('game over');
      switchToHomePage(localBest);
      return 1;
    } else {
      navigation.push('Questions', {
        questionslist: questionslist,
        player: player,
        points: localBest,
        count: counter + 1,
        best: overallBest,
        score: currentScore,
      });
    }
  }

  // run on first load and every rerender
  useEffect(() => {
    console.log('Questions: running useEffect');
    if (foundBest == 0) {
      computeOverallBest().then((items) => {
        var topScore = computeOverallBest2(items);
        setOverallBest(topScore);
      });
      console.log('Questions: finished useEffect');
      setFoundBest(1);
    }
  }, []);

  return (
    <View>
      <View>
        <Text>Question {counter} of 10</Text>
      </View>

      <Image source={{ uri: question.img }} style={styles.img} />

      <Text>Your answer: </Text>
      <Button
        title={question.option1}
        onPress={(e) => {
          answer.current = question.option1;
          handleSubmit(e);
        }}
      />
      <Button
        title={question.option2}
        onPress={(e) => {
          answer.current = question.option2;
          handleSubmit(e);
        }}
      />
      <Button
        title={question.option3}
        onPress={(e) => {
          answer.current = question.option3;
          handleSubmit(e);
        }}
      />
      <Button
        title={question.option4}
        onPress={(e) => {
          answer.current = question.option4;
          handleSubmit(e);
        }}
      />
      <View>
        <Text>Your current score : {currentScore} /10</Text>
        <Text>Your best score : {localBest} /10</Text>
        <Text>Overall best score : {overallBest} /10</Text>
      </View>
    </View>
  );
}
export default Questions;
