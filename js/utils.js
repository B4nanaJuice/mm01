function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function show(v) {
  let obj = document.querySelector(`.${v}`);
  if (obj.classList.contains("dialogue-show")) {
    obj.classList.remove("dialogue-show");
    obj.classList.add("dialogue-hide");
  } else {
    obj.classList.add("dialogue-show");
    obj.classList.remove("dialogue-hide");
  }
}
