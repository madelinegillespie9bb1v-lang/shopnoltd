function submitOrder() {
  const phone = document.getElementById("phone").value;
  const zipcode = document.getElementById("zipcode").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const address = document.getElementById("address").value;

  // Example: Log the order details to the console (you can replace this with your own logic)
  console.log("Order Details:", {
    phone,
    zipcode,
    city,
    state,
    firstname,
    lastname,
    address,
  });

  alert("Payment Done successfully!");
}

document.addEventListener("DOMContentLoaded", (event) => {
  const phoneInput = document.getElementById("phone");
  const prefix = "+91 │ ";
  phoneInput.value = prefix;

  phoneInput.addEventListener("focus", function () {
    if (phoneInput.value === "") {
      phoneInput.value = prefix;
    }
  });

  phoneInput.addEventListener("input", function () {
    const userInput = phoneInput.value;
    if (!userInput.startsWith(prefix)) {
      phoneInput.value = prefix + userInput;
    }

    const input = phoneInput.value.slice(prefix.length);
    phoneInput.value = prefix + input.replace(/[^0-9]/g, "").slice(0, 10);
  });

  const zipcodeInput = document.getElementById("zipcode");
  zipcodeInput.addEventListener("input", function () {
    zipcodeInput.value = zipcodeInput.value
      .replace(/\D/g, "")
      .slice(0, 6);

    if (zipcodeInput.value.length === 6) {
      fetchCityState(zipcodeInput.value);
    }
  });

  document.addEventListener("DOMContentLoaded", (event) => {
  const phoneInput = document.getElementById("phone");
  const countryCodeSelect = document.getElementById("country-code");

  // Default value for the phone input (empty or first option)
  phoneInput.value = "";

  // Update phone input value when country code is changed
  countryCodeSelect.addEventListener("change", function () {
    const selectedCountryCode = countryCodeSelect.value;
    if (phoneInput.value && !phoneInput.value.startsWith(selectedCountryCode)) {
      phoneInput.value = selectedCountryCode + " │ " + phoneInput.value.replace(/[^0-9]/g, "");
    } else {
      phoneInput.value = selectedCountryCode + " │ ";
    }
  });

  phoneInput.addEventListener("focus", function () {
    const selectedCountryCode = countryCodeSelect.value;
    if (phoneInput.value === "") {
      phoneInput.value = selectedCountryCode + " │ ";
    }
  });

  phoneInput.addEventListener("input", function () {
    const selectedCountryCode = countryCodeSelect.value;
    let userInput = phoneInput.value;

    if (!userInput.startsWith(selectedCountryCode)) {
      phoneInput.value = selectedCountryCode + " │ " + userInput.replace(/[^0-9]/g, "");
    }

    // Limit the phone number length to 10 digits
    userInput = phoneInput.value.slice(selectedCountryCode.length + 3);
    phoneInput.value = selectedCountryCode + " │ " + userInput.replace(/[^0-9]/g, "").slice(0, 10);
  });

  const zipcodeInput = document.getElementById("zipcode");
  zipcodeInput.addEventListener("input", function () {
    zipcodeInput.value = zipcodeInput.value.replace(/\D/g, "").slice(0, 6);
    if (zipcodeInput.value.length === 6) {
      fetchCityState(zipcodeInput.value);
    }
  });

  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const activeElement = document.activeElement;

      if (activeElement.tagName === "INPUT" && activeElement.type !== "checkbox") {
        event.preventDefault();

        if (activeElement.id === "phone") {
          checkMobile();
        } else {
          checkAddress();
        }
      }
    }
  });
});

async function fetchCityState(zipcode) {
  const url = `https://api.postalpincode.in/pincode/${zipcode}`;

  const closeBtn = document.querySelector(".close");
  const loader = closeBtn.querySelector(".loader");
  const closeText = closeBtn.querySelector(".close-text");
  const zipcodeError = document.getElementById("zipcode-error");

  try {
    loader.style.display = "inline-block";
    closeText.style.display = "none";
    zipcodeError.textContent = "";

    const response = await fetch(url);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0 && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
      const postOffice = data[0].PostOffice[0];
      const city = postOffice.District;
      const state = postOffice.State;

      const cityInput = document.getElementById("city");
      const stateInput = document.getElementById("state");

      cityInput.value = city;
      stateInput.value = state;
    } else {
      zipcodeError.textContent = "Please enter a valid ZIP code.";
    }
  } catch (error) {
    zipcodeError.textContent = "Error fetching data. Please try again later.";
  } finally {
    loader.style.display = "none";
    closeText.style.display = "inline-block";
  }
}

function checkMobile() {
  const phoneInput = document.getElementById("phone");
  const phoneValue = phoneInput.value.replace(/\D/g, "").slice(-10);
  const phonePattern = /^[789]\d{9}$/;
  const isValidPhone = phonePattern.test(phoneValue);

  if (isValidPhone) {
    document.getElementById("mobile-heading").classList.add("completed");
    document.getElementById("mobile-check").style.display = "inline";
    nextSection("address-section");
  } else {
    alert("Please enter a valid 10-digit phone number");
  }
}

function checkAddress() {
  const zipcode = document.getElementById("zipcode").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const firstname = document.getElementById("firstname").value.trim();
  const email = document.getElementById("lastname").value.trim();
  const address = document.getElementById("address").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailPattern.test(email);

  const namePattern = /^[a-zA-Z\s]*$/;
  const isValidName = namePattern.test(firstname);

  if (zipcode && city && state && isValidName && isValidEmail && address) {
    document.getElementById("address-heading").classList.add("completed");
    document.getElementById("address-check").style.display = "inline";
    nextSection("payment-section");
  } else {
    alert("Please fill in all address fields with valid information.");
  }
}

function navigateToSection(sectionId) {
  const currentSection = document.querySelector(
    "div[id$='-section']:not([style*='display: none'])"
  ).id;

  if (currentSection === "mobile-section" && sectionId !== "mobile-section") {
    checkMobile();
    return;
  }

  if (currentSection === "address-section" && sectionId === "payment-section") {
    checkAddress();
    return;
  }

  nextSection(sectionId);
}

function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  // Go back to the previous page in the browser history
  window.history.back();
}

function nextSection(sectionId) {
  document.getElementById("mobile-section").style.display = "none";
  document.getElementById("address-section").style.display = "none";
  document.getElementById("payment-section").style.display = "none";

  document.getElementById(sectionId).style.display = "block";
}

