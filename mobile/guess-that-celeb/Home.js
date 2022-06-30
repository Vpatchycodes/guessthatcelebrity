/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, View, Text, Button, StatusBar } from 'react-native';

// import pages
import Questions from './Questions';
import App from './App';
import Board from './Leaderboard';

//import questions
import questionsList from './assets/questions.json';

// Homepage for app
function HomePage({ route, navigation }) {
  // load params
  let { player, points } = route.params;

  // start button event handler
  // navigate to the questions screen
  function handleStart(e) {
    navigation.navigate('Questions', {
      questionslist: questionsList,
      player: player,
      points: points,
      count: 1,
      best: 0,
      score: 0,
    });
  }

  async function deletePlayer() {
    try {
      await AsyncStorage.removeItem(player); //key - player, value - highest personal score
      console.log('Home: deleting player');
      return true;
    } catch (e) {
      // deleting error
      console.log('failed to delete user');
      return false;
    }
  }

  function handleDelete(e) {
    alert('Are you sure you want to delete your account?');
    deletePlayer().then(() => {
      navigation.navigate('App');
    });
  }

  function handleBoard(e) {
    navigation.navigate('Board', {
      player: player,
      points: points,
    });
  }

  function handleLogout(e) {
    alert('Are you sure you want to log out of your account?');
    navigation.navigate('App');
  }

  return (
    <View style={styles.container}>
      <View>
        <Text> Guess That Celebrity </Text>
        <Text> Welcome {player} </Text>
        <Text> Your current high score is {points} </Text>
      </View>
      <Button title="Play Quiz" onPress={(e) => handleStart(e)} />
      <Button title="Delete Account" onPress={(e) => handleDelete(e)} />
      <Button title="View Leaderboard" onPress={(e) => handleBoard(e)} />
      <Button title="Log Out" onPress={(e) => handleLogout(e)} />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;
