import React, { useEffect, useState } from 'react'
import { dbFirebase } from "../database/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "@firebase/firestore";

function Header() {
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [edad, setEdad] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const mascotaCollection = collection(dbFirebase, "mascotas")
    const [listaMascotas, setListaMascota] = useState([]);
    const[elID, setID] = useState("");

    //! AGREGAR UNA NUEVA MASCOTA
    const AgregarMascota = async (event) =>{
        event.preventDefault()
        await addDoc(mascotaCollection, {
            Nombre: nombre,
            Genero: genero,
            Edad: edad,
            Descripcion: descripcion
        });
        console.log("Mascota agregado correctamente")
    }

    //! ELIMINAR UNA MASCOTA
    const eliminarMascota = async(id)=>{
      const mascotaDoc = doc(dbFirebase, 'mascotas', id)
      await deleteDoc(mascotaDoc)
    }

    //! CARGAR DATOS
    const cargarDatos = async(id)=>{
      const mascotaDoc = doc(dbFirebase, 'mascotas', id)
      const datos = await getDoc(mascotaDoc);
      const laMascota = datos.data()
      setNombre(laMascota.Nombre)
      setGenero(laMascota.Genero)
      setEdad(laMascota.Edad)
      setDescripcion(laMascota.Descripcion)
      setID(id)
    }

    //! EDITAR LOS DATOS DE LA CARD
    const editarMascota = async(e) => {
      e.preventDefault()
      const mascotaDoc = doc(dbFirebase, 'mascotas', elID)
      await updateDoc(mascotaDoc, {Nombre: nombre, Genero: genero, Edad: Number(edad), Descripcion: descripcion})
    }

    //! MANDAR A LLAMAR LOS DATOS DE LA BASE DE DATOS
    const mostrarMascotas = async()=>{
        const datos = await getDocs(mascotaCollection)
        setListaMascota(
            datos.docs.map((registro) => ({
                ...registro.data(),
                id: registro.id,
            }))
        );
    };
    

    {/*MOSTRAR LOS DATOS EN LA INTERFAZ DESPUES DE RENDERIZAR LA PÁGINA */}
    
    useEffect(()=>{
        mostrarMascotas();
    });
  return (
    <>
    <div className="App">
      
    <div className='header d-flex align-items-center justify-content-between'>
  <img src='https://cdn-icons-png.flaticon.com/512/5019/5019931.png' className="img-fluid" alt="Logo" />
  <h1 className="mb-0 mx-3">AdoPets</h1>
  <button type="button" className="btn btn-outline-dark ms-auto" style={{ marginRight: '80px' }} data-bs-toggle="modal" data-bs-target="#exampleModal">Nueva Mascota</button>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar nueva mascota</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form onSubmit={AgregarMascota}>
            <label>Nombre:</label>
            <input type='text' placeholder='Ingresa nombre de la mascota' class="form-control" onChange={(e) => setNombre(e.target.value)}/>
            <label>Genero:</label>
            <input type='text' placeholder='Hembra o macho' class="form-control" onChange={(e) => setGenero(e.target.value)}/>
            <label>Edad:</label>
            <input type='number' placeholder='Ingresa edad de la mascota' class="form-control" onChange={(e)=> setEdad(e.target.value)}/>
            <label>Descripción:</label>
            <input type='text' placeholder='Color, tamaño, comportamiento...' class="form-control" onChange={(e)=> setDescripcion(e.target.value)}/>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Agregar</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div>
<div className='fondo'>

{/* MOSTRAR LOS DATOS EN LA INTERFAZ POR MEDIO DE CARDS */}
{
            listaMascotas.map((laMascota)=>{
                return(
                    <>
                    <div className='col-md-3'>
                    <div className='card_mascota'>
                      <h1>{laMascota.Nombre}</h1>
                      <p>Genero: {laMascota.Genero}</p>
                      <p>Edad: {laMascota.Edad}</p>
                      <p>Descripcion: {laMascota.Descripcion}</p>
                      <button type="button" class="btn btn-outline-primary" onClick={()=>{cargarDatos(laMascota.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal2">Editar</button>
                      <button type="button" class="btn btn-outline-danger" onClick={()=>{eliminarMascota(laMascota.id)}}>Eliminar</button>
                    </div>
                    </div>
                    </>
                )
            })
        }

<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar mascota</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={editarMascota}>
            <label>Nombre:</label>
            <input type='text' placeholder='Ingresa nombre de la mascota' class="form-control" onChange={(e) => setNombre(e.target.value)} value={nombre}/>
            <label>Genero:</label>
            <input type='text' placeholder='Hembra o macho' class="form-control" onChange={(e) => setGenero(e.target.value)} value={genero}/>
            <label>Edad:</label>
            <input type='number' placeholder='Ingresa edad de la mascota' class="form-control" onChange={(e)=> setEdad(e.target.value)} value={edad}/>
            <label>Descripción:</label>
            <input type='text' placeholder='Color, tamaño, comportamiento...' class="form-control" onChange={(e)=> setDescripcion(e.target.value)} value={descripcion}/>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    </div>
    </>
  )
}

export default Header
