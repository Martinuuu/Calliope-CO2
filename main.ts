esp8266.setupWifi(
SerialPin.C17,
SerialPin.C16,
BaudRate.BaudRate115200,
"BYOD-WLAN",
"ESH_$1_Erdgeschoss"
)
basic.forever(function () {
    if (esp8266.wifiOK()) {
        basic.setLedColor(0x00ff00)
    } else {
        basic.setLedColor(0xff0000)
    }
    esp8266.sendToThinkSpeak(
    "V2L5Y365T1VLJ6B8",
    0,
    0,
    0,
    SCD30.readCO2()
    )
})
