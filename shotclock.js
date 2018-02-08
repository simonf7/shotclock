// shotclock.js

function ShotClock(canvas_id)
{
    this.timerSeconds = 25; // how many seconds the timer is for

    this.autoScale = false; // automatically scale to screen

    this.audio_id = null;   // id of the html5 audio to play

    // default settings for the display
    this.pattern         = "##";
    this.displayAngle    = 0;
    this.digitHeight     = 17;
    this.digitWidth      = 15;
    this.digitDistance   = 3.6;
    this.segmentWidth    = 3;
    this.segmentDistance = 0.3;
    this.segmentCount    = 7;
    this.cornerType      = 3;
    this.colorOn         = "#ff2c0f";
    this.colorOff        = "#211002";

    // private variables
    var self = this;
    this.display = null;
    this.resetTime = null;
    this.canvas_id = canvas_id;
    this.canvas = null;
    this.context = null;
    this.remaining = null;
    this.timer_id = null;

    // set up function
    this.setup = function()
    {
        // initialise the canvas
        this.canvas                 = document.getElementById(this.canvas_id);
        this.context                = this.canvas.getContext('2d');
        this.resize();
        
        // setup the timer
        this.resetTime              = (this.timerSeconds * 10) + 9;
        this.remaining              = this.resetTime;
        this.timer_id               = null;

        // setup the segment display
        this.display = new SegmentDisplay(this.canvas_id);
        this.display.pattern         = this.pattern;
        this.display.displayAngle    = this.displayAngle;
        this.display.digitHeight     = this.digitHeight;
        this.display.digitWidth      = this.digitWidth;
        this.display.digitDistance   = this.digitDistance;
        this.display.segmentWidth    = this.segmentWidth;
        this.display.segmentDistance = this.segmentDistance;
        this.display.segmentCount    = this.segmentCount;
        this.display.cornerType      = this.cornerType;
        this.display.colorOn         = this.colorOn;
        this.display.colorOff        = this.colorOff;
        this.display.draw();     
    
        this.display.setValue(this.displayValue());
    }

    // resize the canvas
    this.resize = function()
    {
        // if set to automatically scale
        if (this.autoscale) {
            this.context.canvas.width = window.innerWidth - 1;
            this.context.canvas.height = window.innerHeight - 1;
        }
    }

    // take the remaining time and create the display value
    this.displayValue = function()
    {
        var strCounter = ' ' + parseInt(this.remaining / 10).toString();

        return strCounter.substr(strCounter.length - 2);
    }

    // handle the 1/10 second event
    this.intHandler = function()
    {
        if (self.remaining > 10) {
            self.remaining -= 1;
            self.display.setValue(self.displayValue());
        }
        else {
            self.display.setValue('--');
    
            // play buzzer once
            if (self.remaining > 0 && self.audio_id != null) {
                document.getElementById(self.audio_id).play();
            }
    
            self.remaining = 0;
        }
    }

    // increase the counter
    this.increase = function()
    {
        self.remaining += 10;
        if (self.remaining > self.resetTime) {
            self.remaining = self.resetTime;
        }

        self.intHandler();
    }

    // decrease the counter
    this.decrease = function()
    {
        self.remaining -= 10;
        if (self.remaining < 10) {
            self.remaining = 9;
        }

        self.intHandler();
    }

    // start/stop the timer
    this.startStop = function()
    {
        // timer running
        if (self.timer_id != null) {
            clearInterval(self.timer_id);
            self.timer_id = null;
        }
        else {
            self.timer_id = setInterval(self.intHandler, 100);
        }
    }

    // reset the timer
    this.reset = function()
    {
        self.remaining = self.resetTime;

        self.intHandler();
    }
}

