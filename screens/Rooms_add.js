import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Rooms_add = ({ navigation, route }) => {
    const [roomName, setRoomName] = useState([]);
    const numRooms = route.params?.numRooms;

    useEffect(() => {
        const initialRoomNames = Array(numRooms).fill('');
        setRoomName(initialRoomNames);
    }, [numRooms]);

    const updateRoomNames = (index, name) => {
        const updatedRoomNames = [...roomName];
        updatedRoomNames[index] = name;
        setRoomName(updatedRoomNames);
    };

    const renderRooms = () => {
        const rows = Math.ceil(numRooms / 3); // Number of rows based on numRooms
        const rooms = [];

        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                if (index < numRooms) {
                    const name = roomName[index] ? roomName[index] : `Room ${index + 1}`;
                    columns.push(
                        <TouchableOpacity
                            key={index}
                            style={styles.squareContainer}
                            onPress={() => navigation.navigate('RoomInfo', {roomId: index + 1, updateRoomNames })}
                        >
                            <FontAwesome name="plus" size={80} color="black" />
                            <Text style={styles.title}>{name}</Text>
                        </TouchableOpacity>
                    );
                } else {
                    columns.push(<View key={col} style={styles.squareContainer} />);
                }
            }
            rooms.push(<View key={row} style={styles.rowContainer}>{columns}</View>);
        }

        return rooms;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderRooms()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    squareContainer: {
        flex: 1,
        margin: 10,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Rooms_add;
