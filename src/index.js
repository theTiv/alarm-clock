import _ from "lodash";
import Clock from "./ui/clock-face.html";
import Alarm from "./ui/alarm-control.html";
import AlarmBells from "./ui/alarm-bells.html";
import "./style.scss";

class AlarmClock {
  constructor(alarmTime = null) {
    this.alarmTime = alarmTime; // time to set alarm
    console.log(this.alarmTime);
    document.body.appendChild(this.render()); // add clock elements to DOM
    this.updateTime(); // set time on load
    setInterval(this.updateTime.bind(this), 1000); // update time every second
    this.addEventListeners(); // add event listeners
    this.leftBell = document.querySelector(".alarm-bells__bell--left");
    this.rightBell = document.querySelector(".alarm-bells__bell--right");
  }

  render() {
    const wrapper = document.createElement("main");

    wrapper.setAttribute("id", "clock");
    wrapper.innerHTML = Clock;
    wrapper.insertAdjacentHTML("afterbegin", AlarmBells);
    wrapper.insertAdjacentHTML("beforeend", Alarm);

    return wrapper;
  }

  updateTime() {
    const hoursHand = document.querySelector(".clock-hands__hours");
    const minutesHand = document.querySelector(".clock-hands__minutes");
    const secondsHand = document.querySelector(".clock-hands__seconds");

    const time = new Date();
    const seconds = time.getSeconds() / 60;
    const minutes = (seconds + time.getMinutes()) / 60;
    const hours = (minutes + time.getHours()) / 12;
    const digitalTime = time.toLocaleTimeString([], { timeStyle: "short" });

    this.setRotation(secondsHand, seconds);
    this.setRotation(minutesHand, minutes);
    this.setRotation(hoursHand, hours);
    console.log("alarmTimes updateTime");
    console.log(digitalTime);
    console.log(this.alarmTime);
    if (digitalTime == this.alarmTime) {
      this.playAlarm();
    }
  }

  setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
  }

  addEventListeners() {
    document
      .querySelector("#set_alarm")
      .addEventListener("click", (e) => this.setAlarmTime(e));

    document
      .querySelector("#alarm_off")
      .addEventListener("click", (e) => this.turnOffAlarm(e));
  }

  setAlarmTime() {
    const alarmTime = document.querySelector(".alarm-control__input").value;
    // console.log(alarmTime);
    this.alarmTime = alarmTime;
    document.querySelector("#set_alarm").value = `Alarm Set`;
    document.querySelector(
      "#alarm_status"
    ).innerText = `Alarm time is set for ${alarmTime}`;
  }

  playAlarm() {
    const audio = document.querySelector("#alarm_audio");
    audio.play();
    document.querySelector("#alarm_status").innerText = `Alarm is ringing`;
    this.leftBell.classList.add("bell-ringing");
    this.rightBell.classList.add("bell-ringing");
  }

  turnOffAlarm() {
    console.log("Alarm off");
    this.alarmTime = null;
    document.querySelector("#set_alarm").value = "Set Alarm";
    document.querySelector("#alarm_status").innerText = `The Alarm is now off`;
    this.leftBell.classList.remove("bell-ringing");
    this.rightBell.classList.remove("bell-ringing");
  }
}

new AlarmClock();
