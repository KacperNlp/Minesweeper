export class Settings{
    constructor(){
        this.difficulty =[{
            rows:7, 
            cols:9, 
            mines:10, 
            lvl:'easy'
        },{
            rows:18, 
            cols:16, 
            mines:40, 
            lvl:'normal'
        },{
            rows:101, 
            cols:99, 
            mines:99, 
            lvl:'normal'
        }];
    }
}