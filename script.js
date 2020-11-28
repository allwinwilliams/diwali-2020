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
// $('#nameInput').val() = current_user.name || "";

let getValues = () => {
  current_user.name = $('#nameInput').val();
  current_user.time = (new Date()).toString();
  $('#add-to-map').show();
  $('#save-user').show();
  // storeUser(current_user.name, current_user.lat, current_user.long, current_user.time);
}

$('#add-to-map').hide();
$('#save-user').hide();

$('#add-to-map').click(() => {
  storeUser(current_user.name, current_user.lat, current_user.long, current_user.time);
});
