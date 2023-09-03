const cols = document.querySelectorAll('.col');
const modalSuccesCopy = document.querySelector('.succes-copy-color');
const changeColorButton = document.querySelector('.change-color');

document.addEventListener('keydown', event => {
  
  if (event.code.toLowerCase() === 'space') {
    event.preventDefault();
    setRandomColor();
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type;

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
      ?  event.target
      :  event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClipboard(event.target.innerText);
    modalSuccesCopy.classList.toggle('active');

    setTimeout(() => {
      modalSuccesCopy.classList.remove('active');
    }, 1000)
  } else if (event.target.classList.contains('change-color')) {
    setRandomColor();
  }
})

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function setRandomColor() {
  cols.forEach(col => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('.col__text');
    const color = chroma.random();
    const lock = col.querySelector('.col__button');

    if (isLocked) {
      return;
    }

    text.innerText = color;
    col.style.backgroundColor = color;

    setTextColor(text, color, lock);
  })
}

function setTextColor(text, color, lock) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
  lock.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColor();