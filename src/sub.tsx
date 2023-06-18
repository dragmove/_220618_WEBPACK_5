import _ from "lodash";
import Slack from "./slack.png";
import "./style.css";
import axios from "axios";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "서브";

  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Slack;

  element.appendChild(myIcon);

  btn.innerHTML = _.join(["click", " ", "sub"]);
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
