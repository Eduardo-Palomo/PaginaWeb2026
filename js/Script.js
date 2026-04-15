const slider = document.querySelector('.projects-container');
let isDown = false; // Esta variable controla si el click está apretado
let startX;
let scrollLeft;

// 1. Cuando presionas el click
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    // Guardamos la posición exacta donde hiciste click
    startX = e.pageX - slider.offsetLeft;
    // Guardamos la posición actual del scroll
    scrollLeft = slider.scrollLeft;
});

// 2. Cuando sueltas el click
window.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
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
});

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