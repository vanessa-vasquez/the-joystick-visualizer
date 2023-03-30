let sprite;
let buttonVal;
let joystickX;
let joystickY;
let joystickZ;
let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "pink",
  "purple",
  "white",
  "black",
];
let randomColor;

function setup() {
  let c = new Canvas(windowWidth - 200, windowHeight - 200);

  c.parent("sketch-holder");
  c.style("border-radius", "10px");

  background(244);

  randomColor = colors[~~(Math.random() * (colors.length - 1))];
}

function draw() {
  fill(randomColor);

  if (buttonVal && buttonVal == "0") {
    clear();
    background(244);
  }

  console.log("joystick Z", joystickZ);

  if (joystickZ && joystickZ == "0") {
    randomColor = colors[~~(Math.random() * (colors.length - 1))];
  }

  if (joystickX && joystickY) {
    ellipse(
      map(joystickX, 0, 4095, 0, windowWidth - 200),
      map(joystickY, 0, 4095, 0, windowHeight - 200),
      30,
      30
    );
  }
}

async function initializeSerial() {
  // Prompt user to select any serial port.
  var port = await navigator.serial.requestPort();
  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200 });
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;
  reader = inputStream.getReader();
  readLoop();
}

async function readLoop() {
  counterVal = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      console.log("closing connection");
      reader.releaseLock();
      break;
    }
    if (value) {
      let values = value.split("\n");

      let joystickValues = values[0].split(" ");
      joystickX = parseInt(joystickValues[0]);
      joystickY = parseInt(joystickValues[1]);
      joystickZ = joystickValues[2];
      buttonVal = values[1];
    }
  }
}

$(document).ready(function () {
  $("button").click(function () {
    initializeSerial();
  });
});
