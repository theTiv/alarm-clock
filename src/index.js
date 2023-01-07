import Clock from "./pages/clock.html";
import "./style.scss";

function init() {
  function render() {
    const wrapper = document.createElement("main");

    wrapper.setAttribute("id", "clock");
    wrapper.innerHTML = Clock;

    return wrapper;
  }

  function setTime() {
    const hourshand = document.querySelector(".clock-hands__hours");
    const minuteshand = document.querySelector(".clock-hands__minutes");
    const secondshand = document.querySelector(".clock-hands__seconds");
    const time = new Date();
    const seconds = time.getSeconds() / 60;
    const minutes = (seconds + time.getMinutes()) / 60;
    const hours = (minutes + time.getHours()) / 12;

    setRotation(secondshand, seconds);
    setRotation(minuteshand, minutes);
    setRotation(hourshand, hours);
  }

  function setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
  }
  setInterval(setTime, 1000);
  document.body.appendChild(render());
  setTime();
}

init();
