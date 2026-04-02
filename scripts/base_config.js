const root = window.location.origin;
let path = "/";
if (window.location.hostname.includes("github.io")) {
  path = "/Frontend-Projektarbete-G-niva/";
}
document.getElementById("base-path").setAttribute("href", root + path);
