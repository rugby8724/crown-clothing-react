import { initializeApp } from 'firebase/app'
import { 
  getAuth,  
  signInWithPopup,  
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB8Q1lS2jVWSarnndzhh8i9kNZH9wMnRE4",
  authDomain: "cwn-clothing-e49b7.firebaseapp.com",
  projectId: "cwn-clothing-e49b7",
  storageBucket: "cwn-clothing-e49b7.appspot.com",
  messagingSenderId: "461476211444",
  appId: "1:461476211444:web:2e55c6e311c40acebd0ca1"
};

const app = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth(app)
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return
  // doc takes 3 arguments(database, collection, identifier)
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())


  // if user data does not exist
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    // create / set the document with the data from userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt, 
        ...additionalInformation
      })

    } catch(error){
      console.log('error creating the user', error.message)
    }
  }

  // return userDoc Ref
  return userDocRef

}

export const createAuthUserWithEmailandPassword =  async (email, password) => {
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}