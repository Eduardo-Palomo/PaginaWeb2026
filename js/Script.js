const slider = document.querySelector('.projects-container');
let isDown = false; // Esta variable controla si el click está apretado
let startX;
let scrollLeft;

// 1. Cuando presionas el click
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    // Desactivar el scroll snap para que no pelee con el arrastre manual
    slider.style.scrollSnapType = 'none';
    slider.style.scrollBehavior = 'auto';
    // Guardamos la posición exacta donde hiciste click
    startX = e.pageX - slider.offsetLeft;
    // Guardamos la posición actual del scroll
    scrollLeft = slider.scrollLeft;
});

// 2. Cuando sueltas el click
window.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
    slider.style.scrollSnapType = '';
    slider.style.scrollBehavior = 'smooth';
});

// 3. Cuando mueves el mouse
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Si NO tienes el click apretado, esta función se detiene aquí
    
    e.preventDefault(); // Evita que se seleccionen las imágenes mientras arrastras
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicamos por 2 para que el movimiento sea ágil
    slider.scrollLeft = scrollLeft - walk;
});

// 4. Seguridad: Si el mouse sale del contenedor, dejamos de arrastrar
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.scrollSnapType = '';
    slider.style.scrollBehavior = 'smooth';
});

// 5. Soporte para pantallas táctiles (Celulares y Tablets)
if (slider) {
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.style.scrollSnapType = 'none';
        slider.style.scrollBehavior = 'auto';
        // En pantallas táctiles, las posiciones vienen dentro del arreglo 'touches'
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDown = false;
        slider.style.scrollSnapType = '';
        slider.style.scrollBehavior = 'smooth';
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador de velocidad
        slider.scrollLeft = scrollLeft - walk;
    }, { passive: true });
}

window.addEventListener('scroll', () => {
    const video = document.getElementById('hero-video');
    const scrollPos = window.scrollY; // Obtiene cuánto ha bajado el usuario

    // Si el usuario baja más de 100px, el video desaparece
    // Si regresa al inicio (0px), el video vuelve a aparecer
    if (scrollPos > 100) {
        video.classList.remove('video-visible');
    } else {
        // Opcional: Quita esto si quieres que una vez que se vaya ya no vuelva
        video.classList.add('video-visible'); 
    }
});

// Reproducir video al hacer hover en las tarjetas de proyecto
const projectCards = document.querySelectorAll('.project-card');
let currentlyPlaying = null; // Guarda el video que se está reproduciendo actualmente

projectCards.forEach(card => {
    const video = card.querySelector('.hover-video');
    if (video) {
        card.addEventListener('mouseenter', () => {
            // Si hay otro video reproduciéndose, lo pausamos y reiniciamos
            if (currentlyPlaying && currentlyPlaying !== video) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }

            // Intentamos reproducir el video actual
            video.play().then(() => {
                currentlyPlaying = video;
            }).catch(error => {
                console.log("No se pudo reproducir el video:", error);
            });
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            // Opcional: reiniciar el video al inicio cuando se quita el mouse
            video.currentTime = 0;
            
            if (currentlyPlaying === video) {
                currentlyPlaying = null;
            }
        });
    }
});