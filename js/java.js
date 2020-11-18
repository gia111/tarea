const tema = document.getElementById('tema');
const celular = document.getElementById('celular');
const celular0 = document.getElementById('celular0');
const celular1 = document.getElementById('celular1');
const correo = document.getElementById('correo');
const correo0 = document.getElementById('correo0');
const correo1 = document.getElementById('correo1');
const relacion=document.getElementById('relacion');
const descripcion=document.getElementById('descripcion');
const lista = document.getElementById('lista');
const guardar_btn = document.getElementById('guardar-btn');
let notas = []

guardar_btn.addEventListener('click',()=>{
    
    if(tema.value!=""&& celular.value!=""&& celular0.value!=""&& celular1.value!=""&&correo.value!=""&&correo0.value!=""&&correo1.value!=""&&relacion.value!=""&&descripcion.value!="")
    {
        let data = {
            tema:tema.value,
            celular:celular.value,
            celular0:celular0.value,
            celular1:celular1.value,
            correo:correo.value,
            correo0:correo0.value,
            correo1:correo1.value,
            relacion:relacion.value ,
            descripcion:descripcion.value
        }
        

        notas.push(data)

        guardar()
        listar()
       
    }
    else{
        alert("complete todos los campos")
    }
    })

function guardar(){
    localStorage.setItem('cajas',JSON.stringify(notas))
    tema.value = ''
    celular.value = ''
    celular0.value = ''
    celular1.value = ''
    correo.value = ''
    correo0.value = ''
    correo1.value = ''
    relacion.value =''
    descripcion.value=''
}

function  listar(){
    try{
        
        if(!!JSON.parse(localStorage.getItem('cajas')))
        {
            notas = JSON.parse(localStorage.getItem('cajas'))
        }
        else{
            notas = []
        }
        
        notas.sort(function (a,b){
            if(a.tema > b.tema)
            {
                return 1;
            }
            else if(a.tema < b.tema)
            {
                return -1;
            }
            else{
                return 0;
            }
        });
        lista.innerHTML = ''
        for(item of notas)
        {
            lista.insertAdjacentHTML('beforeend',`
                    <div class="container-person">
                    <img src="img/avatar.png" alt="avatar">
                    <div class="container-data">
                        <div class="datos">
                            <div>${item.tema}</div>
                            <div>${item.celular}</div><div>${item.celular0}</div><div>${item.celular1}</div>
                            <div>${item.correo}</div><div>${item.correo0}</div><div>${item.corre1}</div>
                            <div>${item.tipo}</div>
                            <div>${item.descripcion}</div>
                        </div>
                       
                        <div>
                            <span class="mdi mdi-pencil" id="openModal"></span>
                            <span class="mdi mdi-delete" id="delete"></span>
                        </div>
                    </div>
                </div>
            `)
        }
    }
    catch(e){
        console.log(e)
    }
    
}
listar()
lista.addEventListener('click',(event)=>{
    if(event.target.matches('#delete'))
    {
        console.log(event.target.parentNode.previousElementSibling.lastElementChild.innerHTML)
        eliminar(event.target.parentNode.previousElementSibling.lastElementChild.innerHTML)
    }
    else if(event.target.matches('#openModal'))
    {
        editar(event.target.parentNode.previousElementSibling.lastElementChild.innerHTML)
    }
})

function eliminar(c)
{
    let indicenotas = notas.findIndex(e=>e.correo == c)
    let r =  notas.splice(indicenotas,1);
    guardar()
    listar();
}

function editar(c)
{
    let persona = notas.find(e=>e.correo==c)
    let modal = document.getElementById('editForm');
    let close_modal = document.getElementById('close-dialog')
    modal.showModal();

    let nom_edit = document.getElementById('TEMA-edit');
    let cel_edit = document.getElementById('celular-edit');
    let cel0_edit = document.getElementById('celular0-edit');
    let cel1_edit = document.getElementById('celular1-edit');
    let correo_edit = document.getElementById('correo-edit');
    let correo0_edit = document.getElementById('correo0-edit');
    let correo1_edit = document.getElementById('correo1-edit');
    let descripcion_edit = document.getElementById('describe-edit');
    let relacion_edit = document.getElementById('describe-edit');

    nom_edit.value = persona.tema;
    cel_edit.value = persona.celular;
    cel0_edit.value = persona.celular0;
    cel1_edit.value = persona.celular1;
    correo_edit.value = persona.correo;
    correo0_edit.value = persona.correo0;
    correo1_edit.value = persona.correo1;
    descripcion_edit = persona.descripcion;
    relacion_edit = persona.relacion;

    close_modal.addEventListener('click',()=>{
            modal.close();
        })

    let guardar_edit = document.getElementById('guardar-edit-btn')

    guardar_edit.addEventListener('click',()=>{
        persona.tema = nom_edit.value
        persona.celular = cel_edit.value
        persona.celular0 = cel0_edit.value
        persona.celular1 = cel1_edit.value

        guardar();
        listar();
        modal.close();
    })
}
