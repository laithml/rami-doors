
import React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';

const data = [
    { id: '1', image: 'https://vudesta.lt/wp-content/uploads/2022/10/skan-lauk-dur-1.jpg' },
    { id: '2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqe9j7QspzMcKWFryGgRqJlxF2Lpb4W1w-kS3VzqATy1FG6WNsmmI1q-zPzrplC2d750&usqp=CAU' },
    { id: '3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSysxOhsimPRxuFU2WaY8jnTooe2SAaq6ptMvfCmrQmxZ1bsx7VDnmfWWsHm1wuyKcH46M&usqp=CAU' },
    { id: '4', image: 'https://vudesta.lt/wp-content/uploads/2022/10/skan-lauk-dur-1.jpg' },
    { id: '5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqe9j7QspzMcKWFryGgRqJlxF2Lpb4W1w-kS3VzqATy1FG6WNsmmI1q-zPzrplC2d750&usqp=CAU' },
    { id: '6', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSysxOhsimPRxuFU2WaY8jnTooe2SAaq6ptMvfCmrQmxZ1bsx7VDnmfWWsHm1wuyKcH46M&usqp=CAU' },
];

const DoorChoose = ({navigation}) => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.touchable} onPress={() => ChooseDoorFunc(item)}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );

    const ChooseDoorFunc = (item) => {
        navigation.navigate("RoomInfo", {id:item.id});
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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

