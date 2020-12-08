import {Settings} from './Settings.js';
import {Cell} from './Cell.js';

export class Cells{
    cells = []; //array of all cells

    //classes
    #settings = new Settings(); //implementation class Settings to get default difficulty of game

    //generate cells by two loops. first loop uses rows, the second uses cols
    generateCells(cont, rows = this.#settings.difficulty[0].rows, cols = this.#settings.difficulty[0].cols, mines = this.#settings.difficulty[0].mines){

        //fist loop (rows)
        for(let row = 0; row < rows; row++){
            //second loop (cols)
            for(let col = 0; col < cols; col++){
                const cell = new Cell(row, col); //create cell 
                cont.appendChild(cell.addToHtml());//append to Html
                this.cells.push(cell);//push cell to array of cells
            }
        }

        //add mines to cells
        this.#addMines(mines);

    }

    #addMines(mines){
        let numberOfMines = mines;

        //this loop runs until numberOfMines > 0;
        while(numberOfMines > 0){
            //draw random indef of cell
            const id = Math.floor(Math.random() * this.cells.length);
            
            //check that this cell doesn't have mine
            if(!this.cells[id].hasMine){
                //if it's true than add mine to this cell and decrease numberOfMines
                this.cells[id].hasMine = true;
                numberOfMines--;
            }
        }
    }

    //event listener for all cells
    addEvent(){
        this.cells.forEach(cell =>{
            cell.cell.addEventListener('click', cell.showCell)
        })
    }
}