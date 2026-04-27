document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar componentes reutilizables
    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('footer-placeholder', 'footer.html');

    // 2. Inicializar iconos después de un tiempo prudencial
    setTimeout(() => {
        lucide.createIcons();
    }, 700);
});

// Función para cargar HTML externo
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(id).innerHTML = content;
            
            // Si cargamos el navbar, ejecutamos la lógica de link activo
            if (file === 'navbar.html' && typeof setActiveNavLink === 'function') {
                setActiveNavLink();
            }
            
            lucide.createIcons(); 
        }
    } catch (error) {
        console.error('Error cargando componente:', file, error);
    }
}

// Función para marcar el enlace activo
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            if (link.classList.contains('nav-link')) {
                link.classList.add('nav-link-active');
            } else {
                link.classList.add('mobile-nav-link-active');
            }
        }
    });
}

// Función para el menú móvil Full Screen (Corregida para bloquear scroll)
function toggleMobileMenu() {
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;

    if (menuOverlay) {
        const isClosed = menuOverlay.classList.contains('translate-x-full');
        
        if (isClosed) {
            // Abrir menú
            menuOverlay.classList.remove('translate-x-full');
            body.style.overflow = 'hidden'; // Bloquea el scroll del sitio
        } else {
            // Cerrar menú
            menuOverlay.classList.add('translate-x-full');
            body.style.overflow = ''; // Restaura el scroll
        }
        lucide.createIcons();
    }
}

// Efecto de scroll en navbar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
            nav.style.padding = "4px 0";
        } else {
            nav.classList.remove('scrolled');
            nav.style.padding = "0";
        }
    }
});