//3d_rotate
import { Application } from 'https://unpkg.com/@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
//app.load('https://prod.spline.design/BHGEpdFDUhZGTXKY/scene.splinecode')
app.load('https://prod.spline.design/vKnksY5iAlghnD0L/scene.splinecode')

.then(()=>{
    let Group2 = app.findObjectByName("center")

    let rotate=app.findObjectByName('rotate');
    
    gsap.to(rotate.scale,{x:1,y:1,z:1})
    gsap.to(rotate.position,{x:0,y:-3000})
    gsap.timeline({
        scrollTrigger:{
            trigger: ".section1",
            start: "top top",
            end: "+=300%",
            scrub: 2,
            //pin:true,
        }})
        .to(rotate.rotation,{y: Math.PI * 6,x:0},0)
        .to(rotate.position,{x:0,y:3000},0)
        .to(rotate.scale,{x:2,y:2,z:2},0)
})

////////////////////////////////////
