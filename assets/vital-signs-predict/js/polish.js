(function () {
  function reportProgress(progress, label) {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'vital-model-progress', progress: progress, label: label }, window.location.origin);
    }
  }

  function setCameraLayout(isActive) {
    var card = document.querySelector('.app-shell');
    var firstRect = card && card.getBoundingClientRect();
    if (isActive) document.body.classList.remove('results-active');
    document.body.classList.toggle('camera-active', isActive);

    if (!card || !firstRect || !card.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var lastRect = card.getBoundingClientRect();
    var scaleX = lastRect.width ? firstRect.width / lastRect.width : 1;
    var scaleY = lastRect.height ? firstRect.height / lastRect.height : 1;
    card.animate([
      {
        transformOrigin: 'top left',
        transform: 'translate(' + (firstRect.left - lastRect.left) + 'px,' + (firstRect.top - lastRect.top) + 'px) scale(' + scaleX + ',' + scaleY + ')'
      },
      { transformOrigin: 'top left', transform: 'none' }
    ], {
      duration: 420,
      easing: 'cubic-bezier(.22,.8,.25,1)'
    });
  }

  function polishResults(results) {
    if (results.dataset.polished === 'true') return;

    var labels = { AGE: 'Age', BMI: 'BMI', HR: 'Heart rate', RR: 'Respiratory rate' };
    results.querySelectorAll('li').forEach(function (item) {
      var match = item.textContent.trim().match(/^(AGE|BMI|HR|RR)\s*:\s*(.*)$/i);
      if (!match) return;

      var key = match[1].toUpperCase();
      var value = match[2].replace(/\+\/-/g, '±');
      item.classList.add('prediction-card', 'prediction-card--' + key.toLowerCase());
      item.innerHTML = '<span class="prediction-card__label">' + labels[key] + '</span><strong class="prediction-card__value">' + value + '</strong>';
    });
    results.dataset.polished = 'true';
  }

  function watchResults() {
    var results = document.getElementById('results');
    if (!results) return;

    function syncResultsState() {
      var isVisible = window.getComputedStyle(results).display !== 'none';
      document.body.classList.toggle('results-active', isVisible);
      if (isVisible) {
        document.body.classList.remove('camera-active');
        polishResults(results);
      }
    }

    new MutationObserver(syncResultsState).observe(results, {
      attributes: true,
      attributeFilter: ['style'],
      childList: true,
      subtree: true
    });
    syncResultsState();
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.v-btn');
    if (!button) return;

    var label = button.textContent.trim().toLowerCase();
    if (label === 'start camera') setCameraLayout(true);
    if (label === 'stop camera') setCameraLayout(false);
  });

  reportProgress(20, 'Preparing the experiment…');

  function enhance() {
    var container = document.querySelector('#app .container');
    if (!container) return false;
    if (container.querySelector('.measurement-guide')) return true;

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
    watchResults();
    return true;
  }

  function watchModels() {
    var lastProgress = 0;
    var pollTimer;
    function inspect() {
      var text = document.body.textContent || '';
      var progress = 58;
      var label = 'Loading prediction models…';
      if (/loading BMI model/i.test(text)) {
        progress = 56;
        label = 'Loading BMI and age model…';
      } else if (/loading Pulse model/i.test(text)) {
        progress = 78;
        label = 'Loading pulse model…';
      } else if (document.querySelector('#app .v-btn')) {
        progress = 100;
        label = 'Models ready';
      }
      if (progress !== lastProgress) {
        lastProgress = progress;
        reportProgress(progress, label);
      }
      if (progress === 100) {
        observer.disconnect();
        window.clearInterval(pollTimer);
      }
    }
    var observer = new MutationObserver(inspect);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['disabled'] });
    pollTimer = window.setInterval(inspect, 600);
    inspect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(function () { enhance(); watchModels(); }, 0); });
  } else {
    setTimeout(function () { enhance(); watchModels(); }, 0);
  }
}());
