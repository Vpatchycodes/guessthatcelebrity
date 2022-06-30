/* eslint-disable */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import react navigation container
import { NavigationContainer } from '@react-navigation/native';
// import navigation stack constructor
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Questions from './Questions';
import HomePage from './Home';
import Board from './Leaderboard';

// rename APP to HomeScreen
function HomeScreen({ navigation }) {
  const [player, setPlayer] = React.useState('<>');
  // const [isLoggedIn, setIsLoggedIn] = React.useState(0);
  const [playerBest, setPlayerBest] = React.useState(0);

  async function addPlayer(player) {
    try {
      const storedplayerbest = await AsyncStorage.setItem(
        player,
        String(playerBest)
      );
      //console.log('App: checking async storage', storedplayerbest);
      return storedplayerbest;
    } catch (e) {
      console.log('App: unable to create new player');
    }
  }

  async function checkOrCreateUser(player) {
    try {
      const val = await AsyncStorage.getItem(player);
      console.log('App: checking async storage', val);
      //setPlayerBest(val);
      return val;
    } catch (e) {
      return await addPlayer(player);
    }
  }

  // start button event handler
  // navigate to the questions screen
  function handleStart(e) {
    if (!player.match('^[a-zA-Z0-9]*$')) {
      alert('Input is not alphanumeric');
    } else {
      console.log('App: logging in user');
      checkOrCreateUser(player).then((val) => {
        console.log('App: reached promise of checkOrCreate()');
        if (val != null) {
          setPlayerBest(parseInt(val));
          console.log('App: val != null');
          navigation.navigate('HomePage', {
            player: player,
            points: val,
          });
        }
        if (val == null) {
          console.log('App: val == null');
          addPlayer(player).then(() => {
            console.log(
              'App: reached inner promise, about to navigate to HomePage'
            );
            navigation.navigate('HomePage', {
              player: player,
              points: playerBest,
            });
          });
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setPlayer} value={player} />
      <Button title="Start" onPress={(e) => handleStart(e)} />
      <StatusBar style="auto" />
    </View>
  );
}

// the app component will configure the screens and the routes

// create a navigation stack
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={HomeScreen} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Board" component={Board} />
      </Stack.Navigator>
    </NavigationContainer>
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
