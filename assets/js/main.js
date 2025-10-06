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

/*start section work experience*/
gsap.utils.toArray(".work-item").forEach((item) => {
  let title = item.querySelector("h2");
  let date = item.querySelector(".work-date");
  let desc = item.querySelector(".work-desc");
  let list = item.querySelectorAll(".work-list-detail li");

  // Timeline biar animasi berurutan
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  tl.from(title, {
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: "power2.out"
  })
  .from(date, {
    opacity: 0,
    y: 20,
    duration: 0.6
  }, "-=0.4") // mulai agak bareng dengan title
  .from(desc, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.3")
  .from(list, {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out"
  }, "-=0.2");
});
/*end section work experience*/

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


/*start footer*/

/*end footer*/
