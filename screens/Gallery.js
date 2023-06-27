import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import useGalleryData from '../constants/useGalleryData';

class GalleryItem extends PureComponent {
    render() {
        const { item } = this.props;

        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.touchable}>
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        );
    }
}

const GalleryScreen = ({ navigation }) => {
    const doorData = useGalleryData(); // Use the custom hook to get the doorData

    const renderItem = ({ item }) => <GalleryItem item={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={doorData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
                numColumns={1}
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
    },
    image: {
        width: '100%',
        height: '100%',
    },
    touchable: {
        flex: 1,
    },
});

export default GalleryScreen;
