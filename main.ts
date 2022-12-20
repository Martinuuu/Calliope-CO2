function SendDataToThingsspeak () {
    grove.sendToThinkSpeak(
    "E3RDBHUAAU95D7XG",
    SCD30.readTemperature(),
    SCD30.readHumidity(),
    SCD30.readCO2(),
    0,
    0,
    0,
    0,
    0
    )
}
function CheckWifi () {
    if (grove.wifiOK()) {
        basic.setLedColor(0x00ff00)
    } else {
        basic.setLedColor(0xff0000)
    }
}
let strip = neopixel.create(DigitalPin.P0, 12, NeoPixelMode.RGB)
strip.setBrightness(20)
SCD30.setCalibration400ppm()
grove.setupWifi(
SerialPin.C17,
SerialPin.C16,
BaudRate.BaudRate115200,
"FRITZ!Box 7530 KC",
"75111391888161950751"
)
basic.forever(function () {
    for (let Index = 0; Index <= SCD30.readCO2() / 100; Index++) {
        strip.setPixelColor(Index, neopixel.colors(NeoPixelColors.Green))
        strip.show()
    }
})
control.inBackground(function () {
    CheckWifi()
    SendDataToThingsspeak()
})
