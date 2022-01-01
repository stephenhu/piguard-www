/* piguard.js */

const API_SERVICES          = "/api/services";
const API_SYSTEM            = "/api/system";
const SERVICE_WIREGUARD     = "/wireguard";
const HTTP_GET              = "get";
const HTTP_POST             = "post";
const HTTP_PUT              = "put";
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


function getWireguardState() {

  fetch(API_SERVICES + SERVICE_WIREGUARD, {
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

} // getWireguardState


function startWireguard() {

  fetch(API_SERVICES + SERVICE_WIREGUARD + "?method=startunit", {
    method: HTTP_PUT
  })
  .then((response) => {
    if(response.ok) return response.text();
  })
  .then((data) => {

    setWireguardState(SYSTEMD_ACTIVE);

  })
  .catch((error) => {
    console.log(error);
  });

  
} // startWireguard


function stopWireguard() {

  fetch(API_SERVICES + SERVICE_WIREGUARD + "?method=stopunit", {
    method: HTTP_PUT
  })
  .then((response) => {
    if(response.ok) return response.text();
  })
  .then((data) => {

    setWireguardState(SYSTEMD_INACTIVE);

  })
  .catch((error) => {
    console.log(error);
  });


} // stopWireguard


function restartWireguard() {

  fetch(API_SERVICES + SERVICE_WIREGUARD + "?method=restartunit", {
    method: HTTP_PUT
  })
  .then((response) => {
    if(response.ok) return response.text();
  })
  .then((data) => {

    setWireguardState(SYSTEMD_ACTIVATING);

  })
  .catch((error) => {
    console.log(error);
  });


} // restartWireguard


function systemApi(m) {

} // systemApi
