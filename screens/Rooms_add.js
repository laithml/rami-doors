import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const Rooms_add = ({navigation}) => {
    function handleSubmit(navigation) {
        navigation.navigate('RoomInfo')
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.squareContainer} onPress={() => handleSubmit(navigation)}>
                    <FontAwesome name="plus" size={80} color="black" />
                    <Text style={styles.title}>Room Title</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.squareContainer}>
                    <FontAwesome name="plus" size={80} color="black" />
                    <Text style={styles.title}>Room Title</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.squareContainer}>
                    <FontAwesome name="plus" size={80} color="black" />
                    <Text style={styles.title}>Room Title</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.squareContainer}>
                    <FontAwesome name="plus" size={80} color="black" />
                    <Text style={styles.title}>Room Title</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.squareContainer}>
                    <FontAwesome name="plus" size={80} color="black" />
                    <Text style={styles.title}>Room Title</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.squareContainer}>
                    <FontAwesome name="plus" size={80} color="black" />
                    <Text style={styles.title}>Room Title</Text>
                </TouchableOpacity>
            </View>
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
        margin : 10,
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
