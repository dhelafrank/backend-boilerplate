import { Configs } from "../../configs";

const { initializeApp } = require ("firebase/app")

const firebaseConfig = {
    apiKey: Configs.firebase.apiKey,
    authDomain: Configs.firebase.authDomain,
    projectId: Configs.firebase.projectId,
    storageBucket: Configs.firebase.storageBucket,
    messagingSenderId: Configs.firebase.messagingSenderId,
    appId: Configs.firebase.appId,
    measurementId: Configs.firebase.measurementId
  };
  
  // Initialize Firebase
  const firebaseInit = initializeApp(firebaseConfig)
  
  module.exports = {firebaseInit, firebaseConfig};
  