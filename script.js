const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const applyScrollState = () => {
  document.body.classList.toggle("is-scrolled", window.scrollY > 24);
};
applyScrollState();

let scrollRaf = 0;
window.addEventListener(
  "scroll",
  () => {
    if (scrollRaf) {
      return;
    }
    scrollRaf = window.requestAnimationFrame(() => {
      applyScrollState();
      scrollRaf = 0;
    });
  },
  { passive: true }
);

const revealElements = Array.from(document.querySelectorAll(".reveal"));
revealElements.forEach((element, index) => {
  const delay = Math.min(index * 70, 420);
  element.style.setProperty("--reveal-delay", `${delay}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}

const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsFinePointer && !reduceMotion) {
  const tiltTargets = Array.from(document.querySelectorAll("[data-tilt]"));
  tiltTargets.forEach(element => {
    let frameId = 0;

    const onMove = event => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 6;
      const rotateX = (0.5 - py) * 5;
      const lift = element.classList.contains("card") ? -4 : -3;

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => {
        element.style.transform = `translateY(${lift}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });
    };

    const reset = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      element.style.transform = "";
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("blur", reset);
  });

  const starfields = Array.from(document.querySelectorAll(".starfield"));
  let starfieldFrame = 0;
  window.addEventListener(
    "pointermove",
    event => {
      if (starfieldFrame) {
        cancelAnimationFrame(starfieldFrame);
      }

      starfieldFrame = requestAnimationFrame(() => {
        const xOffset = (event.clientX / window.innerWidth - 0.5) * 18;
        const yOffset = (event.clientY / window.innerHeight - 0.5) * 14;
        starfields.forEach((field, index) => {
          const ratio = index === 0 ? 1 : -1;
          field.style.transform = `translate(${(xOffset * ratio).toFixed(2)}px, ${(yOffset * ratio).toFixed(2)}px)`;
        });
      });
    },
    { passive: true }
  );
}
