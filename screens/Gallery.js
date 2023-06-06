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

const Item = ({ image, onSelectDoorImage }) => (
    <TouchableOpacity style={styles.touchable} onPress={() => onSelectDoorImage(image.id)}>
        <View style={styles.item}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        </View>
    </TouchableOpacity>
);

const GalleryScreen = ({ navigation, route }) => {
    const { onSelectDoorImage } = route.params;

    const renderItem = ({ item }) => <Item image={item.image} onSelectDoorImage={onSelectDoorImage} />;

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
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    touchable: {
        flex: 1,
    },
});

export default GalleryScreen;
