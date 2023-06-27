//this screen fetch all live tickets from db and display them in a list

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {db} from '../config/firebase';
import {doc, getDoc, deleteDoc, updateDoc, collection} from 'firebase/firestore';


const TicketsScreen = ({route, navigation}) => {

}

export default TicketsScreen;