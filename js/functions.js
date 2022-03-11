// make stopwatch object
function Stopwatch(elem) {
    this.running = false;
    this.elem = elem;
    this.reset();
    this.print(this.times);
}
Stopwatch.prototype.print = function(times) {
    this.elem.innerHTML = this.format(times);
};
Stopwatch.prototype.format = function(times) {
    return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
};
Stopwatch.prototype.start = function() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(function() {
            this.step();
        }.bind(this), 10);
    }
};
Stopwatch.prototype.step = function() {
    if (!this.running) return;
    this.calculate();
    this.print(this.times);
};
Stopwatch.prototype.calculate = function() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
    }
};
Stopwatch.prototype.stop = function() {
    this.running = false;
    clearInterval(this.watch);
};
Stopwatch.prototype.reset = function() {
    this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    };
    this.print(this.times);
    document.getElementById("start_stop").innerHTML = "Start";
    if (this.running) {
        this.stop();
    }
};
Stopwatch.prototype.start_stop = function() {
    if (this.running) {
        this.stop();
        document.getElementById("start_stop").innerHTML = "Start";
    } else {
        this.start();
        document.getElementById("start_stop").innerHTML = "Stop";
    }
};
// helper functions
function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
// create stopwatch object
var stopwatch = new Stopwatch(document.querySelector('#stopwatch'));
// buttons
document.querySelector('#start_stop').addEventListener('click', function() {
    stopwatch.start_stop();
});
document.querySelector('#reset').addEventListener('click', function() {
    stopwatch.reset();
});