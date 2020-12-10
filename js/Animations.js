

export class Animations{

    
    //input animation of  background and container (using GSAP)
    inputAnimation(bg, container, cls){

        //animation of bg
        const bgTimeline = gsap.timeline({
            onComplete:()=> bg.classList.remove(cls)
        });

        bgTimeline
             .set(bg, {opacity:0,})
             .to(bg, .3, {opacity:1})

        //animation of container 
        const contTimeline = gsap.timeline();

        contTimeline
             .set(container, {y:50, opacity:0})
             .to(container, .5, {delay: .2, y:0, opacity: 1})
    }

    //output animation of background and container (GSAP)
    outputAnimation=(bg, container, cls)=>{
            //animation of container 
            const contTimeline = gsap.timeline();
        
            contTimeline
                .to(container, .5, {delay: .4, y:50, opacity: 0})
        

            //animation of bg
            const bgTimeline = gsap.timeline({
                onComplete:()=> bg.classList.add(cls)
            });
        
            bgTimeline
                .to(bg, .3, {delay:1 ,opacity:0})

    }
}