# Alarm Clock Technical Exercise

This technical exercise is to recreate a traditional analog clock in digital form from the SVG Asset provided.

**Exporting Assets**

For ease of importing PNGs in Webpack over SVG loaders which can be problematic and for ease of styling I opted to export the Clock's assets as transparent PNGs. This required opening in Illustrator and ungrouping the assets in to the following:

Clock Face (without Bells and Ringer Handle)
Clock Ringer Handle
Hour Hand
Minutes Hand
Seconds Hand
Left Bell
Right Bell

**Setup Webpack**

I decided for this exercise not to use a JavaScript Framework or Library, but to code in pure ES6 JavaScript using Webpack as my build tool.

A default test dependency when setting up Webpack 5 is Lodash which I used in initial testing but not in the final application.

I also installed the following loaders:

**Babel** for ES6 transpilation to ES5
**HTML loader** to load the various UI 'views'
**SASS Loader** to enable writing SCSS that compiles the CSS
**Webpack Dev Server** to enable local development server and hot reloading

**Summary**

The index.js contains the application's core logic. Using module imports the UI 'views' that contain the markup for the clock itself (clock face and hands), alarm bells and alarm control are imported and rendered with the render function which is called in the constructor when the new instance is created.

Styling for each UI view can be found in the corresponding filename with .scss extension in the styles folder. The constructor creates instance properties for the DOM elements and calls the updateTime method to initialise the time setting the hands in the correct places and then a setInterval function again calls the updateTime method at 1000 millisecond intervals which also moves the seconds hand along on each call. The initial call is to avoid a flash of the default hands setting being at midnight and then jumping to the correct time.

The user can then set the alarm by either manual entering the time or by using the time selector from the time field below the clock. Once selected the User must click the Set Alarm button to set the Alarm. A messages is displayed confirming the Alarm is set and the time it is set for. If the user clicks the Set Alarm button without entering a time a warning message is displayed asking the user to enter the time they wish to set the alarm for.

When the current time matches the Alarm's set time the ringing is activated. The ringing is signified with an MP3 alarm file playing (the initial mute is set to true to comply with Browser policy and is set to false when the playAlarm method is called). Also an animation is triggered that simulates the bells ringing and an alarm is ringing message that flashes is displayed to the user. There is another button to turn off the alarm.

**Methods**

**updateTime**

This core function gets the current time from the browser and then a constant is created for each breakdown of time into hours, minutes and seconds. Each variable's value is added to the next constant and divided by the number of units in the current definition so by 60 for seconds and minutes (60 seconds in a minute, 60 minutes in an hour) and 12 for hours (12 hours in one full rotation) - the resulting value for each constant is passed to the setRotation method to display the correct position for all three hands on each call, the fraction also makes the hands appear at the correct ratio between units that avoids a jump between positions and acts as a real analog clock would. The playAlarm method is triggered if the Alarm time matches the current digital time const.

**setRotation**

This method sets 'rotation ratio' which is the constant's values as described above in the updateTime method. This function sets the css variable '--rotation' value for the element being passed into the function. The CSS variable updates on the fly and adjust the element position accordingly which is most evident with the seconds hand constantly moving as with an actual analog clock.

**addEventListeners**

As the name describes this method adds event listeners to the Set Alarm and Turn Off Alarm buttons. When these are clicked the setAlarmTime and turnOffAlarm methods are triggered accordingly.

**setAlarmTime**

This function gets the value entered by the user of the time field that if empty displays a 'Please enter a time!' warning message otherwise if completed then sets the Alarm time and a message is displayed confirming that Alarm time. This value is read by the updateTime method each time it is called and if it matches the current digital time const set in that method then the playAlarm method is triggered.

**playAlarm**

This method triggers the alarm mp3 sound file. The audio tag initially has mute set true to comply with Browser policy and is set false when this method is called, and the file time is set to zero to play from the beginning. Also an animation is triggered that simulates the bells ringing and an alarm is ringing message that flashes is displayed to the user - these are CSS animations that are triggered when the classes are added to the DOM by this method.

**turnOffAlarm**

This method turns off the alarm (by setting to mute to true again). The classes that control the animation for the bells ringing and also the Alarm ringing flashing message are removed and a new Alarm is turned off message is displayed.

## How to use

Run the following commands in the root directory.

```bash

npm install

npm run build

npm run serve

```

After running the 'npm run serve' command your default browser will open up a new tab or window and you will see the Clock application load on localhost port 9000. It will display your computer or device's current time and render that on the clock. You can then set and alarm using the time field and Set Alarm button to test!

**ToDo**

The code could be improved by creating ES6 module components however that seemed a but over the top for this application, however I have broke the code up in a component style by separating the loaded HTML views and corresponding stylesheets and this could improved to also incorporate a functional style of component with javascript for that part of the UI.

In unsupported browsers, the time field control degrades gracefully to <input type="text">. This could be improved by using a polyfill to enable the time field to work in all browsers and also to add a validation check to ensure the time entered is in the correct format.

Some methods could be export functions imported in to the index.js file to keep the code more modular and easier to test, for exampled the setRotation method could be exported and imported in to the index.js file and tested in isolation.

The code could also incorporate Unit tests with ES6 class mocks in Jest to test each of the methods.
