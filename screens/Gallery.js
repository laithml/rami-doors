import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const GalleryScreen = ({ navigation }) => {
    const [doorData, setDoorData] = useState([]);

    useEffect(() => {
        // Fetch door data from Firebase
        const fetchDoorData = async () => {
            try {
                const doorsCollection = collection(db, 'doors');
                const doorsSnapshot = await getDocs(doorsCollection);

                const doors = doorsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    image: convertDriveImageUrl(doc.data().imageUrl),
                }));

                setDoorData(doors);
            } catch (error) {
                console.log('Error fetching door data:', error);
            }
        };

        fetchDoorData();
    }, []);

    // Modify Google Drive image URL
    const convertDriveImageUrl = (driveUrl) => {
        const fileId = driveUrl.match(/\/file\/d\/([^/]+)\//)[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.touchable}>
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
