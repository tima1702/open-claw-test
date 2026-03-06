// Simple click & scroll tracking for MVP
(function () {
  var events = JSON.parse(localStorage.getItem('oc_events') || '[]');

  function track(name, data) {
    var event = {
      event: name,
      data: data || {},
      time: new Date().toISOString(),
      url: location.href
    };
    events.push(event);
    localStorage.setItem('oc_events', JSON.stringify(events));
    console.log('[track]', name, data);
  }

  // Track page view
  track('pageview');

  // Track CTA clicks
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      track('click', { target: el.getAttribute('data-track') });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(el.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Handle form submissions via fetch (no redirect)
  document.querySelectorAll('.form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var trackName = form.getAttribute('data-track') || 'form_submit';
      track(trackName, {
        name: data.get('name'),
        telegram: data.get('telegram')
      });

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          var success = form.parentElement.querySelector('.form-success');
          form.style.display = 'none';
          var hint = form.parentElement.querySelector('.form-card__hint');
          if (hint) hint.style.display = 'none';
          var text = form.parentElement.querySelector('.form-card__text, .modal__text');
          if (text) text.style.display = 'none';
          if (success) success.style.display = 'block';
        }
      });
    });
  });

  // Track scroll depth
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var percent = Math.round((scrollTop / docHeight) * 100);

    for (var mark in scrollMarks) {
      if (!scrollMarks[mark] && percent >= parseInt(mark)) {
        scrollMarks[mark] = true;
        track('scroll', { depth: mark + '%' });
      }
    }
  });

  // Track time on page (every 30s, up to 5 min)
  var timeChecks = [30, 60, 120, 180, 300];
  timeChecks.forEach(function (sec) {
    setTimeout(function () {
      track('time_on_page', { seconds: sec });
    }, sec * 1000);
  });
})();
