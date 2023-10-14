import './App.css';
import { Primero } from './componentes/Primero';
import { Segundo } from './componentes/Segundo';
import { Tercero } from './componentes/Tercero';

function App() {
  const url = "http://localhost:4000"
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
        <Primero />
        <Segundo />
        <Tercero />
      </section>
      <section id="repomensajes">
          <div class="container px-5">
            <div class="row gx-5 align-items-center">
              <div class=" order-lg-1">
                <div class="p-2">
                <p><button class="btn btn-primary  rounded-pill " >Reporte de Tokens</button></p>
                <p><button class="btn btn-primary  rounded-pill " >Reporte de Errores</button></p>
                <p><button class="btn btn-primary  rounded-pill " >Reporte de Tabla de simbolos</button></p>
                <p><button class="btn btn-primary  rounded-pill " >Generar Arbol de Analisis Sintactico</button></p>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

export default App;
