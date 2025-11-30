function Service(name, category, price) {
  this.name = name;
  this.category = category;
  this.price = price;
}

function Booking(customer, serviceName, date, status) {
  this.customer = customer;
  this.serviceName = serviceName;
  this.date = date;
  this.status = status;
}

// LOCAL STORAGE KEYS
const STORAGE_BOOKINGS_KEY = "cleanlink_bookings";

let bookings = [];
(function initBookingsFromStorage() {
  const stored = localStorage.getItem(STORAGE_BOOKINGS_KEY);
  if (stored) {
    try {
      bookings = JSON.parse(stored);
    } catch (e) {
      bookings = [];
    }
  }
  if (bookings.length === 0) {
    bookings = [
      new Booking("Aisha", "Full Car Wash", "2025-03-01", "Completed"),
      new Booking("Omar", "Interior Cleaning", "2025-03-02", "Pending"),
      new Booking("Laila", "Laundry (10 items)", "2025-03-03", "Completed")
    ];
    saveBookings();
  }
})();

function saveBookings() {
  localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
}

// Services data
const services = [
  new Service("Exterior Wash", "Car Wash", 4),
  new Service("Full Car Wash", "Car Wash", 7),
  new Service("Interior Cleaning", "Car Wash", 6),
  new Service("Standard Laundry", "Laundry", 5),
  new Service("Express Laundry", "Laundry", 8),
  new Service("Home Cleaning - Basic", "Home Cleaning", 12)
];



function $(id) {
  return document.getElementById(id);
}

// HOME PAGE: banner + clock + carousel
function initHomePage() {
  const banner = $("liveBanner");
  if (banner) {
    function updateBanner() {
      const now = new Date();
      banner.textContent =
        "Welcome to CleanLink | Today is " + now.toLocaleString();
    }
    updateBanner();
    setInterval(updateBanner, 1000);
  }
}

// SERVICES PAGE
function renderServicesTable(list) {
  const body = $("servicesBody");
  if (!body) return;
  body.innerHTML = "";
  list.forEach((s, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.name}</td>
      <td>${s.category}</td>
      <td>${s.price.toFixed(3)}</td>
    `;
    body.appendChild(tr);
  });
}

function initServicesPage() {
  if (!$("servicesTable")) return;


  renderServicesTable(services);


  const searchInput = $("serviceSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const q = this.value.toLowerCase();
      const filtered = services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
      renderServicesTable(filtered);
    });
  }


  const form = $("addServiceForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = $("newServiceName").value.trim();
      const category = $("newServiceCategory").value.trim();
      const priceValue = parseFloat($("newServicePrice").value);
      if (!name || !category || isNaN(priceValue) || priceValue <= 0) {
        alert("Please enter valid service data.");
        return;
      }
      services.push(new Service(name, category, priceValue));
      renderServicesTable(services);
      form.reset();
    });
  }
}

// BOOKING FORM PAGE 
function initBookingForm() {
  const form = $("bookingForm");
  if (!form) return;

  const select = $("bookingService");
  services.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.name;
    opt.textContent = `${s.name} (${s.category})`;
    select.appendChild(opt);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const name = $("bookingName").value.trim();
    const serviceName = $("bookingService").value;
    const date = $("bookingDate").value;
    const newBooking = new Booking(name, serviceName, date, "Pending");
    bookings.push(newBooking);
    saveBookings();

    form.reset();
    form.classList.remove("was-validated");

    const successAlert = $("bookingSuccess");
    if (successAlert) {
      successAlert.classList.remove("d-none");
      setTimeout(() => successAlert.classList.add("d-none"), 3000);
    }
  });
}

// BOOKINGS PAGE
function renderBookingsTable(list) {
  const body = $("bookingsBody");
  if (!body) return;
  body.innerHTML = "";
  list.forEach((b, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${b.customer}</td>
      <td>${b.serviceName}</td>
      <td>${b.date}</td>
      <td>${b.status}</td>
    `;
    body.appendChild(tr);
  });
}

function initBookingsPage() {
  if (!$("bookingsTable")) return;

  renderBookingsTable(bookings);

  const searchInput = $("bookingSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const q = this.value.toLowerCase();
      const filtered = bookings.filter(
        (b) =>
          b.customer.toLowerCase().includes(q) ||
          b.serviceName.toLowerCase().includes(q) ||
          b.status.toLowerCase().includes(q)
      );
      renderBookingsTable(filtered);
    });
  }
}

// QUESTIONNAIRE PAGE
function initQuestionnairePage() {
  const form = $("questionnaireForm");
  if (!form) return;

  const alertBox = $("questionnaireAlert");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alertBox.classList.add("d-none");

    const name = $("qName").value.trim();
    const email = $("qEmail").value.trim();
    const rating = document.querySelector('input[name="qRating"]:checked');
    const serviceType = $("qServiceType").value;
    const recommend = $("qRecommend").value;
    const comments = $("qComments").value.trim();

    let errorMsg = "";
    if (!name) errorMsg += "Name is required. ";
    if (!email || !email.includes("@")) errorMsg += "Valid email is required. ";
    if (!rating) errorMsg += "Please select a rating. ";
    if (!serviceType) errorMsg += "Please choose a service type. ";
    if (!recommend) errorMsg += "Please answer if you would recommend us. ";

    if (errorMsg) {
      alertBox.classList.remove("d-none", "alert-success");
      alertBox.classList.add("alert-danger");
      alertBox.textContent = errorMsg;
      return;
    }

    // If all good
    alertBox.classList.remove("d-none", "alert-danger");
    alertBox.classList.add("alert-success");
    alertBox.textContent =
      "Thank you for your feedback, " + name + "! We appreciate your time.";
    form.reset();
  });
}

// CALCULATE PAGE
function initCalculatePage() {
  const form = $("calcForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const service = $("calcService").value;
    const quantity = parseInt($("calcQuantity").value, 10) || 0;
    const urgent = $("calcUrgent").checked;
    const discount = $("calcDiscount").checked;

    let basePrice = 0;
    if (service === "car") basePrice = 7;
    else if (service === "laundry") basePrice = 5;
    else if (service === "home") basePrice = 12;

    let total = basePrice * quantity;

    // Apply urgent 20% extra
    if (urgent) {
      total *= 1.2;
    }

    // Apply loyalty 15% discount
    if (discount) {
      total *= 0.85;
    }

    $("calcResult").textContent =
      "Estimated total: " + total.toFixed(3) + " Omani Riyal.";
  });
}

// FUN PAGE
function initFunPage() {
  const startBtn = $("funStart");
  const result = $("funResult");
  const scoreSpan = $("funScore");
  if (!startBtn || !result || !scoreSpan) return;

  const messages = [
    "You cleaned a car in record time! +10 points",
    "You missed a spot on the windshield! +2 points",
    "Perfect laundry fold! +8 points",
    "Soap everywhere... but it smells nice. +5 points",
    "Customer gave you a 5-star review! +12 points"
  ];
  let score = 0;

  startBtn.addEventListener("click", function () {
    const idx = Math.floor(Math.random() * messages.length);
    result.textContent = messages[idx];
    const gained = parseInt(messages[idx].match(/\+(\d+)/)[1], 10);
    score += gained;
    scoreSpan.textContent = score;
  });
}

// CONTACT PAGE SIMPLE HANDLER
function initContactPage() {
  const form = $("contactForm");
  const alertBox = $("contactAlert");
  if (!form || !alertBox) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alertBox.classList.remove("d-none");
    form.reset();
    setTimeout(() => alertBox.classList.add("d-none"), 3000);
  });
}

// MAIN ENTRY
document.addEventListener("DOMContentLoaded", function () {
  initHomePage();
  initServicesPage();
  initBookingForm();
  initBookingsPage();
  initQuestionnairePage();
  initCalculatePage();
  initFunPage();
  initContactPage();
});
