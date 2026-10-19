(function () {
  'use strict';

  var burger = document.querySelector('.header__burger');
  var nav = document.querySelector('.header__nav');
  var mobile = window.matchMedia('(max-width: 768px)');

  function setMenu(open) {
    if (!burger || !nav) return;
    nav.classList.toggle('header__nav--open', open);
    nav.inert = mobile.matches && !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }

  if (burger && nav) {
    setMenu(false);
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });
    mobile.addEventListener('change', function () { setMenu(false); });
  }

  var form = document.querySelector('.contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var copyButton = form.querySelector('[data-copy-message]');
  var recipient = form.getAttribute('action').replace(/^mailto:/, '');
  var draft = '';

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();
    var message = String(data.get('message') || '').trim();
    if (!name || !message) {
      status.textContent = 'Укажите имя и опишите задачу - поля не должны состоять только из пробелов.';
      return;
    }
    draft = 'Здравствуйте!\n\n' + message + '\n\n' + name + '\nПочта для ответа: ' + email;
    var subject = 'Обсуждение сайта - ' + name.replace(/[\r\n]/g, ' ');
    copyButton.hidden = false;
    status.textContent = 'Письмо подготовлено. Отправьте его из почтового приложения. Если оно не открылось, скопируйте текст и отправьте на ' + recipient + '.';
    window.location.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(draft);
  });

  copyButton.addEventListener('click', async function () {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft);
      status.textContent = 'Текст скопирован. Отправьте письмо на ' + recipient + '.';
    } catch {
      status.textContent = 'Браузер не разрешил копирование. Скопируйте текст из заполненных полей и отправьте на ' + recipient + '.';
    }
  });
})();
