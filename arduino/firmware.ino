// Include Libraries
#include "Arduino.h"
#include "DHT.h"
#include "SoilMoisture.h"
// Pin Definitions
#define DHT_PIN_DATA	2
#define SOILMOISTURE_5V_PIN_SIG	A10

// Global variables and defines

// object initialization
DHT dht(DHT_PIN_DATA);
SoilMoisture soilMoisture_5v(SOILMOISTURE_5V_PIN_SIG);

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
    int soilMoistureVal = soilMoisture_5v.read();
    
    Serial.print(dhtHumidity);Serial.print(F("|"));
    Serial.print(dhtTempC);Serial.print(F("|"));
    Serial.println(soilMoistureVal);
    delay(2000);
    
}
