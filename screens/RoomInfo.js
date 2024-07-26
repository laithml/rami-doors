import React  from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {db} from "../config/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";

const RoomInfo = ({route, navigation}) => {
    const [roomName, setRoomName] = React.useState(route.params?.roomName || '');
    const [color, setColor] = React.useState(route.params?.color || '');
    const [notes, setNotes] = React.useState(route.params?.notes || '');
    const [measurement, setMeasurement] = React.useState(route.params?.measurement || '60');
    const [width, setWidth] = React.useState(route.params?.width || '10');
    const doorID = route.params?.doorID;
    const [image, setImage] = React.useState(route.params?.image || undefined);
    const clientID = route.params?.clientID;
    const [roomID, setroomID] = React.useState(route.params?.roomID || '');



    if (image === undefined && doorID !== undefined) {
        const doorRef = doc(db, 'doors', doorID);
        getDoc(doorRef).then((docSnap) => {
            let img = docSnap.data().imageUrl;
            setImage(img);
        });

    }


    const handleMeasurementChange = (value) => {
        setMeasurement(value);
    };
    const handleWidthChange = (value) => {
        setWidth(value);
    };

    const handleChooseDoorImage = () => {
        navigation.navigate('DoorChoose', {
            clientID: route.params?.clientID,
            image: route.image?.image,
            doorID: route.params?.doorID
        });
    };

    const handleSubmit = () => {
        const data = {
            roomID,
            roomName,
            color,
            notes,
            measurement,
            width,
            doorID,
        };

        const clientsRef = doc(db, 'clients', clientID);
        const ActiveclientsRef = doc(db, 'activeClients', clientID);

        getDoc(clientsRef).then((docSnap) => {
            const rooms = docSnap.data().rooms;

            // Check if roomID already exists
            const existingRoomIndex = rooms.findIndex((room) => room.roomID === roomID);
            if (existingRoomIndex !== -1) {
                // Update existing room
                rooms[existingRoomIndex] = data;
            } else {
                // Add new room
                rooms.push(data);
            }

            // Update rooms in clients collection
            updateDoc(clientsRef, {rooms})
                .then(() => {
                    console.log('Document successfully updated!');
                    navigation.navigate('Rooms', {clientID});
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
        });

        getDoc(ActiveclientsRef).then((docSnap) => {
            const rooms = docSnap.data().rooms;

            // Check if roomID already exists
            const existingRoomIndex = rooms.findIndex((room) => room.roomID === roomID);
            if (existingRoomIndex !== -1) {
                // Update existing room
                rooms[existingRoomIndex] = data;
            } else {
                // Add new room
                rooms.push(data);
            }

            // Update rooms in activeClients collection
            updateDoc(ActiveclientsRef, {rooms})
                .then(() => {
                    console.log('Document successfully updated!');
                    navigation.navigate('Rooms', {clientID});
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
        });
    };


    if (roomID === '')
        setroomID(Math.random().toString(36).substring(7));
    console.log("Room id is: " + roomID + "\n\n\n\n\n")
    const renderMeasurementButtons = () => {
        const buttons = [];
        for (let i = 60; i <= 100; i += 5) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.measurementButton,
                        measurement === i.toString() ? styles.measurementButtonSelected : null,
                    ]}
                    onPress={() => handleMeasurementChange(i.toString())}
                >
                    <Text style={styles.measurementButtonText}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return buttons;
    };
    const renderWidth = () => {
        const buttons = [];
        for (let i = 10; i <= 20; i += 2) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.measurementButton,
                        width === i.toString() ? styles.measurementButtonSelected : null,
                    ]}
                    onPress={() => handleWidthChange(i.toString())}
                >
                    <Text style={styles.measurementButtonText}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return buttons;
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>

        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Room Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Room Name"
                value={roomName}
                onChangeText={setRoomName}
                onSubmitEditing={Keyboard.dismiss}


            />

            <Text style={styles.label}>Door</Text>
            <Text style={styles.label}>Door id: {doorID}</Text>

            <Image source={{uri: image}} style={styles.image}/>


            <TouchableOpacity style={styles.button} onPress={handleChooseDoorImage}>
                <Text style={styles.buttonText}>Choose Door Image</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Color</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Color"
                value={color}
                onChangeText={setColor}
                onSubmitEditing={Keyboard.dismiss}

            />

            <Text style={styles.label}>Measurement</Text>
            <View style={styles.measurementContainer}>{renderMeasurementButtons()}</View>
            <Text style={styles.label}>Width</Text>
            <View style={styles.measurementContainer}>{renderWidth()}</View>
            <Text style={styles.label}>Note</Text>
            <TextInput
                style={styles.note}
                placeholder="Enter Note"
                value={notes}
                onChangeText={setNotes}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                onSubmitEditing={Keyboard.dismiss}

            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = {
    container: {
        flexGrow: 1,
        padding: Spacing * 2,
        backgroundColor: Colors.background,
    },
    heading: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        marginBottom: Spacing * 5,
    },
    label: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        marginBottom: Spacing * 2,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: Colors.lightPrimary,
        backgroundColor: Colors.lightPrimary,
        borderRadius: 4,
        paddingHorizontal: Spacing * 2,
        marginBottom: Spacing * 3,
    },
    measurementContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: Spacing * 3,
    },
    measurementButton: {
        borderWidth: 1,
        borderColor: Colors.lightPrimary,
        backgroundColor: Colors.lightPrimary,
        borderRadius: 4,
        paddingHorizontal: Spacing * 2,
        paddingVertical: Spacing,
        marginRight: Spacing,
        marginBottom: Spacing,
    },
    measurementButtonSelected: {
        backgroundColor: Colors.primary,
    },
    measurementButtonText: {
        color: Colors.dark,
        fontSize: FontSize.medium,
        fontWeight: 'bold',
    },
    note: {
        height: 120,
        borderWidth: 1,
        borderColor: Colors.lightPrimary,
        backgroundColor: Colors.lightPrimary,
        borderRadius: 4,
        paddingHorizontal: Spacing * 2,
        marginBottom: Spacing * 3,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing * 2,
        paddingHorizontal: Spacing * 2,
        marginTop: Spacing * 2,
        marginBottom: Spacing * 2,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: Colors.white,
        fontSize: FontSize.medium,
        fontWeight: 'bold',
    },
    image: {
        aspectRatio: 0.5,
        width: 800,
        height: 320,

    }
};

export default RoomInfo;
