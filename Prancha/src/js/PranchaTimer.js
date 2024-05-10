class PranchaTimer {
    constructor(timespan, callback) {
        this.timespan = timespan;
        this.callback = callback;
        this.cancellation = false;
    }

    start() {
        this.cancellation = false;
        this.timer = setInterval(() => {
            if (this.cancellation) {
                clearInterval(this.timer);
                return;
            }
            this.callback();
        }, this.timespan);
    }

    stop() {
        this.cancellation = true;
    }
}