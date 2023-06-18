import _ from "lodash";
import "./style.css";
import Winter from "./winter.png";
import axios from "axios";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "메인";

  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Winter;

  element.appendChild(myIcon);

  btn.innerHTML = _.join(["click", " ", "main"]);
  btn.onclick = () => {
    axios({
      method: "get",
      url: "https://www.google.com/",
    }).then(function (response) {
      console.log("response :", response);
    });
  };

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
