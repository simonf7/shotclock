# shotclock

Web-based Shotclock

Simple shotclock using SegmentDisplay for the LCD style display.

Uses a canvas based segment display from http://www.3quarks.com/en/SegmentDisplay/

By default the number of seconds for the countdown is 25. The number of seconds
can be supplied after the # in the URL, i.e. /index.htm#30 will make the shotclock
countdown from 30 seconds.

The page now uses UpUp (https://www.talater.com/upup/) to provide a compatible PWA
service worker allowing the shotclock to be used offline.

Demo - https://simonf7.github.io/shotclock/
