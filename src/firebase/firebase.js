import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPCXLjMOsQC2oXnRasRHCdeWI_k59_lz4",
  authDomain: "mroki-a39d3.firebaseapp.com",
  databaseURL: "https://mroki-a39d3-default-rtdb.firebaseio.com",
  projectId: "mroki-a39d3",
  storageBucket: "mroki-a39d3.appspot.com",
  messagingSenderId: "871354863113",
  appId: "1:871354863113:web:9bc7dc006d2d2d900cb2d8",
  measurementId: "G-PMCQ0WLESX",
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

export default storage;
