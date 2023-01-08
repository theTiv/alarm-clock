import _ from "lodash";
import Clock from "./ui/clock-face.html";
import Alarm from "./ui/alarm-control.html";
import AlarmBells from "./ui/alarm-bells.html";
import "./style.scss";

class AlarmClock {
  constructor(alarmTime = null) {
    this.alarmTime = alarmTime; // time to set alarm
    document.body.appendChild(this.render()); // add clock elements to DOM
    this.updateTime(); // set time on load
    setInterval(this.updateTime.bind(this), 1000); // update time every second
    this.addEventListeners(); // add event listeners

    // DOM elements
    this.leftBell = document.querySelector(".alarm-bells__bell--left");
    this.rightBell = document.querySelector(".alarm-bells__bell--right");
    this.alarmStatus = document.querySelector("#alarm_status"); // alarm status
    this.alarmSet = document.querySelector("#set_alarm"); // alarm set button
    this.audio = document.querySelector("#alarm_audio");
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
    const alarmWarningSelector = "alarm-control__message-warning";
    const alarmTime = document.querySelector(".alarm-control__input").value;
    const alarmMessage = document.querySelector(`.${alarmWarningSelector}`);

    if (!alarmTime) {
      alarmMessage.classList.add(`${alarmWarningSelector}--visible`);
      return;
    } else if (
      alarmMessage.classList.contains(`${alarmWarningSelector}--visible`)
    ) {
      alarmMessage.classList.remove(`${alarmWarningSelector}--visible`);
    }

    this.alarmTime = alarmTime;
    this.alarmSet.value = `Alarm Set`;
    this.alarmStatus.innerText = `Alarm time is set for ${alarmTime}`;
  }

  playAlarm() {
    this.audio.currentTime = 0; // reset audio to start
    this.audio.muted = false; // unmute audio
    this.audio.volume = 0.5; // set volume
    this.audio.play();

    // Update UI
    this.alarmStatus.classList.add("alarm-control__alarm-status--ringing");
    this.alarmStatus.innerText = `Alarm is ringing!`;
    this.leftBell.classList.add("bell-ringing");
    this.rightBell.classList.add("bell-ringing");
  }

  turnOffAlarm() {
    this.audio.muted = true; // mute audio
    this.alarmTime = null;

    // Update UI
    this.alarmSet.value = "Set Alarm";
    this.alarmStatus.classList.remove("alarm-control__alarm-status--ringing");
    this.alarmStatus.innerText = `The Alarm is now off`;
    this.leftBell.classList.remove("bell-ringing");
    this.rightBell.classList.remove("bell-ringing");
  }
}

new AlarmClock();
