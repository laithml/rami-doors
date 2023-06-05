import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import BottomTabNavigator from './navigation/bottomNav';

const App = () => {
    return (
        <NavigationContainer>

                <BottomTabNavigator />
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
