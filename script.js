// =========================
// SERVICE QUOTE SELECTION
// =========================

const serviceButtons = document.querySelectorAll(".service-quote-button");
const serviceSelect = document.querySelector("#service");
const quoteForm = document.querySelector("#quote-form");

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedService = button.dataset.service;

    serviceSelect.value = selectedService;
  });
});

// =========================
// FORM SUBMISSION
// =========================

quoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = quoteForm.querySelector('button[type="submit"]');

  const originalButtonText = submitButton.textContent;

  // Show loading state
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  try {
    const formData = new FormData(quoteForm);

    const response = await fetch(quoteForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Reset the form
      quoteForm.reset();

      // Success message
      showFormMessage(
        "success",
        "Thanks! Your enquiry has been sent successfully. I'll get back to you soon.",
      );
    } else {
      showFormMessage("error", "Something went wrong. Please try again.");
    }
  } catch (error) {
    showFormMessage(
      "error",
      "Unable to send your enquiry. Please check your internet connection and try again.",
    );
  } finally {
    // Restore button
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

// =========================
// FORM MESSAGE FUNCTION
// =========================

function showFormMessage(type, message) {
  // Remove any existing message
  const existingMessage = document.querySelector(".form-message");

  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message
  const formMessage = document.createElement("div");

  formMessage.classList.add("form-message", type);

  formMessage.textContent = message;

  // Add message after form
  quoteForm.insertAdjacentElement("afterend", formMessage);
}
