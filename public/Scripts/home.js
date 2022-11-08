//sidebar
const menuItems = document.querySelectorAll('.menu-item');
//contenidos
const opciones = document.querySelectorAll('.op');
//custm
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span')
const Bg1 = document.querySelector('.bg-1')
const Bg2 = document.querySelector('.bg-2')
//crear
const Crear = document.querySelector('.contenedor');
const publi = document.querySelector('#create-post');

//remove active class for all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
//opciones de publicacion
opciones.forEach(opi => {
    opi.addEventListener('click', () => {
        if (opi.id != 'c1') {
            document.querySelector('.contenido1').style.display = 'none';
        } else {
            document.querySelector('.contenido1').style.display = 'block';
        }
    })
})

opciones.forEach(opi => {
    opi.addEventListener('click', () => {
        if (opi.id != 'c2') {
            document.querySelector('.contenido2').style.display = 'none';
        } else {
            document.querySelector('.contenido2').style.display = 'block';
        }
    })
})

opciones.forEach(opi => {
    opi.addEventListener('click', () => {
        if (opi.id != 'c3') {
            document.querySelector('.contenido3').style.display = 'none';
        } else {
            document.querySelector('.contenido3').style.display = 'block';
        }
    })
})

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
        }
    })
})


//opens modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}
//close modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}
themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);

fontSizes.forEach(size => {
    let fontSize;
    size.addEventListener('click', () => {
        if (size.classList.contains('font-size-1')) {
            fontSize = '10px'
            root.style.setProperty(' --sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '5.4rem')
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px'
            root.style.setProperty(' --sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '-7rem')
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px'
            root.style.setProperty(' --sticky-top-left', '-2rem')
            root.style.setProperty('--sticky-top-right', '-17rem')
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px'
            root.style.setProperty(' --sticky-top-left', '-5rem')
            root.style.setProperty('--sticky-top-right', '-25rem')
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px'
            root.style.setProperty(' --sticky-top-left', '-12rem')
            root.style.setProperty('--sticky-top-right', '-35rem')
        }
        document.querySelector('html').style.fontSize = fontSize;
    })
})
//change primary colors
colorPalette.forEach(color => {
    let primaryHue
    color.addEventListener('click', () => {
        if (color.classList.contains('color-1')) {
            primaryHue = 304;
        } else if (color.classList.contains('color-2')) {
            primaryHue = 41;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 168;
        }
        root.style.setProperty('--primary-color-hue', primaryHue)
    })
})
//change background
let whiteColorLightness
let darkColorLightness

const changeBG = () => {
    root.style.setProperty('--white-color-lightness', whiteColorLightness)
    root.style.setProperty('--dark-color-lightness', darkColorLightness)
}

Bg1.addEventListener('click', () => {
    Bg1.classList.add('active')
    Bg2.classList.remove('active')

    window.location.reload();
})

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';

    Bg2.classList.add('active');
    Bg1.classList.remove('active');
    changeBG();
})

//crearp

const openCrear = () => {
    Crear.style.display = 'grid';
}

const closeCrear = (e) => {
    if (e.target.classList.contains('contenedor')) {
        Crear.style.display = 'none';
    }
}
Crear.addEventListener('click', closeCrear);
publi.addEventListener('click', openCrear);

//onclick
function Usuarios() {
    location.href = "ControlUsuarios.ejs";
}
function BackHome() {
    location.href = "AdminHome.ejs";
}