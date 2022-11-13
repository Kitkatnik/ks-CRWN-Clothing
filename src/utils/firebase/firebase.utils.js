// Import the functions needed
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjpoipkcG9odZ-5-4_wsjbhvBU_EfAlhI",
  authDomain: "crwn-clothing-db-52d4b.firebaseapp.com",
  projectId: "crwn-clothing-db-52d4b",
  storageBucket: "crwn-clothing-db-52d4b.appspot.com",
  messagingSenderId: "797281922981",
  appId: "1:797281922981:web:715ae613ba42a2e612824c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseApp);
    
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc( db, 'users',userAuth.uid );
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch ( error ){
            console.log('error creating the user', error.message);
        }
    } 

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async ( email, password ) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword( auth, email, password )
}

export const signInAuthUserWithGooglePopup = () => signInWithPopup(auth, provider);