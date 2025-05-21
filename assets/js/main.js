
console.clear();

gsap.registerPlugin(MotionPathPlugin);

var legsLeft = document.querySelectorAll('.legsL'),
    legsRight = document.querySelectorAll('.legsR'),
    start = "top top",
    rotation = 0,
    direction = 0;


gsap.set('.cuca', {
  autoAlpha:1,  x:-100, 
  scale:0.8, transformOrigin:'center'
})


var runningCuca = gsap.timeline({
  scrollTrigger:{
    trigger: "#theCucas",
    pin: true,
    scrub:0.6,
    start: () => start, // gets called on each refresh
    end:'+=400%',
    onUpdate: (self) => {
      if(self.direction == -1){
        rotation = 180;
      } else if (self.direction == 1){
        rotation = 0;
      }
      console.log(self.direction, rotation); 
    },
    onRefresh: isActive => {
      if(window.innerHeight < 600){
        start = "top top-=200";
      }else if(window.innerHeight > 600) {
        start = "top top";
      }
      ScrollTrigger.update();
      
    }
  }
})
.to('.cuca', {
  motionPath: {
    path: "M -100 100 Q 100 0 200 100 Q 300 300 350 100 Q 350 50 100 100 Q 350 250 400 0 C 500 200 550 150 750 50 ", 
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  duration:4, ease:'none',
  onUpdate: function() {
    if(rotation) {
      this.targets().forEach(cuca => gsap.set(cuca, {
        rotation: gsap.getProperty(cuca, "rotation") + rotation
      }))
    }
  },
})
.to(legsLeft, {rotation:40, transformOrigin:'80% 10px', duration:0.02,  stagger:0.005, repeat:160, yoyo:true},0.1)
.to(legsRight, {rotation:-40, transformOrigin:'80% 10px', duration:0.02,  stagger:0.005, repeat:160, yoyo:true},0.115)


var spanRed = gsap.utils.toArray("span").forEach(function(elem) {
    ScrollTrigger.create({
      trigger: elem,
      start: "top 30%",
      onEnter: function() {
        gsap.set(elem, {color:'#a22525'})
      }
    })
});
