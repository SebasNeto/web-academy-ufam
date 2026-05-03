const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const images = ['anim1.png', 'anim2.png', 'anim3.png', 'anim4.png', 'anim5.png'];

const alts = {
  'anim1.png' : 'Cena do Shrek no pântano',
  'anim2.png' : 'Elsa usando seus poderes de gelo',
  'anim3.png' : 'Naruto correndo em direção à câmera',
  'anim4.png' : 'Mickey Mouse em seu barco',
  'anim5.png' : 'Totoro na parada de ônibus'
};

for (const image of images) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', alts[image]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', (e) => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
}

btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');

  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Clarear';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Escurecer';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});