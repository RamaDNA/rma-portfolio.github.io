const textEl = document.querySelector('.animated-text');
const messages = ["WELCOME TOO" , "MY WEBSITE","OWO"];
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
  duration: 2,
  delay: 0.5,
  ease: "power2.out",
  onComplete: type,
});
