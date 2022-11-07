const municipio_select = document.querySelector('.municipio-select');
const asentamientos = document.querySelectorAll('.asentamiento');

console.log(asentamientos.length);

municipio_select.addEventListener('change', () => {
    asentamientos.forEach(asentamientos => {
        asentamientos.classList.add('inactive');
    })

    const asentamientos_disponibles = document.querySelectorAll(`.municipioId-${municipio_select.value}-`);

    asentamientos_disponibles.forEach(asentamientos => {
        asentamientos.classList.remove('inactive');
    })
})