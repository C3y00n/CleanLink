
function $(id) {
  return document.getElementById(id);
}


/**
 * validateBookingForm()
 * ---------------------
 * Validates the booking form before it submits to PHP insert_booking.php
 * Conditions:
 *  - Name: required, at least 2 characters
 *  - Phone: required, digits only, length 8-15
 *  - Date: required, not in the past
 *  - Service: must be selected
 *
 * Returns:
 *  - true  => allow submit to PHP
 *  - false => block submit and show error messages
 */
function validateBookingForm() {
  // Read values from inputs
  const name = $("bookingName") ? $("bookingName").value.trim() : "";
  const phone = $("bookingPhone") ? $("bookingPhone").value.trim() : "";
  const date = $("bookingDate") ? $("bookingDate").value : "";
  const service = $("bookingService") ? $("bookingService").value : "";

  // Error elements (shown near each field)
  const nameErr = $("bookingNameError");
  const phoneErr = $("bookingPhoneError");
  const dateErr = $("bookingDateError");
  const serviceErr = $("bookingServiceError");

  // Clear previous errors
  if (nameErr) nameErr.textContent = "";
  if (phoneErr) phoneErr.textContent = "";
  if (dateErr) dateErr.textContent = "";
  if (serviceErr) serviceErr.textContent = "";

  let ok = true;

  //    Name validation
  if (name.length < 2) {
    if (nameErr) nameErr.textContent = "Please enter a valid name (min 2 characters).";
    ok = false;
  }

  //    Phone validation (digits only, 8-15 length)
  //    Example: Oman numbers are often 8 digits, but we allow up to 15 for generality.
  const phoneDigitsOnly = /^[0-9]{8,15}$/;
  if (!phoneDigitsOnly.test(phone)) {
    if (phoneErr) phoneErr.textContent = "Phone must be digits only (8 to 15 numbers).";
    ok = false;
  }

  if (date === "") {
    if (dateErr) dateErr.textContent = "Please choose a booking date.";
    ok = false;
  } else {
    const selected = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      if (dateErr) dateErr.textContent = "Booking date cannot be in the past.";
      ok = false;
    }
  }

  if (service === "") {
    if (serviceErr) serviceErr.textContent = "Please select a service.";
    ok = false;
  }

  // If ok is false -> stop form submit
  return ok;
}




/**
 * validateDeleteForm()
 * --------------------
 * Validates delete form before sending to delete_booking.php
 * Conditions:
 *  - booking_id: required, digits only
 */
function validateDeleteForm() {
  const idInput = $("booking_id");
  const err = $("deleteError");

  if (err) err.textContent = "";

  if (!idInput) return true;

  const id = idInput.value.trim();

  // booking_id must be a number
  if (id === "" || !/^[0-9]+$/.test(id)) {
    if (err) err.textContent = "Enter a valid numeric Booking ID.";
    return false;
  }
  return true;
}


document.addEventListener("DOMContentLoaded", () => {
  // No LocalStorage booking system anymore.
  
});
