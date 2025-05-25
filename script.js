function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  // Закрити модальне вікно, якщо відкрите
  const modal = document.getElementById('modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
  }
}

function submitBooking(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const room = document.getElementById('roomType').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;

  if (!firstName || !lastName || !room || !checkIn || !checkOut) {
    alert("Будь ласка, заповніть усі поля.");
    return;
  }

  const msg = `Бронювання підтверджено для ${firstName} ${lastName} у номері "${room}" з ${checkIn} по ${checkOut}.`;
  document.getElementById('confirmation').textContent = msg;
}

function openModal(title, description, imageSrc) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = description;
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}
