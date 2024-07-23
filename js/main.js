gsap.registerPlugin(ScrollTrigger)

function lenis() {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    //console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}
lenis();

///////////////////////////////////////
///////////////////////////////////////
//preload
let preloadContainer = document.querySelector("#progress");
let progressBar = document.querySelector(".progress-bar");
let progressText = document.querySelector(".progress-text");
let imgLoaded = 0;
let imgTotal = 1000; //로드 시간을 강제로 줌
let currentt = 0;
let progressTimer;
let topValue;//검은색 바탕을 위로 올림

progressTimer = setInterval(updateProgress,1000/60)//1초를 60으로 나눔

function updateProgress(){
  imgLoaded ++;
  //console.log(imgLoaded)
  let target = (imgLoaded/imgTotal)*100 //percentage(%)화 시키기 위해 100을 곱함
  
  currentt += (target - currentt)*0.01;
  //해석 : current = current + (target - current)*0.01;
  progressBar.style.width = currentt + "%";
  progressText.innerHTML = Math.floor(currentt) + "%";
  //Math.ceil : 소수점 이하를 무조건 올림
  //Math.floor : 소수점 이하를 무조건 버림/내림

  //console.log(currentt)

  if(currentt >99.9){
    clearInterval(progressTimer)
    preloadContainer.classList.add("progress-complete")
    //퍼센트가 다 차면 위로 css에서 흰색으로 바뀌도록 해놓음
    //❗class를 부르는 태그를 이미 썼으므로 .을 찍으면 안됨❗
    progressBar.style.width = "100%"

    gsap.to(preloadContainer,{
      duration : 1,
      yPercent : -100,
      ease : "none"
    })
  }
}

/////////////////////////////
//전체화면 애니, 각 영역으로 이동, 메뉴
let scrollActive = (current)=>{
  let scrollYY = window.scrollY //window생략 가능
  let sections = document.querySelectorAll(".section[id]")
  //.querySelectorAll(".section[id]") --> section 태그 중 id 속성이 있는 것을 부름

  sections.forEach((current)=>{
      let sectionHeight = current.offsetHeight; //각 section의 높이값
      let sectionTop = current.offetTop - 80; //각 section의 전체문서에서의 top 위치
      //✨offset : 각자 자기의 영역의 top값을 말함 화면의 top값에서 해당 section top이 얼마나 떨어져 있는지를 구한다.
      //- 80 을 해준 이유 : 1 -> 2 section이 있을 때, 스크롤을 내리면 바로 2section으로 넘어 가는것이 아니라 1이 보이면서 2가 조금 올라왔을 때 2section으로 넘어가게 하도록 값을 조정함

      let sectionId = current.getAttribute("id")//id 속성값을 불러옴 
      console.log(sectionId)

      let sectionClass = document.querySelector(`.nav_menu .mg-btn_rounded-text-copy>a[href*="${sectionId}"]`)
      console.log(sectionClass)

      if(scrollYY>sectionTop && scrollYY <= sectionTop + sectionHeight){
          console.log("실행")
          sectionClass.classList.add('action-link')
      }else{
          sectionClass.classList.remove('action-link')
      }
      //해당 영역의 머리(top)가 닿이거나(&&), 
      
  })
  //console.log(scrollY)
}
window.addEventListener("scroll",()=>{scrollActive();})//호출
scrollActive()

/////////////////////////////
//clock
setInterval(() => {
  let today = new Date();
  
  let hh = addZero(today.getHours())
  let mm = addZero(today.getMinutes())
  let ss = addZero(today.getSeconds())
  
  document.querySelector('#hours').innerHTML = hh;
  document.querySelector('#min').innerHTML = mm;
  document.querySelector('#sec').innerHTML = ss;
  
  function addZero(num) {
    return (num < 10 ? "0" + num : num)
  }
}, 1000)


///////////////////////////////
//intro ani(moon)
//intro animation
document.addEventListener('DOMContentLoaded', function() {
  let bg = document.querySelector("#bg");
  let moon = document.querySelector("#moon");
  let land = document.querySelector("#land");
  let intro = document.querySelector("#intro");

  // 스크롤 이벤트 리스너 추가
  window.addEventListener('scroll', function() {
    // intro 섹션의 위치와 크기 계산
    let introRect = intro.getBoundingClientRect();
    let sectionTop = introRect.top;
    let sectionHeight = introRect.height;

    // 섹션의 스크롤 비율 계산
    let scrollTop = window.scrollY;
    let scrollPercent = (scrollTop - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);

    // 이미지 변환 적용
    moon.style.transform = `translate(-${scrollPercent * 100}px, ${scrollPercent * 550}px)`;
    bg.style.transform = `translate(0px, ${scrollPercent * 50}px)`;
    land.style.transform = `translate(0px, ${scrollPercent * 25}px)`;
  });
});

///////////////////////////////
//intro-enter text ani
Splitting();


document.querySelectorAll(".rotatingHeader").forEach((header,index)=>{

    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 70%",
          end: "+=200 bottom",
          scrub:1,
        },
      });

function initHeaders(header) {
  //let header = document.querySelector(".rotatingHeader");
  let original = header.querySelector(".rotatingHeader h1");
  let clone = original.cloneNode(true);
  header.appendChild(clone);
  gsap.set(clone, { yPercent: -100 });

//   let originalSplit = document.querySelectorAll("h1:first-child .char");
//   let cloneSplit = document.querySelectorAll("h1:last-child .char");
let originalSplit=Splitting({target:original})
let cloneSplit=Splitting({target:clone})

//console.log(originalSplit)

  gsap.set(cloneSplit[0].chars, {
    rotationX: -90,
    opacity: 0,
    transformOrigin: "50% 50% -50",
  });

  //let stagger= {each:0.05,delay:index * 10}
  let stagger= {each:0.05}

  tl.to(originalSplit[0].chars, { duration: 0.4, rotationX: 90, stagger:stagger,transformOrigin: "50% 50% -50" });
  tl.to(originalSplit[0].chars, { duration: 0.4, opacity: 0, stagger:stagger }, 0);

  tl.to(cloneSplit[0].chars, { duration: 0.05, stagger:stagger, opacity: 1 }, 0.001);
  tl.to(cloneSplit[0].chars, { duration: 0.4, rotationX: 0, stagger: stagger }, 0);
}

initHeaders(header);
})


///////////////////////////////
//parallel
let pTag1 = document.querySelector('.first-parallel');
let pTag2 = document.querySelector('.second-parallel');

let textArr1 = 'VISUAL DESIGN ♠ GRAPHIC DESIGNER ♠ UI/UX ♠ WEB DEVELOPER ♠  WEB PUBLISHER ♠ Digital Artist ♠'.split(" ");
//console.log(textArr1)

let textArr2 = 'ABOUT ME ♠ I LOVE TO WORK WITH YOU ♠ CHECK MY PORTFOLIO ♠ I MIND YOUR BUISNESS ♠ IT&rsquo;S NOT THE END ♠ '.split(" ");
//console.log(textArr2)

let count1 = 0;
let count2 = 0;
let count3 = 0;

initTexts(pTag1, textArr1)
initTexts(pTag2, textArr2)

function initTexts(element, textArray) {
  textArray.push(...textArray)
  //console.log(textArray)
  for (let i = 0; i < textArray.length; i++) {
    //자바스크립트 에서 띄워쓰기 &nbsp;
    //자바스크립트 에서 공백 \u00A0
    element.innerHTML += `${textArray[i]}\u00A0\u00A0\u00A0`
  }

}

function animate() {
  count1++;
  count2++;
  count3++;

  count1 = marqueeText(count1, pTag1, -1)
  count2 = marqueeText(count2, pTag2, 1)
  //window.requestAnimationFrame(animate)
  requestAnimationFrame(animate)
}


function marqueeText(count, element, direction) {
  //srollHeight--> 보이지 않는 공간까지 공간의 높이값
  //scrollWidth--> 보이지 않는 공간까지 공간의 넓이값
  if (count > element.scrollWidth / 2) {
    count = 0;
    element.style.transform = `translate(0,0)`;
  }
  element.style.transform = `translate(${count * direction}px,0)`;
  return count;

}

function scrollHandler() {
  count1 += 20;
  count2 += 20;
  count3 += 20;
}
window.addEventListener("scroll", scrollHandler)
animate();

///////////////////////////////
//parallel2


///////////////////////////////
//vertical-line
gsap.timeline({
  scrollTrigger: {
    trigger: ".section2",
    start: "top top",
    end: "bottom bottom",
    scrub: 2,
    // markers: true 
  }
})
.to(".vertical-line", {
  height: "900px", // Final height of the vertical line
  duration: 1,
  ease: "power2.out"
})
.to(".flower", {
  top: "900px", // Final position of the flower
  duration: 1,
  ease: "power2.out"
}, 0); // Start at the same time as the vertical-line animation


//👀
//start:"top 100%",//sec03의 머리가 화면의 100%에 닿이면 시작해
//end:"100% 100%",//sec03의 끝이, 화면의 끝에 부딪히면 애니메이션을 끝내


////////////////////////////////
//cube - hobby
const cubeContainers = document.querySelectorAll(".cube-container");
const itemss = document.querySelectorAll(".cubeitem");
const projectNames = ['nailart', 'diary', 'crafting', 'concert'];

function updateCubes(scrollY) {
  const yRotation = (scrollY / 2) % 360;
  const scrollOffset = scrollY * 0.25;

  cubeContainers.forEach((container, containerIndex) => {
    const cubes =container.querySelectorAll(".cubee");

    cubes.forEach((cubee, cubeIndex) => {
      let rotationDirection = cubeIndex % 2 === 0 ? 1 : -1;

      //console.log(yRotation, rotationDirection)
      cubee.style.transform = `translateZ(100px) rotateX(${yRotation * rotationDirection}deg)`;
      })
      const frontBackTextPosition = 50 + scrollOffset;
      const topBottomTextPosition = 50 - scrollOffset;

      container.querySelectorAll('.cFront p, .cBack p').forEach((p) => {
      p.style.left = `${frontBackTextPosition}%`;
      })
      container.querySelectorAll(".cTop p, .cBottom p").forEach((p) => {
      p.style.left = `${topBottomTextPosition}%`;
    })
  })
}

function populateText() {
  itemss.forEach((item, itemIndex) => {
      const projectName = projectNames[itemIndex % projectNames.length];
      const sides = item.querySelectorAll(".cSide");

      //console.log(sides)
      const textContent = Array(50).fill(projectName).join("&nbsp;&nbsp;&nbsp;&nbsp;");

      sides.forEach((side) => {
          const paragraph = document.createElement("p");
          paragraph.innerHTML = textContent
          side.appendChild(paragraph);

      })

  })
}


window.onload = function () {
  populateText();
  updateCubes(window.scrollY)
}

let ticking = false;

document.addEventListener("scroll", function (e) {
  if (!ticking) {
      window.requestAnimationFrame(function () {
          updateCubes(window.scrollY)
          ticking = false;
      })
      ticking = true;
  }
})

////////////////////////////////
//section2 - textpath_svg
gsap.registerPlugin(ScrollTrigger);

const svgText = document.querySelector("#textOnPath1");
//console.log(svgText);
gsap.fromTo(
    [svgText],
    {
      attr: { startOffset: "100%" },
    },
    {
      attr: { startOffset: "0%" },
      scrollTrigger: {
        trigger: ".textpath-wrap",
        start: "bottom bottom",
        end: "top top",
        scrub: 1,
        //markers:true
      },
    }
  );
////////////////////////////////
//badge
gsap.to(".badge",{
  rotation:360,
  duration:5,
  ease:"none",
  repeat:-1
})
gsap.to(".badge2",{
  rotation:-360,
  duration:5,
  ease:"none",
  repeat:-1
})
////////////////////////////////
//-sticky--content
const contentElements = [...document.querySelectorAll('.content--sticky')];
const totalContentElements = contentElements.length;

//console.log(contentElements)
const scroll = () => {

    contentElements.forEach((el, position) => {
        
        const isLast = position === totalContentElements-1;

        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: `+=${isLast ? 0 : 400}vh`,//'+=400%',
                scrub: true,
                //markers: true
            }
        })
        .to(el, {
            ease: 'none',
            startAt: {filter: 'brightness(100%) contrast(100%)'},//startAt 옵션은 애니메이션이 시작될 때 요소의 초기 스타일을 설정
            filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
            yPercent: isLast ? 0 : -15
        }, 0)
    });

};

window.addEventListener("load",() => {
    scroll(); 
});


////////////////////////////////
//intro-enter text ani
window.addEventListener("load", () => {
  Splitting();
  gsap.registerPlugin(ScrollTrigger);

  function initTextAnimations() {
    let paragraphs = document.querySelectorAll(".intro-title p");

    paragraphs.forEach(paragraph => {
      // Split text for animation
      Splitting({ target: paragraph });

      let originalSplit = paragraph.querySelectorAll(".char");

      // Create a clone of the paragraph for the animation effect
      let clone = paragraph.cloneNode(true);
      clone.classList.add('clone');
      paragraph.parentNode.appendChild(clone);

      let cloneSplit = clone.querySelectorAll(".char");

      // Set initial styles for clone
      gsap.set(clone, { yPercent: -100, opacity: 0, position: "absolute", left: 0, top: 0 });
      gsap.set(cloneSplit, {
        rotationX: -90,
        opacity: 0,
        transformOrigin: "50% 50% -50",
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: paragraph,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
          toggleActions: "play none none reverse",
          //markers: true,
        },
      });

      tl.to(originalSplit, {
        duration: 0.4,
        rotationX: 90,
        stagger: 0.05,
        transformOrigin: "50% 50% -50",
      });

      tl.to(originalSplit, {
        duration: 0.4,
        opacity: 0,
        stagger: 0.05,
      }, 0);

      tl.to(clone, {
        duration: 0.05,
        opacity: 1,
      }, 0.001);

      tl.to(cloneSplit, {
        duration: 0.4,
        rotationX: 0,
        stagger: 0.05,
      }, 0.05);
    });
  }

  initTextAnimations();
});

///////////////////////////////////
//section card 
let cardWrapper = document.querySelectorAll(".cards_item");
let cardsEl = document.querySelectorAll(".cards_item .cards_el");

cardWrapper.forEach(function(e,i){//e:아이템, i :아이템의 index
    let card = cardsEl[i]
    let img = e.querySelector(".cards_img img");
    let scale = 1;
    let rotate = 0;
    let blur = 0;
    let brightness = 1;

    if(i !== cardsEl.length - 1){//4번이 아닌 것들은 
        scale = 0.9 + 0.025 *1;
        rotate = -10;
        blur = 2;
        brightness = 0.9;
    }
    gsap.to(card,{
        scale:scale,
        rotateX:rotate,
        filter: `blur(${blur}px) brightness(${brightness})`,//블러와 밝기 효과 추가
        transformOrigin:"center top",//중심이동
        ease:"none",
        scrollTrigger:{
            trigger: e,
            start:"top "+( 100 + 40 *i), //끝나는 위치가 각자 다 달라서 계산을 해줘야함
            end:"bottom +=650px",
            endTrigger:".end-anim",
            pin:e, //각각에게 고정시켜줘야 하기 때문에, cards_item한테 줌(e)
            scrub:1,
            pinSpacing:false, //pin을 걸때, 밑에 공간을 만들지 않게 함 
            onUpdate: (self) => {
              const progress = self.progress;
              if(i !== cardsEl.length - 1){
                gsap.to(card,{
                  filter: `blur(${blur * (1 - progress)}px) brightness(${1 + (brightness - 1) * progress})`,
                  ease: "none"
                });
              }
            }
        }
    });
});

//////////////////////////////////
//section7 - change section(svg)
let initialPath = "M1 644V43C1 43 181 0.999974 508 0.999969C835 0.999965 1004 43 1004 43V644H1Z";
let targetPath = "M0 601V-2.85726e-05C0 -2.85726e-05 179 49 506 49C833 49 1003 -2.85726e-05 1003 -2.85726e-05V601H0Z";
let svgWraps = document.querySelectorAll(".svg-container");

svgWraps.forEach((svgWrap)=>{
    let itemSvg = svgWrap.querySelector("svg path")
    itemSvg.setAttribute("d",initialPath)

    gsap.to(itemSvg,{
        attr:{d:targetPath},
        scrollTrigger: {
            trigger: svgWrap,
            start: "top 70%",
            end: "+=20%",
            ease: "linear",
            scrub: 1,
            //markers: true,
        },
    })
})
//////////////////////////////////
//section7 - hoverimg animation
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)

  //이미지 애니
  let items = document.querySelectorAll(".anime-list li");
  items.forEach(function(el){
      gsap.set(".hover-img",{xPercent:-50,yPercent:-50})
      let image = el.querySelector(".hover-img")
      let innerImage = el.querySelector(".hover-img img");
      let pos = {x:window.innerWidth/2, y:window.innerHeight/2}
      let mouse = {
          x: pos.x
      }
      let speed = 0.1;
      let xSet = gsap.quickSetter(image,"x","px")
      
      window.addEventListener("mousemove",function(e){
          //console.log(e.x)
          mouse.x = e.x;
      })

      gsap.ticker.add(function(){// == requestAnimationFrame(ani)
          pos.x += (mouse.x - pos.x)
          xSet(pos.x)
      }) 

      //기울기--------------------------
      let direction = "",
      oldx = 0,
      lastCursorX = null,
      cursorThreshould = 150;

      let mousemovemethos = function(e){
          if(e.pageX < oldx && e.clientX <= lastCursorX - cursorThreshould){
              direction="left"
              lastCursorX=e.clientX;
              innerImage.style.transform="rotate(-15deg)"

          }else if(e.pageX > oldx && e.clientX >= lastCursorX + cursorThreshould){
              direction="right"
              lastCursorX=e.clientX;
              innerImage.style.transform="rotate(15deg)"
          }
          oldx=e.pageX;
      }

  

      let mouseMoveTimer;//마우스 멈출때 감지하는 변수

      document.addEventListener("mousemove",function(){
          // setTimeout(할일(함수), 시간) 시간뒤에 함수 실행
          // setTimeout을 멈추고 싶을때  =>변수에 할당 
          // 변수=setTimeout(할일(함수), 시간)
          // clearTimeout(변수)  ==> 멈추는 명령

          clearTimeout(mouseMoveTimer) //기존 타이머를 지움
          mouseMoveTimer=setTimeout(function(){
              innerImage.style.transform="translateX(0%) rotate(0deg)"
          },100)
      })
      
    document.addEventListener("mousemove", mousemovemethos)
 });
});

//////////////////////////////////
//footer - bounce line
let path=`M 10 50 Q 600 25 1190 50`;
let finalpath=`M 10 50 Q 600 25 1190 50`;
let svg=document.querySelector(".svgWrap svg");

  svg.addEventListener("mousemove",function(e){
    //console.log(e.y)
    path=`M 10 50 Q ${e.x - 80} ${e.y - 530} 1190 50`;

    gsap.to('.svgWrap svg path',{
        attr:{d:path},
        duration:0.3,
        ease: "power3.out",
    })
})
  svg.addEventListener("mouseleave",function(){
      gsap.to('.svgWrap svg path',{
          attr:{d:finalpath},
          duration:1.5,
          ease: "elastic.out(1,0.2)",
      })
  })



//////////////////////////////////
//footer - text ani
let splitTypes = document.querySelectorAll(".heading-large")
console.log(splitTypes)
splitTypes.forEach(function (char, i) {
    let parent = char.parentNode.parentNode;
    const text = new SplitType(char, {
        types: 'chars'
    })
    console.log(text)

    gsap.from(text.chars, {
        opacity: 0,
        yPercent: 100,
        duration: 0.4,
        stagger: 0.04,
        scrollTrigger: {
            trigger: parent,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
            ease: "power3.out",
            //markers:true
        }
    })
})
