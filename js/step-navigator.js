const steps = document.querySelectorAll(".step");
const continueButtons = document.querySelectorAll(".continue-btn");
const backButtons = document.querySelectorAll(".back-btn");

let currentStep = 0;

const isMobileOrTablet = () => window.innerWidth < 1920;

const showAllSteps = () => {
  steps.forEach((step) => step.classList.remove("visually-hidden"));
};

const showCurrentStepOnly = () => {
  steps.forEach((step, index) => {
    step.classList.toggle("visually-hidden", index !== currentStep);
  });
};

const initSteps = () => {
  if (isMobileOrTablet()) {
    showCurrentStepOnly();
  } else {
    showAllSteps();
  }
};

continueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isMobileOrTablet()) return;

    const current = steps[currentStep];
    const next = steps[currentStep + 1];

    if (next) {
      current.classList.add("visually-hidden");
      next.classList.remove("visually-hidden");
      currentStep++;
    }
  });
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isMobileOrTablet()) return;

    const current = steps[currentStep];
    const prev = steps[currentStep - 1];

    if (prev) {
      current.classList.add("visually-hidden");
      prev.classList.remove("visually-hidden");
      currentStep--;
    }
  });
});

window.addEventListener("resize", initSteps);
window.addEventListener("DOMContentLoaded", initSteps);
