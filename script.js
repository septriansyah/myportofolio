
  const sendButton = document.querySelector('button[type="submit"]');

  sendButton.addEventListener('click', function (e) {
    e.preventDefault();

    const inputName = document.querySelector('.chat1');
    const inputMessage = document.querySelector('.chat');

    const nameValue = inputName.value;
    const messageValue = inputMessage.value;

    inputName.value = '';
    inputMessage.value = '';
  });
    const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  menuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.hasAttribute('hidden');

    if (isHidden) {
      mobileMenu.removeAttribute('hidden');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
    } else {
      mobileMenu.setAttribute('hidden', '');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  });