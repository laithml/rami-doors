import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {db} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";

const GalleryScreen = ({navigation}) => {
    const [doorData, setDoorData] = useState([]);

    // Modify Google Drive image URL
    const convertDriveImageUrl = (driveUrl) => {
        if (!driveUrl) {
            return 'fallback_image_url'; // Replace with your desired fallback image URL
        }

        const fileIdMatch = driveUrl.match(/\/file\/d\/([^/]+)\//);
        if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        } else {
            return 'fallback_image_url'; // Replace with your desired fallback image URL
        }
    };

    useEffect(() => {
        const fetchDoorData = async () => {
            const doorsRef = collection(db, "doors");
            const doorSnapshot = await getDocs(doorsRef);
            const doors = [];

            doorSnapshot.forEach((doc) => {
                const door = {
                    id: doc.id,
                    image: convertDriveImageUrl(doc.data().imageUrl),
                };
                doors.push(door);
            });

            setDoorData(doors);
        };

        fetchDoorData();
    }, []);

    const renderItem = ({item}) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.touchable}>
                <Image source={{uri: item.image}} style={styles.image} resizeMode="contain"/>
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
