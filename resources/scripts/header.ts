// Function to toggle menu classes
function toggleMenuClasses(): void {
    const elementsToToggle = document.querySelectorAll(
      '.header .center-right .child-2, .header .promo-menu, .header .center-right, ' +
      '.header .container-logo, .mobile-toggle-button, .mobile-close-button, ' +
      '.header .left, .header .right, .separator-menu, .carousel'
    );
  
    elementsToToggle.forEach((element: Element) => {
      element.classList.toggle("open");
    });
  }

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header') as HTMLElement; 

    if (header) {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > 100) {
            header.classList.add('header-reduced');
        } else {
            header.classList.remove('header-reduced');
        }
    }
});
  
  // Event listener for mobile toggle button
  const mobileToggleButton = document.querySelector(".mobile-toggle-button");
  mobileToggleButton?.addEventListener("click", function(event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.classList.add("clicked");
    event.stopPropagation();
    setTimeout(toggleMenuClasses, 500);
  });
  
  // Event listener for mobile close button
  const mobileCloseButton = document.querySelector(".mobile-close-button");
  mobileCloseButton?.addEventListener("click", function() {
    setTimeout(() => {
      toggleMenuClasses();
      const toggleButton = document.querySelector('.mobile-toggle-button') as HTMLElement;
      toggleButton.classList.toggle("clicked");
      document.body.classList.remove('no-scroll');
    }, 500);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const mobileToggleButton = document.querySelector('.mobile-toggle-button');
    
    if (mobileToggleButton) {
      mobileToggleButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'auto', 
        });
        if (mobileToggleButton.classList.contains('clicked')) {
          // Le bouton est ouvert, désactiver le défilement
          document.body.classList.add('no-scroll');
        } else {
          // Le bouton est fermé, réactiver le défilement
          document.body.classList.remove('no-scroll');
        }
      });
    }
  });

  let leaveTimeoutId = null;
// Fonction pour retirer les gestionnaires d'événements de survol
function removeHoverEvents(menu) {
  menu.removeEventListener('mouseenter', handleMouseEnter);
  menu.removeEventListener('mouseleave', handleMouseLeave);
  // Assurez-vous de retirer également les gestionnaires pour les menus déroulants
  const dropdownMenu = menu.querySelector('.dropdown-menu');
  dropdownMenu.removeEventListener('mouseenter', handleDropdownMouseEnter);
  dropdownMenu.removeEventListener('mouseleave', handleDropdownMouseLeave);
}

// Fonction pour retirer les gestionnaires d'événements de clic
function removeClickEvents(menu) {
  menu.removeEventListener('click', handleClick);
}

// Gestionnaire d'événement de survol pour le menu
function handleMouseEnter() {
  clearTimeout(leaveTimeoutId);
  closeOtherMenus(this);
  toggleMenu(this, true);
}

// Gestionnaire d'événement de survol pour le menu déroulant
function handleDropdownMouseEnter() {
  clearTimeout(leaveTimeoutId);
}

// Gestionnaire d'événement de sortie de survol pour le menu
function handleMouseLeave() {
  leaveTimeoutId = setTimeout(() => toggleMenu(this, false), 500);
}

// Gestionnaire d'événement de sortie de survol pour le menu déroulant
function handleDropdownMouseLeave() {
  leaveTimeoutId = setTimeout(() => toggleMenu(this, false), 500);
}

// Gestionnaire d'événement de clic pour le menu
function handleClick() {
  const isActive = this.classList.contains('active');
  closeOtherMenus(this);
  toggleMenu(this, !isActive);
}

// Fonction pour fermer tous les autres menus sauf celui spécifié
function closeOtherMenus(currentMenu) {
  const menus = document.querySelectorAll('.menu1, .menu3');
  menus.forEach((otherMenu) => {
    if (otherMenu !== currentMenu) {
      toggleMenu(otherMenu, false);
    }
  });
}

// Fonction pour initialiser les gestionnaires d'événements basée sur la taille de la fenêtre
function setupMenuToggle() {
  const menus = document.querySelectorAll('.menu1, .menu3');
  if (window.innerWidth > 633) {
    menus.forEach(menu => {
      removeClickEvents(menu); // Retirer les gestionnaires d'événements de clic
      menu.addEventListener('mouseenter', handleMouseEnter);
      menu.addEventListener('mouseleave', handleMouseLeave);
      // Ajouter les gestionnaires d'événements pour le menu déroulant
      const dropdownMenu = menu.querySelector('.dropdown-menu');
      dropdownMenu.addEventListener('mouseenter', handleDropdownMouseEnter);
      dropdownMenu.addEventListener('mouseleave', handleDropdownMouseLeave);
    });
  } else {
    menus.forEach(menu => {
      removeHoverEvents(menu); // Retirer les gestionnaires d'événements de survol
      menu.addEventListener('click', handleClick);
    });
  }
}

// Ajouter un écouteur pour les changements de taille de fenêtre
window.addEventListener('resize', function() {
  clearTimeout(leaveTimeoutId); // Annuler tout délai de sortie existant
  setupMenuToggle();
});

setupMenuToggle();

  
  // Modifier la fonction toggleMenu pour accepter un second paramètre 'activate'
  function toggleMenu(menuElement, activate) {
    const dropdownMenu = menuElement.querySelector('.dropdown-menu');
    const menuToggleLine = menuElement.querySelector('.menu-toggle-line'); // Vérifiez que c'est le bon sélecteur.
    const menuToggle = menuElement.querySelector('.menu-toggle');
  
    if (activate) {
      menuElement.classList.add('active');
      if (dropdownMenu) dropdownMenu.style.display = 'flex';
      if (menuToggleLine) menuToggleLine.style.display = 'flex';
      if (menuToggle) menuToggle.classList.add('active');
    } else {
      menuElement.classList.remove('active');
      if (dropdownMenu) dropdownMenu.style.display = 'none';
      if (menuToggleLine) menuToggleLine.style.display = 'none';
      if (menuToggle) menuToggle.classList.remove('active');
    }
  }
  
  // Ajouter un écouteur pour les changements de taille de fenêtre
  window.addEventListener('resize', setupMenuToggle);
  
  // Appeler setupMenuToggle au démarrage pour configurer les gestionnaires d'événements appropriés
  setupMenuToggle();

  const button = document.querySelector('.mobile-close-button');

  if (button) {
    button.addEventListener('click', function() {
        button.classList.add('pulsate');
        setTimeout(() => {
            button.classList.remove('pulsate');
        }, 500);
    });
  }

  function ajusterLargeur(): void {
    const largeurBody: number = document.body.clientWidth; // Largeur du body
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown-menu');
  
    elements.forEach((element: HTMLElement) => {
      element.style.width = `${largeurBody * 0.8}px`; // 80% de la largeur du body
    });
}
ajusterLargeur();

// Réajuster si la fenêtre est redimensionnée
window.onresize = ajusterLargeur;


document.addEventListener('DOMContentLoaded', () => {
  const btnSeConnecter = document.querySelector('.btn_se-connecter > div') as HTMLElement;
  const cardDropdown = document.querySelector('.card') as HTMLElement;
  let hideDropdownTimeoutId: number;

  // Cette fonction montre le dropdown et ferme les autres menus
function showDropdown() {
  if (cardDropdown) {
    cardDropdown.style.display = 'block';
    // Fermez les autres menus si ce dropdown est maintenant ouvert
    closeOtherMenus(cardDropdown);
  }
}

  function hideDropdown() {
    hideDropdownTimeoutId = window.setTimeout(() => {
      if (cardDropdown && !cardDropdown.matches(':hover')) {
        cardDropdown.style.display = 'none';
      }
    }, 300); // Délai de 300 ms
  }

  function cancelHideDropdown() {
    clearTimeout(hideDropdownTimeoutId);
  }

  // Cette fonction bascule l'affichage du dropdown et ferme les autres menus
function toggleDropdownOnClick() {
  const isDisplayed = cardDropdown && cardDropdown.style.display === 'block';
  if (cardDropdown) {
    cardDropdown.style.display = isDisplayed ? 'none' : 'block';
    // Fermez les autres menus si ce dropdown est maintenant ouvert
    if (!isDisplayed) {
      closeOtherMenus(cardDropdown);
    }
  }
}

  // Mettez en place la commutation pour .btn_se-connecter > div
function setupSeConnecterToggle() {
  if (window.innerWidth > 633) {
    btnSeConnecter?.addEventListener('mouseenter', () => {
      showDropdown();
      closeOtherMenus(btnSeConnecter);
    });
    btnSeConnecter?.addEventListener('mouseleave', hideDropdown);
    cardDropdown?.addEventListener('mouseenter', cancelHideDropdown);
    cardDropdown?.addEventListener('mouseleave', hideDropdown);
    // Assurez-vous de retirer le gestionnaire de clic s'il est défini
    btnSeConnecter?.removeEventListener('click', toggleDropdownOnClick);
  } else {
    btnSeConnecter?.addEventListener('click', () => {
      toggleDropdownOnClick();
      closeOtherMenus(btnSeConnecter);
    });
    // Retirer les évènements de survol si nécessaire
    btnSeConnecter?.removeEventListener('mouseenter', showDropdown);
    btnSeConnecter?.removeEventListener('mouseleave', hideDropdown);
    cardDropdown?.removeEventListener('mouseenter', cancelHideDropdown);
    cardDropdown?.removeEventListener('mouseleave', hideDropdown);
  }
}

  window.addEventListener('resize', setupSeConnecterToggle);
  setupSeConnecterToggle();
});