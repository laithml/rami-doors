import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../config/firebase';
import {doc, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';

const RoomsAdd = ({ route, navigation }) => {
    const [rooms, setRooms] = useState([]);

    const fetchRoomsFromDatabase = async () => {
        const clientsRef = doc(db, 'clients', route.params?.clientID);
        const docSnap = await getDoc(clientsRef);
        if (docSnap.exists()) {
            return docSnap.data().rooms;
        }
    };

    const refreshRooms = async () => {
        try {
            const roomsData = await fetchRoomsFromDatabase();
            setRooms(roomsData);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshRooms();
        });

        return unsubscribe;
    }, [navigation]);

    console.log('rooms', rooms);

    const handleDeleteRoom = async (roomID) => {
        try {
            const clientsRef = doc(db, 'clients', route.params?.clientID);
            //delete room from client room array
            await updateDoc(clientsRef, {
                rooms: rooms.filter((room) => room.roomID !== roomID),
            });
            refreshRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    function handleRoomPress(roomName) {
        console.log('Room name:', roomName);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {rooms.map((room) => (
                <TouchableOpacity
                    style={styles.roomContainer}
                    key={room.id}
                    onPress={() => handleRoomPress(room.roomName)}
                >
                    <Text style={styles.roomName}>{room.roomName}</Text>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteRoom(room.roomID)}
                    >
                        <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={styles.addRoomContainer}
                onPress={() => navigation.navigate('RoomInfo', { clientID: route.params?.clientID })}
            >
                <FontAwesome name="plus" size={80} color="black" />
                <Text style={styles.addRoomText}>Add Room</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    roomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
    },
    roomName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        marginLeft: 10,
    },
    addRoomContainer: {
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
    },
    addRoomText: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RoomsAdd;
