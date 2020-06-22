import * as firebase from 'firebase'

require('@firebase/firestore')

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD5LABsz6WxIeOZdlHJHtePPSuXSBX7ktQ",
    authDomain: "wireless-brary.firebaseapp.com",
    databaseURL: "https://wireless-brary.firebaseio.com",
    projectId: "wireless-brary",
    storageBucket: "wireless-brary.appspot.com",
    messagingSenderId: "320930240598",
    appId: "1:320930240598:web:02c974d3064c55255c43f7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()