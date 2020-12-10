import {WorkWithHtml} from './WorkWithHtml.js';


export class SmileIcon extends WorkWithHtml{
    #href= './assets/sprite.svg#'
    #icon = this.get('[data-smile]');

    #reactions ={
        neutral: 'neutral',
        positive: 'positive',
        negative: 'negative',
    }

    //when user has made a good move
    happy(){
        this.#icon.setAttribute('href', `${this.#href}${this.#reactions.positive}`);
    }

    //when user has lost the game
    sad(){
        this.#icon.setAttribute('href', `${this.#href}${this.#reactions.negative}`);
    }

    //normal/neutral reaction (to restart positive or negative reaction)
    neutral(){
        this.#icon.setAttribute('href', `${this.#href}${this.#reactions.neutral}`);
    }
}