import {WorkWithHtml} from './WorkWithHtml.js';

export class Cell extends WorkWithHtml{
    constructor(x,y){
        super();
        //position on x and y
        this.x=x;
        this.y=y;
        //cell has mine or is flagged 
        this.hasMine = false;
        this.isFlagged = false;
        //element
        this.cell = this.create('div');
    }

    //append cell to HTML (cells container)
    addToHtml(){
        this.cell.classList.add('cell');
        return this.cell ;
    }

    //show what is under cell
    showCell=()=>{
        if(!this.hasMine){
            this.cell.classList.add('cell--show');
        }
    }
}