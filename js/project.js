//section4 - carousel
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let carousel = document.querySelector('.carousel');
let items = carousel.querySelectorAll('.carousel .list .project-item');
let indicator = carousel.querySelector('.indicators');
let dots = indicator.querySelectorAll('.indicators ul li');

let active = 0;
let firstPosition = 0;
let lastPosition = items.length - 1;
let autoPlay;

const startAutoPlay = () => {
    clearInterval(autoPlay); 
    autoPlay = setInterval(() => {
        nextBtn.click();
    }, 5000);
}
startAutoPlay();

const setSlider = () => {
    let itemActiveOld = carousel.querySelector('.list .project-item.active');
    if(itemActiveOld) itemActiveOld.classList.remove('active');
    items[active].classList.add('active');

    let dotActiveOld = indicator.querySelector('.indicators ul li.active');
    if(dotActiveOld) dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    indicator.querySelector('.number').innerText = '0' + (active + 1);
    startAutoPlay();
}
setSlider();

nextBtn.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1;
    carousel.style.setProperty('--calculation', 1);
    setSlider();
}
prev.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    carousel.style.setProperty('--calculation', -1);
    setSlider();
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        nextBtn.click();
    }, 5000);
}
dots.forEach((item, position) => {
    item.onclick = () => {
        active = position;
        setSlider();
    }
})


/////////////////////////////////////////////////////
//big_circle animation
gsap.timeline({
  scrollTrigger:{
      trigger:'.section5',
      start:"top 50%",
      end:"30% top",//내 영역의 30%가 화면의 top에 닿였을 때 끝낼거야
      scrub:1,//srub:1=true. 2로 바뀌면 애니메이션의 효과가 부드러워짐
      //markers:true
  }
})
.fromTo(".big_circle",{width:0, height:0,top:"3%"},{width:2500, height:2500,top:"30%"})

//textBox
gsap.timeline({
    scrollTrigger:{
        trigger:'.section5 .section5-inner',
        start:"top 80%",
        end:"100% 80%",
        scrub:1,
        //markers:true
    }
})
.fromTo(".section5-inner",{top:"50%",opacity:0},{top:"40%",opacity:1})

/////////////////////////////////////////////////////
// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)


    //Mouse cursor
    gsap.set(".ball",{xPercent:-50, yPercent:-50})
    let ball=document.querySelector(".ball");
    let pos={x:window.innerWidth/2,
           y:window.innerHeight/2}
    let mouse={x:pos.x,y:pos.y};
    let speed=0.08;
    
    let xSet=gsap.quickSetter(ball,"x","px");
    let ySet=gsap.quickSetter(ball,"y","px");

    window.addEventListener("mousemove",function(e){
       //console.log(e)
       mouse.x=e.x;
       mouse.y=e.y;

    })

    gsap.ticker.add(function(){
       let dt=1.0 - Math.pow((1.0 - speed),gsap.ticker.deltaRatio())
       pos.x +=(mouse.x - pos.x)*dt;
       pos.y +=(mouse.y - pos.y)*dt;
       xSet(pos.x);
       ySet(pos.y)
    })



//////////////////////////////////////////////////////
//section5 - project figma mobile
let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section5",
      start: "0% 50%",
      end: "40% 50%",
      //markers: true,
      scrub: 1,
    },
});
tl.to("#imgthree", 
{
    bottom: "-15vh",
})
.to("#imgtwo, #imgfour", 
{
    bottom: "-20vh",
})
.to("#imgone, #imgfive", 
{
    bottom: "-30vh",
});

//////////////////////////////////////////////////////
//section5 - buttom
gsap.to(".bottom-box .ring", {
    scrollTrigger: {
        trigger: ".bottom-box",
        start: "top center",
        end: "bottom 20%",
        scrub: true,
    },
    width: "100%",
    stagger: 0.1,
    
});
gsap.to(".svg-one", {
    scrollTrigger: {
        trigger: ".bottom-box",
        start: "top center",
        end: "bottom 20%",
        scrub: true,
    },
    right: "-10%",
    top: "50px",
    width: "80%"
});
gsap.to(".svg-two", {
    scrollTrigger: {
        trigger: ".bottom-box",
        start: "top center",
        end: "bottom 20%",
        scrub: true,
    },
    top: "117px",
    right: "-4%",
    opacity: 1
});


//////////////////////////////////////////////////////
    //ball appear
    gsap.to(ball, {
        scrollTrigger: {
            x: 300,
            duration: 2,
            repeat: -1, // 무한 반복
            onUpdate: (self) => {
                // 스크롤 트리거 영역 안에 있을 때
                if (self.isActive) {
                    ball.style.display = "block"; // 나타나게 함
                } else {
                    ball.style.display = "none"; // 사라지게 함
                }
            },
            //markers: true,
            scrub: 1,
            onEnter: () => {
                gsap.to(ball, { duration: 1, opacity: 1, scale: 1 });// 나타날 때
                ball.style.display = "block"; // 스크롤 영역에 들어왔을 때 나타나게 함
            },
            onLeaveBack: () => {
                gsap.to(ball, { duration: 1, opacity: 0, scale: 0 }); // 사라질 때
                ball.style.display = "none"; // 스크롤 영역에서 벗어났을 때 사라지게 함
            }
        }
    });
    
    // ball 초기 상태
    ball.style.display = "none";
    ball.style.opacity = "0";
    ball.style.transform = "scale(0)";


    //글자 애니
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
    let interval = null;
    let list = document.querySelectorAll(".anime-list li")
    list.forEach(function (el) {
        
        el.addEventListener("mouseenter", function (event) {
            let target_element = event.target.querySelector("h2")
            let iteration = 0;
            let interval = setInterval(function () {
                target_element.innerText = target_element.innerText
                    .split("") //배열이 만들어짐
                    .map(function (letter, index) { //위의 배열의 각각의item의 할일
                        if (index < iteration) {
                            return target_element.dataset.value[index]
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join(""); //글자화
                //console.log(target_element.innerText.split(""))


                if (iteration >= target_element.dataset.value.length) {
                    clearInterval(interval)
                }

                iteration += 1 / 3; //iteration = iteration + 1/3
            }, 20)

        })
    })
});

//////////////////////////////////////////////////////
//section6 - card

Vue.config.devtools = true;

Vue.component("card", {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ["dataImage"],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      };
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      };
    }
  },

  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: "#app"
});