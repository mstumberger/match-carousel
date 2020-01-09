export default class Timer {
    constructor(callback, time) {
        this.callback = callback;
        this.time = time;
        this.timerObj = setInterval(callback, time);
    }

    stop = () => {
        if (this.timerObj) {
            clearInterval(this.timerObj);
            this.timerObj = null;
        }
        return this;
    };

    start = () => {
        if (!this.timerObj) {
            this.stop();
            this.timerObj = setInterval(this.callback, this.time);
        }
        return this;
    };

    reset = (newT = this.time) => {
        this.time = newT;
        return this.stop().start();
    };
}
