int xyzPins[] = {32, 26, 21};   //x,y,z pins
void setup() {
  Serial.begin(115200);
  pinMode(xyzPins[2], INPUT_PULLUP);  //z axis is a button.
  pinMode(15, INPUT_PULLUP);  //button.
}

void loop() {
  int xVal = analogRead(xyzPins[0]);
  int yVal = analogRead(xyzPins[1]);
  int zVal = digitalRead(xyzPins[2]);
  Serial.printf("%d %d %d\n", xVal, yVal, zVal);
  int buttonVal = digitalRead(15);
  Serial.print(buttonVal);
  Serial.print('\n');
  delay(100);
}