import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";
import LocomotiveScroll from 'locomotive-scroll';

const locomotiveScroll = new LocomotiveScroll();
const scroll = document.querySelector("#scroll");
gsap.registerPlugin(ScrollTrigger)
let frame = {
  curruntIndex: 0,
  maxIndex: 550,
  maximg:550-161
}
let images = [];
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d");

const loadImages = () => {
  for (let i = 161; i <= frame.maxIndex; i++) {
    const imgUrl = `./images/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      if (i == frame.maxIndex) {
        console.log("imges are loaded")
        drawImg(frame.curruntIndex);
        animation()
      }
      images.push(img)
    }
  }
}


const drawImg = (index) => {
  const img = images[index];
 
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  context.clearRect(0, 0, canvas.width, canvas.height)
  const scaleX = canvas.width / img.width;
  const scaleY = canvas.height / img.height;
  const scale = Math.max(scaleX, scaleY);
  const newHeight = img.height * scale;
  const newWidth = img.width * scale;
  const offsetX = (canvas.width - newWidth) / 2
  const offsetY = (canvas.height - newHeight) / 2
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);


}

const animation = () => {
  let tl = gsap.timeline({
  scrollTrigger:{
    trigger:"main",
    start:"top top",
    scrub:2
  }
  }

  )
  tl.to(frame,{
    curruntIndex:frame.maximg,
    onUpdate:function(){
      
      // scroll.parentElement.style.display="none"
      drawImg(Math.floor(frame.curruntIndex))
      
      
      if(Math.floor(frame.curruntIndex)==0 || Math.floor(frame.curruntIndex)==387 ){
        gsap.to(scroll.parentElement,{
          opacity:1,
          duration:0.1,
          repeat:1
        })
      }else{
        gsap.to(scroll.parentElement,{
          opacity:0,
          duration:0.1,
          repeat:1
        })  
      }
    },
    
  })
}
// scroll.style.translate="0px 0px"
// console.log(scroll.style.translate)

gsap.to(scroll,{
  translate:"0px 0px",
  yoyo:true,
  repeat:-1,
  duration:0.9,
  ease:"power1.in"
})

loadImages()