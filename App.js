import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryScreen from './screens/Gallery';
import BottomTabNavigator from './navigation/bottomNav';
import Rooms_add from "./screens/Rooms_add";
import RoomInfo from "./screens/RoomInfo";

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home" // Set the initial route to "Home" instead of "Main"
            >
                <Stack.Screen name="Rooms" component={Rooms_add} />
                <Stack.Screen name="RoomInfo" component={RoomInfo} />
                <Stack.Screen name="Home" options={{ animationEnabled: false }}>
                    {/* Render the BottomTabNavigator only when on the "Main" screen */}
                    {({ navigation }) => (
                        <BottomTabNavigator navigation={navigation} />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
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
