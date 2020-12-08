import {WorkWithHtml} from './WorkWithHtml.js'

export class Flags extends WorkWithHtml{
    constructor(flags){
        //WorkWithHtml props
        super();

        this.maxNumberOfFlags = flags;//max number of flags
        this.numberOfFlags = flags;//current number of flags

        //container (get HTML element)
        this.container = this.id('flags');
        //set txt in container 
        this.container.textContent = flags;
    }

    changeValueOfFlags(flagWasSet){
        if(flagWasSet==null){ //if user sets all flags an tries to set new just return null
            return null;
        }

        if(flagWasSet && this.numberOfFlags) this.numberOfFlags--;//if user sets flag it will decrease numberOfFlag

        else if(this.numberOfFlags <= this.maxNumberOfFlags && !flagWasSet) this.numberOfFlags++; //else if user delete flag from cell, it will increase numberOfFlags

        this.container.textContent = this.numberOfFlags; //the text content of container has been updated after the value of numberOfFlags has changed
    }
}