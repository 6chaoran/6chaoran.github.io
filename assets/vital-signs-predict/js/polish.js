(function () {
  function enhance() {
    var container = document.querySelector('#app .container');
    if (!container || container.querySelector('.measurement-guide')) return;

    var intro = container.firstElementChild;
    var title = intro && intro.querySelector('b');
    var instruction = intro && intro.querySelector('p');

    if (title) title.textContent = 'Your browser becomes the sensor';
    if (instruction) instruction.textContent = 'Keep your face centered in the guide and remain still during the 15-second reading.';

    var guide = document.createElement('div');
    guide.className = 'measurement-guide';
    guide.setAttribute('aria-label', 'Measurement steps');
    guide.innerHTML = '<div class="measurement-guide__item"><span>01</span>Enable your camera</div><div class="measurement-guide__item"><span>02</span>Center your face</div><div class="measurement-guide__item"><span>03</span>Hold still to measure</div>';
    intro.insertAdjacentElement('afterend', guide);

    var buttons = container.querySelectorAll('.v-btn');
    buttons.forEach(function (button) {
      var label = button.textContent.trim().toLowerCase();
      if (label === 'start camera') button.setAttribute('aria-label', 'Enable camera');
      if (label === 'stop camera') button.setAttribute('aria-label', 'Disable camera');
      if (label === 'start recording') button.setAttribute('aria-label', 'Begin 15-second measurement');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(enhance, 0); });
  } else {
    setTimeout(enhance, 0);
  }
}());
