import { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const useGalleryData = () => {
    const [doorData, setDoorData] = useState([]);

    useEffect(() => {
        const fetchDoorData = async () => {
            const doorsRef = collection(db, "doors");
            const doorSnapshot = await getDocs(doorsRef);
            const doors = doorSnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    image: doc.data().imageUrl,
                };
            });

            setDoorData(doors);
        };

        fetchDoorData();
    }, []);

    return doorData;
};

export default useGalleryData;
