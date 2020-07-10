import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCOM-qeIEgE3iqg2G9i_B31adjiJrbRt3k",
    authDomain: "crwn-db-f3502.firebaseapp.com",
    databaseURL: "https://crwn-db-f3502.firebaseio.com",
    projectId: "crwn-db-f3502",
    storageBucket: "crwn-db-f3502.appspot.com",
    messagingSenderId: "456105673847",
    appId: "1:456105673847:web:abbbbbb8439a69c4843272",
    measurementId: "G-685D9RBGGG"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName, email,createdAt, ...additionalData
        })
      }catch(error){
        console.log('error creating data', error.message);
      }
    }

    return userRef;
  }

  // export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
  //   const collectionRef = firestore.collection(collectionKey);
  //   const batch = firestore.batch();
  //   objectsToAdd.forEach(obj => {
  //     const newDocRef =  collectionRef.doc();
  //     batch.set(newDocRef,obj)
  //   });
  //   return await batch.commit();
  // }

  firebase.initializeApp(config);

  export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items} = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()), 
        id: doc.id,
        title, 
        items
      }
    });
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{})
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
  