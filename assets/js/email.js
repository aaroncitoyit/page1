const scriptURL = 'https://script.google.com/macros/s/AKfycby3XOeSiJwnBRtFtriB1z_sEaXOJvCd940J7GQmvzEotrVuIFBgbD-puxtBGEFrhpoH/exec';
const form = document.getElementById('formContacto');
const modal = document.getElementById('modal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');
const modalClose = document.getElementById('modalClose');

// Función para mostrar modal
function showModal(type, title, message) {
  modalIcon.className = `modal-icon ${type}`;
  
  if (type === 'success') {
    modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
  } else {
    modalIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
  }
  
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.classList.add('show');
}

// Función para cerrar modal
function closeModal() {
  modal.classList.remove('show');
}

// Cerrar modal al hacer click en el botón
modalBtn.addEventListener('click', closeModal);

// Cerrar modal al hacer click en la X
modalClose.addEventListener('click', closeModal);

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  
  // Cambiamos el texto del botón para feedback
  const btn = form.querySelector('button');
  btn.innerText = 'Enviando...';
  btn.disabled = true;

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        showModal('success', '¡Éxito!', 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.');
        form.reset();
        btn.innerText = 'Enviar mensaje';
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Error!', error.message);
        showModal('error', 'Error', 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.');
        btn.innerText = 'Enviar mensaje';
        btn.disabled = false;
    });
});