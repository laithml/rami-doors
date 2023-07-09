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
        const ActiveDocRef = doc(db, "activeClients", req.params.id);
        await deleteDoc(ActiveDocRef);
        await deleteDoc(docRef);
        res.json({status: true});
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}


exports.getClient= async (req, res) => {

    try {
        const docRef = doc(db, "clients", req.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.json(docSnap.data());
            console.log(docSnap.data());
        } else {
            res.status(404).json({status: false, message: "Client not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json

    }
}


exports.getActiveClients = async (req, res) => {

    try {
        let clients = [];
        const querySnapshot = await getDocs(collection(db, "activeClients"));
        querySnapshot.forEach((doc) => {
            clients.push(doc.data());
        });
        res.json(clients);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}
