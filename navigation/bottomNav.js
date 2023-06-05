import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FormScreen from '../screens/addForm';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Form') {
                        iconName = 'document-outline';
                    } else if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Admin') {
                        iconName = 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Form" component={FormScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Admin" component={FormScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
