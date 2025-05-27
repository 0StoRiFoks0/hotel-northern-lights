// Перемикання розділів
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  // Закриваємо модальне вікно
  document.getElementById('modal').classList.add('hidden');

  // Оновлюємо таблицю лише якщо відкрито "Бронювання"
  if (id === 'booking') {
    renderBookings();
  }
}

// Відкриття модального вікна з інформацією про номер
function openModal(title, description, imageSrc) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = description;
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Збереження бронювання в localStorage
function saveBooking(booking) {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Відображення бронювань у таблиці
function renderBookings() {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  const tbody = document.querySelector('#bookingList tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  bookings.forEach((b, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${b.firstName}</td>
      <td>${b.lastName}</td>
      <td>${b.room}</td>
      <td>${b.checkIn}</td>
      <td>${b.checkOut}</td>
      <td>
        <button onclick="editBooking(${index})">Редагувати</button>
        <button onclick="deleteBooking(${index})">Скасувати</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Видалення бронювання
function deleteBooking(index) {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  bookings.splice(index, 1);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  renderBookings();
}

// Редагування бронювання
function editBooking(index) {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  const b = bookings[index];

  // Заповнення форми
  document.getElementById('firstName').value = b.firstName;
  document.getElementById('lastName').value = b.lastName;
  document.getElementById('roomType').value = b.room;
  document.getElementById('checkIn').value = b.checkIn;
  document.getElementById('checkOut').value = b.checkOut;

  // Видаляємо старий запис (оновиться після сабміту)
  deleteBooking(index);

  // Перехід до секції з формою
  showSection('booking');
}

// Надсилання форми
function submitBooking(event) {
  event.preventDefault();

  const booking = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    room: document.getElementById('roomType').value,
    checkIn: document.getElementById('checkIn').value,
    checkOut: document.getElementById('checkOut').value
  };

  if (!booking.firstName || !booking.lastName || !booking.room || !booking.checkIn || !booking.checkOut) {
    alert("Будь ласка, заповніть усі поля.");
    return;
  }

  saveBooking(booking);
  renderBookings();
  event.target.reset();
  document.getElementById('confirmation').textContent =
    `Бронювання підтверджено для ${booking.firstName} ${booking.lastName} у номері "${booking.room}" з ${booking.checkIn} по ${booking.checkOut}.`;
}

// Початкове завантаження — лише головна сторінка
window.onload = function () {
  showSection('home');
};
