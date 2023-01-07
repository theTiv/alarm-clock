import _ from "lodash";
import Clock from "./pages/clock.html";
import "./style.scss";

class init {
  constructor() {
    document.body.appendChild(this.render());
    this.setTime(); // set time on load
    setInterval(this.setTime.bind(this), 1000);
  }

  render() {
    const wrapper = document.createElement("main");

    wrapper.setAttribute("id", "clock");
    wrapper.innerHTML = Clock;

    return wrapper;
  }

  setTime() {
    const hourshand = document.querySelector(".clock-hands__hours");
    const minuteshand = document.querySelector(".clock-hands__minutes");
    const secondshand = document.querySelector(".clock-hands__seconds");
    const time = new Date();
    const seconds = time.getSeconds() / 60;
    const minutes = (seconds + time.getMinutes()) / 60;
    const hours = (minutes + time.getHours()) / 12;

    this.setRotation(secondshand, seconds);
    this.setRotation(minuteshand, minutes);
    this.setRotation(hourshand, hours);
  }

  setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
  }
}

new init();
