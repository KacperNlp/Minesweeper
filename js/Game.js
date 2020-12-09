import {Settings} from './Settings.js'
import {Cells} from './Cells.js'
import {Flags} from './Flags.js'

class Game extends Cells{
    constructor({panel,cellsCont}){
        super();
        //assign game/game panel to property 
        this.panel = panel;
        //cells container
        this.cellsCont = cellsCont;
    }

    //game values/numbers of mines, cols, rows
    #mines;
    #rows;
    #cols;

    //classes
    #settings = new Settings();
    //number of flags
    #flags;

    //game result
    #gameIsFinished = false;

    //init animation and 
    start(){
        this.#gamePanelFadeIn();
        this.#startGame();
    }

    //when site is loaded, game panel will fade in/apper
    #gamePanelFadeIn(){
        const panelFade = gsap.timeline();//set timeline

        //animation on gsap
        panelFade
               .set(this.panel, {y:100, opacity:0})
               .to(this.panel, .2, {y:50, opacity:0})
               .to(this.panel, .5, {y:0, opacity:1});
    }

    //start new game
    #startGame(rows = this.#settings.difficulty[0].rows, cols = this.#settings.difficulty[0].cols, mines = this.#settings.difficulty[0].mines){

        //set css variables to set the width and height of the game panel
        document.documentElement.style.setProperty('--cols', cols);
        document.documentElement.style.setProperty('--rows', rows);

        //set game numbers of mines, cols and rows in global props
        this.#mines = mines;
        this.#cols = cols;
        this.#rows = rows;

        //set class of flags
        this.#flags = new Flags(mines);

        //create cells
        this.generateCells(this.cellsCont, rows, cols, mines)

        this.flags = this.#flags;//set number on flags form 

        //event for all cells
        this.addEvent(rows, cols);
    }

    //event listener for all cells
    addEvent(rows, cols){

        //loop of rows
        for(let row = 0; row < rows; row++){
            //loop of cols
            for(let col = 0; col < cols; col++){
                this.cells[row][col].cell.addEventListener('click', this.eventOfCell);//show what is under the cell
                this.cells[row][col].cell.addEventListener('contextmenu', this.setFlag);//set flag on cell
            }
        }
    }

    //checks that this cell has a mine
    eventOfCell=(e)=>{
        //cell id
        const rowId = parseInt(e.target.getAttribute('data-x'));
        const colId = parseInt(e.target.getAttribute('data-y'));

        const cell = this.cells[rowId][colId];

        const hasMine = cell.showCell();//this variable will have true or false 

        //if hasMine has the truth (hasMine == true) it's means the cell has a mine
        if(hasMine) this.mineExploded();
    }

    //when mine exploded, then show all cells with mines
    mineExploded(){
        //show cells with mines
        for(let row = 0; row < this.#rows; row++){
            //loop of cols
            for(let col = 0; col < this.#cols; col++){
                const cell = this.cells[row][col];
                if(cell.hasMine){
                    cell.showCell();
                }
            }
        }

        //game result, in this situation it's loss
        this.#gameOver(false);
    }

    //remove event linctenr form cells
    #removeEventListener(){
        //loop of rows
        for(let row = 0; row < this.#rows; row++){
            //loop of cols
            for(let col = 0; col < this.#cols; col++){
                this.cells[row][col].cell.removeEventListener('click', this.eventOfCell);//remove event with showing what is under cell
                this.cells[row][col].cell.removeEventListener('contextmenu', this.setFlag);//remove event with settings flags
            }
        }
    }

    //game over
    #gameOver(result){
        //remove event listener
        this.#removeEventListener();

        if(!result) console.log('przegrałeś!')
    }
}

const game = new Game({
    panel: document.getElementById('game'),
    cellsCont: document.getElementById('cells-cont')
})

game.start();