import {Settings} from './Settings.js';
import {Cells} from './Cells.js';
import {Flags} from './Flags.js';
import {Timer} from './Timer.js';

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
    #timer = new Timer();
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
        //start timer
        this.#timer.startTimer();

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
                this.cells[row][col].cell.addEventListener('click', this.clickOnCell);//show what is under the cell
                this.cells[row][col].cell.addEventListener('contextmenu', this.setFlag);//set flag on cell
            }
        }
    }

    //get event target
    clickOnCell=(e)=>{
        //cell id
        const rowId = parseInt(e.target.getAttribute('data-x'));
        const colId = parseInt(e.target.getAttribute('data-y'));

        const cell = this.cells[rowId][colId];

        this.#checksCell(cell)

    }

    //checks that this cell has a mine
    #checksCell(cell){
        const hasMine = cell.showCell();//this variable will have true or false 

        //if hasMine has the truth (hasMine == true) it's means the cell has a mine
        if(hasMine) return this.#mineExploded();

        //this function checks if cells around cell of the event have mines
        this.#aroundCells(cell.x, cell.y);
    }


    //when mine exploded, then show all cells with mines
    #mineExploded(){
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
                this.cells[row][col].cell.removeEventListener('click', this.clickOnCell);//remove event with showing what is under cell
                this.cells[row][col].cell.removeEventListener('contextmenu', this.setFlag);//remove event with settings flags
            }
        }
    }

    //this function checks if cells around cell of the event have mines
    #aroundCells(rowId, colId){
        //number of mines around event cell
        let minesAround = 0;

        //all cells up to three rows at the top, bottom and on the same row where is event cell 
        for(let row = Math.max(rowId - 1, 0); row <= Math.min(rowId + 1, this.cells.length - 1); row++){
            //all cells up to three cols at the left, right and on the same col where is event cell 
            for(let col = Math.max(colId - 1, 0); col<= Math.min(colId + 1, this.cells[row].length - 1); col++){
                    const cell = this.cells[row][col];
                    if(cell.hasMine) minesAround++;
            }
        }

        if(!!minesAround){
            //get event cell
            const cell  = this.cells[rowId][colId].cell;
            //add color of font by number of mines around event cell 
            cell.classList.add(`cell--${minesAround}`);
            cell.classList.add(`cell--weight`);

            //show number of mines in cell
            cell.textContent = minesAround;

            return;
        }else if(!minesAround){
            //if cells around event cell haven't mines, show them all
            for(let row = Math.max(rowId - 1, 0); row <= Math.min(rowId + 1, this.cells.length - 1); row++){
                //all cells up to three cols at the left, right and on the same col where is event cell 
                for(let col = Math.max(colId - 1, 0); col<= Math.min(colId + 1, this.cells[row].length - 1); col++){
                        if(!(col === colId && row === rowId) && !this.cells[row][col].isShown){
                             this.#checksCell(this.cells[row][col])
                        }
                }
            }
        }
    }

    //game over
    #gameOver(result){
        //remove event listener
        this.#removeEventListener();
        this.#timer.stopTimer();

        if(!result) console.log('przegrałeś!')
    }
}

const game = new Game({
    panel: document.getElementById('game'),
    cellsCont: document.getElementById('cells-cont')
})

game.start();