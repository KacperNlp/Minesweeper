import {WorkWithHtml} from './WorkWithHtml.js'

export class Timer{
    #html = new WorkWithHtml();
    //time na timer
    time = 999;//number of seconds
    timer;//this property is for clearInterval when time will finish

    timeConteinr = this.#html.id('time')

    startTimer(){
        this.timeConteinr.textContent = this.time
        this.timer = setInterval(()=>{ 
            if(!this.time) return this.stopTimer(); //when time is up clearInterval (stop setInterval)
            this.time--;
            this.timeConteinr.textContent = this.time;
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.timer);
    }
}