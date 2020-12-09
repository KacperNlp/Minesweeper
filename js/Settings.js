export class Settings{
    constructor(){
        this.difficulty =[{
            rows:8, 
            cols:9, 
            mines:10, 
            lvl:'easy'
        },{
            rows:15, 
            cols:15, 
            mines:40, 
            lvl:'normal'
        },{
            rows:25, 
            cols:25, 
            mines:99, 
            lvl:'normal'
        }];
    }
}