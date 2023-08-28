const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// creating a document
const createDoc = async () => {
  const newDocRef = await db.collection("testCollection").add({
    firstName: "Ritul",
    lastName: "Singh",
    phoneNumber: "1234567893",
    email: "example@gmail.com",
    address: "123, abc street, xyz city, 12345"
  });
  console.log("Document added with ID:", newDocRef.id);
}

// reading a document
const readDoc = async (collectionName, documentId) => {
  const docRef = db.collection(collectionName).doc(documentId);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      console.log("FirstName:", data.firstName);
      console.log("Document data:", doc.data());
    } else {
      console.log("Document not found");
    }
  });
}

// updating a document
const updateDoc = async (collectionName, documentId) => {
  const docRef = db.collection(collectionName).doc(documentId);
  docRef.update({
    firstName: "Lutir"
  })
    .then(() => {
      console.log("Document successfully updated");
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
}

// deleting a document
const deleteDoc = async (collectionName, documentId) => {
  const docRef = db.collection(collectionName).doc(documentId);
  docRef.delete().then(() => {
    console.log("Document successfully deleted");
  }).catch((error) => {
    console.error("Error deleting document:", error);
  });
}

// search a document by field
const searchDoc = async (collectionName, fieldName, fieldValue) => {
  const query = db.collection(collectionName).where(fieldName, "==", fieldValue);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log(`No documents found for the given ${fieldName}: ${fieldValue}`);
      return;
    }
    querySnapshot.forEach((doc) => {
      console.log("Document data:", doc.data());
    });
  }).catch((error) => {
    console.error("Error searching documents:", error);
  })
}

createDoc();
readDoc("testCollection", "wUsgBEpwfFUkJyGbFmaC");
updateDoc("testCollection", "wUsgBEpwfFUkJyGbFmaC");
deleteDoc("testCollection", "wUsgBEpwfFUkJyGbFmaC");
searchDoc("testCollection", "phoneNumber", "1234567893");
