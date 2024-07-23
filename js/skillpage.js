gsap.registerPlugin(MotionPathPlugin)

let path1 = document.querySelector('.theLine');
let path1Length = path1.getTotalLength();
//console.log(path1Length)

path1.style.strokeDasharray = path1Length;
path1.style.strokeDashoffset = path1Length;


let pulses = gsap.timeline({
    defaults: {
        duration: 0.05,
        autoAlpha: 1,
        //scale: 2,
        transformOrigin: "center",
        ease: "elastic.out(1,0.3)",
    }
})
.to("#illust,.text1", {}, 0.06)
.to("#photoshop,.text2", {}, 0.11)
.to("#indesign,.text3", {}, 0.15)
.to("#aftereffect,.text4", {}, 0.18)
.to("#premierepro,.text5", {}, 0.22)
.to("#html,.text6", {}, 0.27)
.to("#css,.text7", {}, 0.33)
.to("#javasc,.text8", {}, 0.39)
.to("#scss,.text9", {}, 0.45)
.to("#php,.text10", {}, 0.50)
.to("#react,.text11", {}, 0.56)
.to("#github,.text12", {}, 0.67)


let main = gsap.timeline({
    defaults: {
        duration: 1
    },
    scrollTrigger: {
        trigger: '#svg',
        start: "top center",
        end: "+=1500",
        scrub: 1.9,
        onUpdate: function(self) {
            let progress = self.progress;
            //console.log(progress);
            gsap.to("#svgWrap",{
                xPercent:-(progress * 80)
            })
        }
    },
   
})
.to("#endpoint", {
    duration: 0.01,
    autoAlpha: 1  //opacity, visibility
})
.to(path1, {
    strokeDashoffset: 0
},"ball")
.to("#endpoint", {
    motionPath: {
        path: ".theLine",//path연결
        align: ".theLine",
        alignOrigin: [0.5, 0.5],
    }
},"ball")
.add(pulses,0)// timeline을 연결하는 방법  0 타임라인의 시작지점


// function animationUpdate(){
//     console.log(this.progress())
// }