import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text} from "react-native-paper";
import FormScreen from "../screens/addForm";
import HomeScreen from '../screens/Home';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen name="Form"  component={FormScreen}/>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Admin" component={FormScreen} />

        </Tab.Navigator>
    );
};

export default BottomTabNavigator

