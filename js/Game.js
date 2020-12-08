import {Settings} from './Settings.js'
import {Cells} from './Cells.js'

class Game{
    constructor({panel,cellsCont}){
        //assign game/game panel to property 
        this.panel = panel;
        //cells container
        this.cellsCont = cellsCont;
    }

    //classes
    #settings = new Settings();
    #cells = new Cells();

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
        this.#cells.generateCells(this.cellsCont)
        //event for all cells
        this.#cells.addEvent();
    }
}

const game = new Game({
    panel: document.getElementById('game'),
    cellsCont: document.getElementById('cells-cont')
})

game.start();