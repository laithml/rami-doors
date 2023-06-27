import React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGalleryData from '../constants/useGalleryData';

const DoorChoose = ({ route }) => {
    const navigation = useNavigation();
    const doorData = useGalleryData(); // Use the custom hook to get the doorData

    const handleChooseDoor = (item) => {
        navigation.navigate('RoomInfo', { clientID: route.params.clientID, doorID: item.id, image: item.image });
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.touchable} onPress={() => handleChooseDoor(item)}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={doorData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
                numColumns={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    flatListContent: {
        flexGrow: 1,
    },
    item: {
        flex: 1,
        aspectRatio: 1, // Maintain a square aspect ratio
        margin: '1.8%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    touchable: {
        flex: 1,
    },
});

export default DoorChoose;
