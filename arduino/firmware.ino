// Include Libraries
#include "Arduino.h"
#include "DHT.h"
#include "SoilMoisture.h"
// Pin Definitions
#define DHT_PIN_DATA	2
#define SOILMOISTURE_PIN A9

// Global variables and defines

// object initialization
DHT dht(DHT_PIN_DATA);
//SoilMoisture soilMoisture_5v(SOILMOISTURE_5V_PIN_SIG);

const int dry = 840;
const int wet = 373;

void setup() 
{
    Serial.begin(9600); // Starts the serial communication
    while (!Serial) ; // wait for serial port to connect. Needed for native USB
    dht.begin();
}
void loop() 
{
    float dhtHumidity = dht.readHumidity(); 
    float dhtTempC = dht.readTempC();
    int soilMoistureVal = analogRead(SOILMOISTURE_PIN);
    int percentageSoil = map(soilMoistureVal,wet,dry,100,0);
    
    Serial.print(dhtHumidity);Serial.print(F("|"));
    Serial.print(dhtTempC);Serial.print(F("|"));
    Serial.println(percentageSoil);
    delay(1000);
}
