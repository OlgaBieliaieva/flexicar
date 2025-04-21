const select = document.querySelector("#country-select");
const trigger = select.querySelector(".select-trigger");
const countryCodeSpan = trigger.querySelector(".country-code");
const countryList = select.querySelector(".country-list");
const listItems = countryList.querySelectorAll("li");

const phoneInput = document.querySelector("#phone-input");

const dialMasks = {
  "+1": "(000) 000-0000",
  "+380": "(00) 000-00-00",
  "+385": "(00) 000-0000",
};

let currentDial = "+1";

function maskPhone(value, mask) {
  const onlyNumbers = value.replace(/\D/g, "");
  let masked = "";
  let index = 0;

  for (let char of mask) {
    if (char === "0") {
      if (index < onlyNumbers.length) {
        masked += onlyNumbers[index++];
      } else {
        masked += "_";
      }
    } else {
      masked += char;
    }
  }

  return masked;
}

function updatePlaceholderAndMask() {
  const mask = dialMasks[currentDial];
  const placeholder = `${currentDial} ${mask}`;
  phoneInput.placeholder = placeholder;

  if (phoneInput.value) {
    let digits = phoneInput.value.replace(/\D/g, "");
    const dialDigits = currentDial.replace("+", "");
    if (digits.startsWith(dialDigits)) {
      digits = digits.slice(dialDigits.length);
    }
    phoneInput.value = `${currentDial} ${maskPhone(digits, mask)}`;
  }
}

function isPhoneValid(value) {
  const digits = value.replace(/\D/g, "");
  const dialDigits = currentDial.replace("+", "");

  const localDigits = digits.startsWith(dialDigits)
    ? digits.slice(dialDigits.length)
    : digits;

  const requiredDigits = (dialMasks[currentDial].match(/0/g) || []).length;
  return localDigits.length === requiredDigits;
}

phoneInput.addEventListener("input", () => {
  let digits = phoneInput.value.replace(/\D/g, "");
  const dialDigits = currentDial.replace("+", "");
  if (digits.startsWith(dialDigits)) {
    digits = digits.slice(dialDigits.length);
  }

  const mask = dialMasks[currentDial];
  phoneInput.value = `${currentDial} ${maskPhone(digits, mask)}`;
  phoneInput.setCustomValidity("");
  phoneInput.classList.remove("is-invalid");
});

phoneInput.addEventListener("blur", () => {
  const valid = isPhoneValid(phoneInput.value);
  phoneInput.setCustomValidity(valid ? "" : "Invalid phone number");
  phoneInput.reportValidity();
  phoneInput.classList.toggle("is-invalid", !valid);
});

trigger.addEventListener("click", () => {
  countryList.classList.toggle("show");
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    const country = item.getAttribute("data-country");
    const dial = item.getAttribute("data-dial");

    countryCodeSpan.textContent = country;
    currentDial = dial;

    phoneInput.value = "";
    phoneInput.setCustomValidity("");
    phoneInput.classList.remove("is-invalid");

    updatePlaceholderAndMask();
    phoneInput.reportValidity();

    countryList.classList.remove("show");
  });
});

document.addEventListener("click", (e) => {
  if (!select.contains(e.target)) {
    countryList.classList.remove("show");
  }
});

updatePlaceholderAndMask();
