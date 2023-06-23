const {doc, setDoc, deleteDoc, getDoc, updateDoc, collection, getDocs} = require("firebase/firestore");
const {db} = require("../config/Firebase");

exports.getClients = async (req, res) => {
    console.log("getClients");

    try {
        let clients = [];
        const querySnapshot = await getDocs(collection(db, "clients"));
        querySnapshot.forEach((doc) => {
            clients.push(doc.data());
        });
        res.json(clients);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

exports.deleteClient = async (req, res) => {
    console.log("deleteClient");
    try {
        const docRef = doc(db, "clients", req.params.id);
        await deleteDoc(docRef);
        res.json({status: true});
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}