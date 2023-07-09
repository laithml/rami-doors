import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar } from 'react-native';

import BottomTabNavigator from './navigation/bottomNav';
import Rooms_add from "./screens/Rooms_add";
import RoomInfo from "./screens/RoomInfo";
import DoorChoose from "./screens/doorChoose";

const Stack = createStackNavigator();

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5EFE7" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Rooms" component={Rooms_add} />
                    <Stack.Screen name="RoomInfo" component={RoomInfo} />
                    <Stack.Screen name="DoorChoose" component={DoorChoose} />
                    <Stack.Screen name="Home" options={{ animationEnabled: false }}>
                        {({ navigation }) => (
                            <BottomTabNavigator navigation={navigation} />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
