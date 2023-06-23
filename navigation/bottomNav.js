import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import FormScreen from '../screens/addForm';
import GalleryScreen from '../screens/Gallery';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false, // Hide the header for all screens in the bottom tab navigator
                tabBarIcon: ({color, size}) => {
                    let iconName;

                    if (route.name === 'Form') {
                        iconName = 'document-outline';
                    } else if (route.name === 'Gallery') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Admin') {
                        iconName = 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarStyle: {
                    display: 'flex', // Add the desired styles to the tab bar
                },
                tabBarShowLabel: false, // Hide the label of the tabs
            })}
        >
            <Tab.Screen name="Form" component={FormScreen}/>
            <Tab.Screen name="Gallery" component={GalleryScreen}/>
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
