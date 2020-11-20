let store = {};
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDeBSykwrmtb7MYUjdgv3l1amrXkeMnaw4",
  authDomain: "diwali2020-10ba6.firebaseapp.com",
  databaseURL: "https://diwali2020-10ba6.firebaseio.com",
  projectId: "diwali2020-10ba6",
  storageBucket: "diwali2020-10ba6.appspot.com",
  messagingSenderId: "1045739233580",
  appId: "1:1045739233580:web:1af027dedd2799b60f4c89",
  measurementId: "G-ZKLGLSCG4K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let database = firebase.database();

function storeUser(name, lat, long, time) {
  let userId = name;
  firebase.database().ref('users').push({
    name,
    lat,
    long,
    time
  });
}

function get_store(){
  firebase.database().ref('users').once('value')
    .then((snapshot) =>  {
      store = snapshot.val();
      console.log(store);

    });
}

get_store();
