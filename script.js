// Menu burger mobile
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// Fermer le menu au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Formulaire de contact
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('confirm-msg');
  msg.textContent = 'Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.';
  e.target.reset();
}
