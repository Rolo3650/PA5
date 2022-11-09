//script para mostrar la opcion de eliminar publicacion
const eliminar =document.querySelectorAll('.trash');

eliminar.forEach(borrar =>{
    borrar.addEventListener('click', ()=>{
        if(borrar.id != 'delete'){
            document.querySelector('.container-publicaciones .head ul.edit li.enc_').style.display = 'none';
        }else{
            document.querySelector('.container-publicaciones .head ul.edit li.enc_').style.display = 'block';
        }
    })
})