import React from 'react'

export const Primero = () => {
  return (
    <div>
      <p>
      <form>
      <p>
        <h2 >Abrir Archivo:</h2>
        <input type="file" id="cargamasi" name="jsonsubida1" accept="QC/qc, .qc, .QC"></input>
        <button class="btn btn-primary  rounded-pill " >Cargar</button>
      </p>
    </form>
    <p>
      <p>
        <h2>Guardar Archivo</h2>
      <button class="btn btn-primary  rounded-pill " >Guardar Archivo</button>
      </p>
    <p>
      <h2>Eliminar</h2>
    <button class="btn btn-primary  rounded-pill " >Eliminar Pestaña</button>
    </p>
    <p>
    <div>
      <h2>Crear nuevo Archivo</h2>
      <input type="text" name="nombre" id="miCajaDeTexto" placeholder="Escribe aquí..."></input>
      <button class="btn btn-primary  rounded-pill " >Nuevo Archivo</button>
    </div>
    </p>

    </p>

      </p>

    </div>
  )
}
