/* piguard.js */

const API_SERVICES  = "/api/services";
const API_SYSTEM    = "/api/system";
const SERVICE_WIREGUARD = "/wireguard";
const HTTP_GET  = "get";
const HTTP_POST = "post";

function getServiceApi() {

  fetch(API_SERVICES + SERVICE_WIREGUARD, {
    method: HTTP_GET
  })
  .then((response) => {
    if(response.ok) return response.text();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

} // getServiceApi


function systemApi(m) {

} // systemApi
