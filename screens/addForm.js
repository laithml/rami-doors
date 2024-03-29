import React from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {db} from '../config/firebase';

const {doc, setDoc, deleteDoc, getDoc, updateDoc, collection, getDocs} = require("firebase/firestore");


const FormScreen = ({navigation}) => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [city, setCity] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [apartmentNo, setApartmentNo] = React.useState('');
    const [floorNo, setFloorNo] = React.useState('');
    const [houseNo, setHouseNo] = React.useState('');

    const handleSubmit = () => {
        const rooms = [];
        const clientID = Math.random().toString(36).substring(7);

        const data = {
            clientID,
            name,
            phone,
            city,
            street,
            apartmentNo,
            floorNo,
            houseNo,
            rooms,
        };




if (!name || !phone || !city || !street || !apartmentNo || !floorNo || !houseNo) {
            Alert.alert('Missing Fields', 'Please fill in all fields');
            return;

        }else{
        // noinspection JSCheckFunctionSignatures
        setDoc(doc(db, "activeClients", clientID), data).then(r=>console.log(r));
        const clientsRef = doc(db, "clients", clientID);
        setDoc(clientsRef, data).then(() => {
            //reset fields
            setName('');
            setPhone('');
            setCity('');
            setStreet('');
            setApartmentNo('');
            setFloorNo('');
            setHouseNo('');
            navigation.navigate('Rooms', {clientID});
        });

        }

    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <View style={styles.row}>
                <View style={[styles.rowItem, styles.itemMarginRight]}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter City"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>

                <View style={styles.rowItem}>
                    <Text style={styles.label}>Street</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Street"
                        value={street}
                        onChangeText={setStreet}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.rowItem, styles.itemMarginRight]}>
                    <Text style={styles.label}>House No</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter House No"
                        value={houseNo}
                        onChangeText={setHouseNo}
                    />
                </View>

                <View style={[styles.rowItem, styles.itemMarginRight]}>
                    <Text style={styles.label}>Apartment No</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Apartment No"
                        value={apartmentNo}
                        onChangeText={setApartmentNo}
                    />
                </View>

                <View style={styles.rowItem}>
                    <Text style={styles.label}>Floor No</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Floor No"
                        value={floorNo}
                        onChangeText={setFloorNo}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
    container: {
        flexGrow: 1,
        padding: Spacing * 2,
        // backgroundColor: Colors.,
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
    row: {
        flexDirection: 'row',
        marginBottom: Spacing * 3,
    },
    rowItem: {
        flex: 1,
    },
    itemMarginRight: {
        marginRight: Spacing * 2,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing * 2,
        paddingHorizontal: Spacing * 2,
        marginTop: Spacing * 5,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: Colors.white,
        fontSize: FontSize.medium,
        fontWeight: 'bold',
    },
};

export default FormScreen;
