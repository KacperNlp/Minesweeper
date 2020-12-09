import {WorkWithHtml} from './WorkWithHtml.js';

export class Message extends WorkWithHtml{

    #html = new WorkWithHtml();

    //message container and background
    bg = this.#html.get('.message');
    container = this.#html.get('.message__cont');

    //message content
    btn = this.#html.get('.message__close')
    score = this.#html.get('.message__score')
    txt = this.#html.get('.message__txt')

    showMessage(result, score){
        this.btn.addEventListener('click', this.#closeMessage)
        this.#initTxt(result, score);//init content of message container
        this.#inputAnimation();//input animation of  background and container (using GSAP)
    }

    //init content of message container
    #initTxt(result, score){
        let text = '';
        let scoreCont = '';

        //if won
        if(result){
            text = 'You WON!';
            scoreCont = `Score: ${score + 500}`;
        }else{
            //if lost
            text = 'You LOST!';
            scoreCont = `Score: ${999 - score}`;
        }

        this.score.textContent = scoreCont;
        this.txt.textContent = text;
    }

    //input animation of  background and container (using GSAP)
    #inputAnimation(){

        //animation of bg
        const bgTimeline = gsap.timeline({
            onComplete:()=> this.bg.classList.remove('message--hidden')
        });

        bgTimeline
             .set(this.bg, {opacity:0,})
             .to(this.bg, .3, {opacity:1})

        //animation of container 
        const contTimeline = gsap.timeline();

        contTimeline
             .set(this.container, {y:50, opacity:0})
             .to(this.container, .5, {delay: .2, y:0, opacity: 1})
    }

    //close message (output animation)
    #closeMessage=()=>{
            //animation of container 
            const contTimeline = gsap.timeline();
        
            contTimeline
                .to(this.container, .5, {delay: .4, y:50, opacity: 0})
        

            //animation of bg
            const bgTimeline = gsap.timeline({
                onComplete:()=> this.bg.classList.add('message--hidden')
            });
        
            bgTimeline
                .to(this.bg, .3, {delay:1 ,opacity:0})

    }
}