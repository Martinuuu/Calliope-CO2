def SendDataToThingsspeak():
    grove.send_to_think_speak("E3RDBHUAAU95D7XG",
        SCD30.read_temperature(),
        SCD30.read_humidity(),
        SCD30.read_co2(),
        0,
        0,
        0,
        0,
        0)
def CheckWifi():
    if grove.wifi_ok():
        basic.set_led_color(0x00ff00)
    else:
        basic.set_led_color(0xff0000)
b = 0
g = 0
r = 0
strip = neopixel.create(DigitalPin.P1, 12, NeoPixelMode.RGB)
strip.set_brightness(255)
SCD30.set_calibration400ppm()
strip.show_rainbow(1, 360)
music.play_melody("C E G B C5 C5 C5 C5 ", 226)
grove.setup_wifi(SerialPin.C17,
    SerialPin.C16,
    BaudRate.BAUD_RATE115200,
    "FRITZ!Box 7530 KC",
    "75111391888161950751")

def on_forever():
    global r, g, b
    for Index in range(13):
        r = randint(0, 255)
        g = randint(0, 255)
        b = randint(0, 255)
        strip.set_pixel_color(Index, neopixel.rgb(r, g, b))
        strip.show()
        basic.pause(500)
        strip.set_pixel_color(Index, neopixel.colors(NeoPixelColors.BLACK))
basic.forever(on_forever)

def on_in_background():
    CheckWifi()
    SendDataToThingsspeak()
control.in_background(on_in_background)
