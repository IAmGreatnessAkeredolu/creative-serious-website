// =========================
// SERVICE QUOTE SELECTION
// =========================

const serviceButtons = document.querySelectorAll(".service-quote-button");

const serviceSelect = document.querySelector("#service");


serviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedService = button.dataset.service;

        serviceSelect.value = selectedService;

    });

});