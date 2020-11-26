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
  storeUser(current_user.name, current_user.lat || 0, current_user.long || 0, (new Date()).toString());
}
