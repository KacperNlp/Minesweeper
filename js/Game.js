import {Settings} from './Settings.js';
import {Cells} from './Cells.js';
import {Flags} from './Flags.js';
import {Timer} from './Timer.js';
import {WorkWithHtml} from './WorkWithHtml.js';
import {Message} from './Message.js';
import {OwnSettings} from './OwnSettings.js';
import {SmileIcon} from './SmileIcon.js';

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
    #html = new WorkWithHtml();
    #message = new Message();
    #ownSettings = new OwnSettings();
    #smileIcon = new SmileIcon();

    //number of flags
    #flags;
    #buttons = {
        easy: this.#html.get('[data-lvl="easy"]'),
        normal: this.#html.get('[data-lvl="normal"]'),
        hard: this.#html.get('[data-lvl="hard"]'),
        own: this.#html.get('[data-lvl="own"]'),
        restart: this.#html.get('[data-restart]'),
    }
    #checksTimer;

    //game result
    #cellsToUncovered;
    #uncoveredCells = 0;
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
        //reset reaction of icon
        this.#smileIcon.neutral();

        //this is for restart all settings when user dicide to start new game
        this.#restartAll();

        //set number of cells to uncovered
        this.#cellsToUncovered = (rows * cols) - mines;

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
        //checks the time if time is over the user has lost the game
        this.#checksTimer = setInterval(this.#timeIsOver, 1000);

        //create cells
        this.generateCells(this.cellsCont, rows, cols, mines)

        this.flags = this.#flags;//set number on flags form 

        //event for all cells
        this.#addEvent(rows, cols);

        //add event listeners for buttons in settings and one button on top (btn of restart)
        this.#eventForBtn();
    }

    //event listener for all cells
    #addEvent(rows, cols){

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
        //cell id (x/y or row/col)
        const rowId = parseInt(e.target.getAttribute('data-x'));
        const colId = parseInt(e.target.getAttribute('data-y'));

        //get cell
        const cell = this.cells[rowId][colId];

        //checks that this cell has a mine
        this.#checksCell(cell)

    }

    //checks that this cell has a mine
    #checksCell(cell){
        if(cell.isFlagged) return

        const hasMine = cell.showCell();//this variable will have true or false 

        //if hasMine has the truth (hasMine == true) it's means the cell has a mine
        if(hasMine) return this.#mineExploded();
        //increase number of discovered cells
        this.#uncoveredCells++;

        //if the player discovers all cells without mines, then the player wins
        if(this.#cellsToUncovered == this.#uncoveredCells && !this.#gameIsFinished) return this.#gameOver(true);

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
            //change icon reaction
            this.#smileIcon.happy();
            //after 0.5s change positive reaction to neutral
            setTimeout(()=> this.#smileIcon.neutral(), 500)
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

    //event for buttons in settings and one button on top
    #eventForBtn(){
        //easy
        this.#buttons.easy.addEventListener('click', this.#newGame)
        //normal
        this.#buttons.normal.addEventListener('click', this.#newGame)
        //hard
        this.#buttons.hard.addEventListener('click', this.#newGame)
        //own settings
        this.#buttons.own.addEventListener('click', this.#showSettings)
        //restart (the game will starts with the same difficulty lvl it had before)
        this.#buttons.restart.addEventListener('click', this.#newGame)
    }

    //function of starting a new game after the player clicks buttons at the bottom (easy, normal and hard without Own) or restart button (button at the top with smile icon)
    #newGame=(e)=>{

        //get the value of btn data-lvl attribute
        const btnValue = e.target.getAttribute('data-lvl')
        let lvl;  

        //if user click easy, normal or hard
        if(btnValue === 'easy' || btnValue === 'normal' || btnValue === 'hard'){

           //set settings by the value of btn data-lvl attribute 
           this.#settings.difficulty.forEach(dif =>{
               if(dif.lvl == btnValue) lvl = dif;
           })

        }else{
            //if user click restart, just set the same settings (settigns from old/previous game)
            lvl = {
                rows: this.#rows,
                cols: this.#cols,
                mines: this.#mines,
            }
        }
        //remove event listener from cells
        this.#removeEventListener();

        //start new game
        this.#startGame(lvl.rows, lvl.cols, lvl.mines);
    }

    ///function for Own button (this function let to set your own settings)
    #showSettings=()=>{
        this.#ownSettings.showForm();
        this.#ownSettings.submit.addEventListener('click', this.#eventOnSubmit)
    }

    //event on form button (submit)
    #eventOnSubmit=(e)=>{
        e.preventDefault();

        //check if values of form are correct if they are, get them and set in global props in #ownSettings
        this.#ownSettings.userSettings();

        //if user doesn't made any mistakes in settings, then the game will restart with new setting
        if(this.#ownSettings.settingsAreFine){
             //remove event listener from cells
             this.#removeEventListener();

             //remove event linstener on submit
             this.#ownSettings.submit.removeEventListener('click', this.#eventOnSubmit)
             //start new game
             this.#startGame(this.#ownSettings.rows, this.#ownSettings.cols, this.#ownSettings.mines);
        }
    }

    //checks the time if time is over the user has lost the game
    #timeIsOver=()=>{
        if(!this.#timer.time){
            this.#gameOver(false);
        }
        else null;
    }

    //game over
    #gameOver(result){

        //clear property which checks the Timer 
        clearInterval(this.#checksTimer);
        //remove event listener from cells
        this.#removeEventListener();
        //clearInterval - stop timer
        this.#timer.stopTimer();

        //show message
        if(!result){
            //change icon reaction to negative 
            this.#smileIcon.sad();
            this.#message.showMessage(result, this.#uncoveredCells)//if lost
        }
        else if(result){
            //change icon reaction to positive 
            this.#smileIcon.happy();
            this.#message.showMessage(result, this.#uncoveredCells)//if won
        }
    }

    #restartAll(){
        //restart timer 
        this.#timer.stopTimer();

        //restart number of uncovered/discovered cells
        this.#uncoveredCells = 0;

        //remove cells from game panel
        while(this.cellsCont.firstChild){
            this.cellsCont.removeChild(this.cellsCont.lastChild)
        }
    }
}

const game = new Game({
    panel: document.getElementById('game'),
    cellsCont: document.getElementById('cells-cont')
})

game.start();