import {WorkWithHtml} from './WorkWithHtml.js';
import {Animations} from './Animations.js';

export class Message extends WorkWithHtml{
    //set animations class
    #animations = new Animations();

    //message container and background
    bg = this.get('.message');
    container = this.get('.message__cont');

    //message content
    btn = this.get('[data-message]')
    score = this.get('.message__score')
    txt = this.get('.message__txt')

    showMessage(result, score){
        this.btn.addEventListener('click', ()=> this.#animations.outputAnimation(this.bg, this.container, 'message--hidden'))
        this.#initTxt(result, score);//init content of message container
        this.#animations.inputAnimation(this.bg, this.container, 'message--hidden');//input animation of  background and container (using GSAP)
    }

    //init content of message container
    #initTxt(result, score){
        let text = '';
        let scoreCont = '';

        //if won
        if(result){
            text = 'You WON!';
            scoreCont = `Score: ${score + 500}`;
        }else{
            //if lost
            text = 'You LOST!';
            scoreCont = `Score: ${999 - score}`;
        }

        //init txt and score in HTML
        this.score.textContent = scoreCont;
        this.txt.textContent = text;
    }
}