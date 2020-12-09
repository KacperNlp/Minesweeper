import {Cell} from './Cell.js';

export class Cells{
    cells = []; //array of all cells

    flags; //in this property will be class of Flags from main class (Game)

    //generate cells by two loops. first loop uses rows, the second uses cols
    generateCells(cont, rows, cols, mines){
        const allCells = [];
        //fist loop (rows)
        for(let row = 0; row < rows; row++){
            //second loop (cols)
            const colArray = [];
            for(let col = 0; col < cols; col++){
                const cell = new Cell(row, col); //create cell 
                cont.appendChild(cell.addToHtml());//append to Html
                colArray.push(cell);//push cell to array of cells
            }
            allCells.push(colArray)//push array with one row to main array 
        }

        //assaign the main array of cells to global property this.cells
        this.cells = allCells;

        //add mines to cells
       this.#addMines(rows, cols, mines);

    }

    #addMines(rows, cols, mines){
        let numberOfMines = mines;

        //this loop runs until numberOfMines > 0;
        while(numberOfMines > 0){
            //position x of cell
            const row = Math.floor(Math.random() * rows);
            //position y of cell
            const col = Math.floor(Math.random() * cols);
            
            //check that this cell doesn't have mine
            if(!this.cells[row][col].hasMine){
                //if it's true than add mine to this cell and decrease numberOfMines
                this.cells[row][col].hasMine = true;
                numberOfMines--;
            }
        }
    }

    setFlag=(e)=>{
        
        e.preventDefault();

        //cell position on x (rows) and y (cols)
        const row = parseInt(e.target.getAttribute('data-x'));
        const col = parseInt(e.target.getAttribute('data-y'));

        //set a flag in cell
        const flagWasSet = this.cells[row][col].setFlag(this.flags.numberOfFlags); //return true or fals, this value is needed in function changeValueOfFlags to increment or decrement the value
        //increasing or decreasing the number of flags
        this.flags.changeValueOfFlags(flagWasSet)
    }
}