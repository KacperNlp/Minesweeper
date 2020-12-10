import {WorkWithHtml} from './WorkWithHtml.js';
import {Animations} from './Animations.js';

export class OwnSettings extends WorkWithHtml{
    //set class of animations
    #animations = new Animations();

    //container and background
    #bg = this.get('.own-settings');
    #container = this.get('.own-settings__cont');
    #btnClose = this.get('[data-settings]');
    #warning = this.get('[data-warning]');
    settingsAreFine = false;

    //get inputs from own settings form
    #rowsInput = this.get('[data-rows]');
    #colsInput = this.get('[data-cols]');
    #minesInput = this.get('[data-mines]');
    submit = this.get('[data-submit-settings]');

    //rows, cols, mines taken from value of inputs
    rows = 0;
    cols = 0;
    mines = 0;

    //init form/input animation (and output if user click close btn)
    showForm(){
        //close settings
        this.#btnClose.addEventListener('click', ()=> this.#animations.outputAnimation(this.#bg, this.#container, 'own-settings--hidden'));
        //input animation of container
        this.#animations.inputAnimation(this.#bg, this.#container, 'own-settings--hidden');
    }

    //check and set user settings in global props if everything is alright
    userSettings(){
        //set flag to false
        this.settingsAreFine = false;
        //clean warning
        this.#warning.textContent = '';

        //get the number of rows
        const rows = this.#rowsInput.value;
        //get the number of cols
        const cols = this.#colsInput.value;
        //get the number of mines
        const mines = this.#minesInput.value;

        if(!mines) return this.#warning.textContent = 'One cell must have mine!';//if user doesn't set any mine
        else if(!cols) return this.#warning.textContent = 'You need to set min. one column!';//if user doesn't set any columns/cols
        else if(!rows) return this.#warning.textContent = 'You need to set min. one row!';//if user doesn't set any rows
        else if(rows < 1 || cols < 1 || mines < 1) return this.#warning.textContent = 'You cannot set negative numbers!';//if user doesn't set any rows
        else if(!(rows * cols - mines)) return this.#warning.textContent = 'One cell must be clean!'; //if mines are set in each cell
        else if(rows * cols < mines) return this.#warning.textContent = 'Mines cannot be more than cells!'; //when number of mines are greater than cells
        else if(rows == 'e' || cols == 'e' || mines == 'e') return this.#warning.textContent = 'You have to use numbers!'; //if user used 'e' in inputs 
        //if everything is alright
        else{
            this.rows = rows; //set number of rows in global property
            this.cols = cols;//set number of cols in global property
            this.mines = mines;//set number of mines in global property
            //set flag to true if it's fine
            this.settingsAreFine = true;
        }

        //if everything is okay/alright, hide form (output animation)
        return this.#animations.outputAnimation(this.#bg, this.#container, 'own-settings--hidden')
    }


}