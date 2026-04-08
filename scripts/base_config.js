const root = window.location.origin;
let path = "/";
if (window.location.hostname.includes("github.io")) {
  path = "/Frontend-Project-VG/";
}
document.getElementById("base-path").setAttribute("href", root + path);
