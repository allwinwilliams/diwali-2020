let current_user = {};

let getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      current_user.lat = position.coords.latitude;
      current_user.long = position.coords.longitude;
      console.log("got location");
      console.log(position.coords);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

getLocation();

let getValues = () => {
  current_user.name = $('#nameInput').val();
  current_user.time = (new Date()).toString();
  storeUser(current_user.name, current_user.lat, current_user.long, current_user.time);
}
