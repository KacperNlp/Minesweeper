import {Settigns} from './Settings.js'
import {Cell} from './Cell.js'

class Game{
    constructor({panel}){
        //assign game/game panel to property 
        this.panel = panel;
    }

    //classes
    #settings = new Settigns();
    #cell = new Cell();

    //init animation and 
    start(){
        this.#gamePanelFadeIn();
        this.#startGame();
    }

    //when site is loaded, game panel will fade in/apper
    #gamePanelFadeIn(){
        const panelFade = gsap.timeline();

        panelFade
               .set(this.panel, {y:100, opacity:0})
               .to(this.panel, .2, {y:50, opacity:0})
               .to(this.panel, .5, {y:0, opacity:1});
    }

    //start new game
    #startGame(){
        //create cells
        
    }
}

const game = new Game({
    panel: document.getElementById('game'),
})

game.start();