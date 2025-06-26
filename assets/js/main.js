const textEl = document.querySelector('.animated-text');
const messages = ["WELCOME " ,"O_W_O","MY WEBSITE PORTFOLIO" , "WILL BE UPDATED SOON"];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = messages[messageIndex];
  const current = currentText.substring(0, charIndex);
  textEl.textContent = current;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      setTimeout(type, 500);
    }
  }
}

gsap.from(".animated-text", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
  onComplete: type,
});


// Scroll animation
gsap.registerPlugin(ScrollTrigger);

/*start section about*/
gsap.from(".title-about", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".desc", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
  },
  opacity: 0,
  y: 80,
  duration: 1.2,
  delay: 0.2,
  ease: "power2.out",
});
/*end section about*/

/*start section project*/
const sections = gsap.utils.toArray(".project-card");

gsap.to(".projects-horizontal", {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projects-wrapper",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".projects-horizontal").offsetWidth,
  },
});
/*end section project*/
