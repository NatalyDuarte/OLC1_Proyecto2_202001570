import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Tu código de componente aquí

var nombre;

function App() {
  const [data,setdata]= useState([]);
  useEffect(() => {
  }, [])
  
  function RepoTokens(event){
    event.preventDefault();
    axios.get("http://localhost:4000/repoto")
    .then((response)=>{
      setdata(response.data.data)
    })
  }
  function RepoErrores(event){
    event.preventDefault();
    axios.get("http://localhost:4000/repoerror")
    .then((response)=>{
      setdata(response.data.data)
    })
  }
  function RepoTaSim(event){
    event.preventDefault();
    axios.get("http://localhost:4000/reposim")
    .then((response)=>{
      setdata(response.data.data)
    })
  }
  function RepoAST(event){
    event.preventDefault();
    axios.get("http://localhost:4000/repoast")
    .then((response)=>{
      setdata(response.data.data)
    })
  }
  function Eliminar(event){
    event.preventDefault();
    document.getElementById('entrada').value = '';
  }
  function Guarda(event){
    event.preventDefault();
    var documento = document.getElementById('entrada').value;
    const blob = new Blob([documento], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.textContent = nombre;
    //document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
  function CrearArch(event){
    event.preventDefault();
    const contenido = ' ';
    var nombres = document.getElementById('nombrear').value;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombres;
    a.textContent = nombres;
    //document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
  function Mandar(event){
    event.preventDefault();
    var documento = document.getElementById('entrada').value;
    alert(documento);
    axios.post("http://localhost:4000/analizar",{
      entrada : documento
    }).then(
        (response)=>{
          console.log(response.data)
        }
    )
   /* axios.get("http://localhost:4000/getdata")
    .then((response)=>{
      setdata(response.data.data)
    })*/
  }
  function CargaAr(event){
    event.preventDefault();
    var documento = document.getElementById('cargamasi').files[0]
    nombre = document.getElementById('cargamasi').files[0].name
    if (documento) {
        let reader2 = new FileReader();
        reader2.onload = function(e) {
            let contenido2 = e.target.result;
            alert("¡ ARCHIVO LEIDO !")
            /*var nuevoContenido = document.createElement(nombre);
            let text = '<div id="'+nombre+'" class="tab">  <a href="#'+nombre+'">'+nombre+'</a> <div class="tab-content">';
            text += '<div><h2 >Entrada:</h2><textarea id='+nombre+' rows="20" cols="70">'+contenido2+'</textarea><p><button class="btn btn-primary  rounded-pill " >Ejecutar</button></p></div> </div>';
            nuevoContenido.innerHTML =text;
            document.getElementById("Entra").appendChild(nuevoContenido);*/
            //document.getElementById("Entra").innerHTML = text;
            document.getElementById("entrada").value = contenido2;
        }
        reader2.readAsText(documento);
    } else {
        alert("¡ ERROR ARCHIVO NO LEIDO !")
    }
  }
  return (
    <div className="App">
      <header class="masthead text-center text-white">
        <div class="masthead-content">
          <div class="container px-5">
              <h1 class="masthead-heading mb-0">Bienvenido</h1>
              <h2>Estudiante: Nataly Saraí Guzmán Duarte</h2>
              <h2>Compiladores 1</h2>
              <h5>Necesito 50 puntos o más</h5>
          </div>
        </div>
        <div class="bg-circle-1 bg-circle"></div>
        <div class="bg-circle-2 bg-circle"></div>
        <div class="bg-circle-3 bg-circle"></div>
      </header>
      <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div class="container px-5">
            <a class="navbar-brand" href="#page-top">Proyecto2</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#mostrarper">Ejecutar</a></li>
                    <li class="nav-item"><a class="nav-link" href="#repomensajes">Reportes</a></li>
                </ul>
            </div>
        </div>
      </nav>
      <section id="mostrarper">
      
      <form>
      <p>
        <h2 >Abrir Archivo:</h2>
        <input type="file" id="cargamasi" name="jsonsubida1" accept="QC/qc, .qc, .QC"></input>
        <button class="btn btn-primary  rounded-pill " onClick={CargaAr} >Cargar</button>
      </p>
    </form>
    <div class="tabs">
    <div class="tab-container">
    </div>
    </div>
    <p>
      <p>
        <h2>Guardar Archivo</h2>
      <button class="btn btn-primary  rounded-pill " onClick={Guarda} >Guardar Archivo</button>
      </p>
    <p>
      <h2>Eliminar</h2>
    <button class="btn btn-primary  rounded-pill " onClick={Eliminar} >Eliminar Pestaña</button>
    </p>
    <p>
    <div>
      <h2>Crear nuevo Archivo</h2>
      <input type="text" name="nombre" id="nombrear" placeholder="Escribe aquí..."></input>
      <button class="btn btn-primary  rounded-pill " onClick={CrearArch} >Nuevo Archivo</button>
    </div>
    </p>

    </p>
    <div id="Entra">
      <h2 >Entrada:</h2>
      <div class="background-color: black; height: 260px; width: 600px; border-radius: 1rem;">
        <textarea id="entrada" rows="20" cols="70">
        </textarea>
      </div>
      <p>
      <button class="btn btn-primary  rounded-pill " onClick = {Mandar} >Ejecutar</button>
      </p>
    </div>
    <div>
    <h2 >Salida:</h2>
    <div class="background-color: black; height: 260px; width: 600px; border-radius: 1rem;">
      <textarea rows="20" cols="70">
      </textarea>
    </div>
  </div>
      </section>
      <section id="repomensajes">
          <div class="container px-5">
            <div class="row gx-5 align-items-center">
              <div class=" order-lg-1">
                <div class="p-2">
                <p><button class="btn btn-primary  rounded-pill " onClick = {RepoTokens} >Reporte de Tokens</button></p>
                <p><button class="btn btn-primary  rounded-pill " onClick = {RepoErrores} >Reporte de Errores</button></p>
                <p><button class="btn btn-primary  rounded-pill " onClick = {RepoTaSim} >Reporte de Tabla de simbolos</button></p>
                <p><button class="btn btn-primary  rounded-pill " onClick = {RepoAST} >Generar Arbol de Analisis Sintactico</button></p>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

export default App;
