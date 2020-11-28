let store = {};

let keys = [];
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional...
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
  let stored = firebase.database().ref('users').push({
    name,
    lat,
    long,
    time
  });
  current_user.key = stored.key;
  current_user.added = false;
  console.log("user added....");
}

function updateUser(key, name, lat, long, time){
  firebase.database().ref(`/users/${key}`).update({
    name,
    lat,
    long,
    time
  });
}

firebase.database().ref('users').once('value')
  .then((snapshot) =>  {
    store = snapshot.val();
    _.map(store, (user) =>{
      user.added = false;
    });
    console.log(store);
});

firebase.database().ref('users').on("child_added", (snapshot, prevChildKey) => {
  var newLocation = snapshot.val();
  console.log('new post added...')
  console.log(snapshot.key);
  console.log(newLocation);
  newLocation.added = false;
  store[snapshot.key] = newLocation;
});
