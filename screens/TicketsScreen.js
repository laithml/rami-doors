import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, Alert} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../config/firebase';
import { doc, getDocs, deleteDoc, updateDoc, collection } from 'firebase/firestore';
import Colors from "../constants/Colors";

const TicketsScreen = ({ route, navigation }) => {
    const [activeClients, setActiveClients] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchActiveClients();
    }, []);

    const fetchActiveClients = async () => {
        try {
            setRefreshing(true);
            const querySnapshot = await getDocs(collection(db, 'activeClients'));
            const clients = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
                const client = { id: doc.id, ...doc.data() };
                clients.push(client);
            });
            setActiveClients(clients);
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching active clients:', error);
            setRefreshing(false);
        }
    };

    const handleEditClient = (clientID) => {
        console.log('Edit client with ID:', clientID);
        // Navigate to the edit client screen passing the client ID
        navigation.navigate('Rooms', { clientID });
    };

    const handleDone = (clientID) => {

        Alert.alert(
            'Are you sure?',
            'This client will be deleted from active clients',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Done',
                    onPress: async () => {
                        try {
                            const clientRef = doc(db, 'activeClients', clientID);
                            await deleteDoc(clientRef);
                            fetchActiveClients();
                        } catch (error) {
                            console.error('Error deleting client:', error);
                        }
                    },
                    style: 'destructive',
                },

            ],
            { cancelable: false },
        );



    };


    const renderClientItem = ({ item }) => {
        const renderRightActions = () => {


            return (
                <View style={styles.rightActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.doneButton]}
                        onPress={()=>handleDone(item.id)}
                    >
                        <FontAwesome name="check" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEditClient(item.id)}
                    >
                        <FontAwesome name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <View
                    style={styles.clientItem}
                >
                    <Text style={styles.clientName}>{item.name}, {item.phone}</Text>
                    <Text style={styles.clientDetails}>
                        Location: {item.city}, {item.street}
                    </Text>
                    <Text style={styles.clientDetails}>
                        House No: {item.houseNo}, Apart No: {item.apartmentNo}, Floor No: {item.floorNo}
                    </Text>
                </View>
            </Swipeable>
        );
    };

    const handleRefresh = () => {
        fetchActiveClients();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Clients</Text>
            <FlatList
                data={activeClients}
                renderItem={renderClientItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,

    },
    clientItem: {
        backgroundColor: Colors.lightPrimary,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    clientDetails: {
        fontSize: 16,
    },
    rightActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 80,
        height: 100,
    },
    doneButton: {
        backgroundColor: "#1f6e3c",
    },
    editButton: {
        backgroundColor: "#398ad7",
    },
    listContent: {
        paddingBottom: 16,
    },
});

export default TicketsScreen;
