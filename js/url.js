function checkUrl() {
  console.log(window.location.href);
}

window.addEventListener("hashchange", function () {
  checkUrl();
});
