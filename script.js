// Menu burger mobile
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// Fermer le menu au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === Formulaire de contact ===
// Le site est hébergé en statique, il n'y a aucun serveur pour recevoir un
// envoi. Plutôt que de faire croire à la visiteuse que son message est parti,
// on prépare le message dans sa propre messagerie : elle le relit, elle
// l'envoie, elle en garde une copie, et la réponse lui revient directement.
// Rien ne transite par un prestataire, ce qui compte pour une demande adressée
// à une psychologue.

const DESTINATAIRE = 'estellevasquez42@gmail.com';

// Au-delà de cette taille, certains logiciels de messagerie tronquent le lien
// mailto sans prévenir. On bascule alors directement sur le repli copier-coller.
const TAILLE_MAX_MAILTO = 1800;

function composerMessage() {
  const valeur = id => (document.getElementById(id).value || '').trim();
  const nom = valeur('nom');
  const email = valeur('email');
  const tel = valeur('tel');
  const type = valeur('type');
  const message = valeur('message');

  const lignes = ['Nom : ' + nom, 'Email : ' + email];
  if (tel) lignes.push('Téléphone : ' + tel);
  if (type) lignes.push('Consultation souhaitée : ' + type);
  lignes.push('', message);

  return {
    objet: 'Demande de rendez-vous - ' + nom,
    corps: lignes.join('\n')
  };
}

function afficherRepli(zone, objet, corps, raison) {
  zone.innerHTML = '';

  const texte = document.createElement('p');
  texte.textContent = raison;
  zone.appendChild(texte);

  const adresse = document.createElement('p');
  adresse.className = 'form-fallback-mail';
  adresse.textContent = DESTINATAIRE;
  zone.appendChild(adresse);

  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = 'btn-copier';
  bouton.textContent = 'Copier mon message';
  bouton.addEventListener('click', () => {
    const contenu = objet + '\n\n' + corps;
    const fini = () => { bouton.textContent = 'Message copié'; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(contenu).then(fini, () => copierAncienneMethode(contenu, fini));
    } else {
      copierAncienneMethode(contenu, fini);
    }
  });
  zone.appendChild(bouton);
}

// Repli pour les navigateurs sans presse-papier moderne, ou servis hors HTTPS.
function copierAncienneMethode(contenu, fini) {
  const zone = document.createElement('textarea');
  zone.value = contenu;
  zone.setAttribute('readonly', '');
  zone.style.position = 'absolute';
  zone.style.left = '-9999px';
  document.body.appendChild(zone);
  zone.select();
  try { document.execCommand('copy'); fini(); } catch (e) { /* rien à faire de plus */ }
  document.body.removeChild(zone);
}

function handleSubmit(e) {
  e.preventDefault();
  const zone = document.getElementById('confirm-msg');
  const { objet, corps } = composerMessage();

  const lien = 'mailto:' + DESTINATAIRE +
    '?subject=' + encodeURIComponent(objet) +
    '&body=' + encodeURIComponent(corps);

  if (lien.length > TAILLE_MAX_MAILTO) {
    afficherRepli(zone, objet, corps,
      'Votre message est un peu long pour être ouvert automatiquement. Copiez-le et envoyez-le à cette adresse :');
    return;
  }

  window.location.href = lien;

  // Impossible de savoir si la messagerie s'est réellement ouverte : certains
  // téléphones et certains navigateurs ignorent le lien en silence. On affiche
  // donc toujours de quoi s'en sortir à la main, un instant après.
  setTimeout(() => {
    afficherRepli(zone, objet, corps,
      'Votre messagerie devrait s\'ouvrir avec le message prêt à envoyer. Si rien ne se passe, copiez-le et envoyez-le à cette adresse :');
  }, 1200);
}
