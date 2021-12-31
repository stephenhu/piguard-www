/* piguard.js */

const API_SERVICES          = "/api/services";
const API_SYSTEM            = "/api/system";
const SERVICE_WIREGUARD     = "/wireguard";
const HTTP_GET              = "get";
const HTTP_POST             = "post";
const SYSTEMD_ACTIVATING    = "activating";
const SYSTEMD_ACTIVE        = "active";
const SYSTEMD_FAILED        = "failed";
const SYSTEMD_INACTIVE      = "inactive";
const SYSTEMD_RELOADING     = "reloading";


function setWireguardState(b) {

  var state = document.getElementById("wgstate");

  console.log(b);

  if(b === SYSTEMD_ACTIVE) {
    state.innerText = "connected";
  } else if(b === SYSTEMD_INACTIVE) {
    state.innerText = "disconnected";
  } else if(b === SYSTEMD_RELOADING) {
    state.innerText = "reloading";
  } else if(b === SYSTEMD_FAILED) {
    state.innerText = "failed";
  } else if(b === SYSTEMD_ACTIVATING) {
    state.innerText = "activating";
  }
 
} // setWireguardState


function getServiceApi(s) {

  fetch(API_SERVICES + s, {
    method: HTTP_GET
  })
  .then((response) => {
    if(response.ok) return response.text();
  })
  .then((data) => {
    console.log(data);

    var j = JSON.parse(data);

    setWireguardState(j.active);
  })
  .catch((error) => {
    console.log(error);
  });

} // getServiceApi


function systemApi(m) {

} // systemApi
