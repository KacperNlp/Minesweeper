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

    //set flag
    setFlag(flags){
        if(!flags && !this.isFlagged) return null; //if numberOfFlags == 0 and user tries to set a flag, just doesn't do anything  

        //init flag (add/remove icon)
        this.cell.classList.toggle('cell--flag')
        this.cell.classList.toggle('fas')
        this.cell.classList.toggle('fa-flag')

        if(this.isFlagged){//user removed flag in cell
            //change value of property
            this.isFlagged = false;
            return false;
        }else if(!this.isFlagged && !!flags){ //if cell don't have flag and the number of flags is more than 0, then you can set flag on this cell /user add flag to cell
            //change value of property
            this.isFlagged = true;
            return true;
        }
    }
}