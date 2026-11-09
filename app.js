// Guardar las tareas en el navegador.
let tareas = JSON.parse(localStorage.getItem('tareasAgenda') || '[]');

function guardar() {
  localStorage.setItem('tareasAgenda', JSON.stringify(tareas));
}

function mostrar(pagina) {
  document.querySelectorAll('main section').forEach(seccion => seccion.hidden = true);
  document.getElementById(pagina).hidden = false;
  actualizar();
}

document.getElementById('formulario').addEventListener('submit', function(evento) {
  evento.preventDefault();
  let nombre = document.getElementById('nombre').value.trim();
  let fecha = document.getElementById('fecha').value;
  if (!nombre || !fecha) {
    document.getElementById('mensaje').textContent = 'Completa todos los campos.';
    return;
  }
  tareas.push({ nombre: nombre, fecha: fecha, completa: false });
  guardar();
  this.reset();
  document.getElementById('mensaje').textContent = 'Tarea guardada.';
  mostrar('tareas');
});

function completar(numero) {
  tareas[numero].completa = !tareas[numero].completa;
  guardar();
  actualizar();
}

function eliminar(numero) {
  tareas.splice(numero, 1);
  guardar();
  actualizar();
}

function actualizar() {
  let lista = document.getElementById('lista');
  lista.replaceChildren();
  tareas.forEach((tarea, numero) => {
    let item = document.createElement('li');
    let texto = document.createElement('span');
    texto.textContent = tarea.nombre + ' - ' + tarea.fecha + (tarea.completa ? ' (Completada)' : ' (Pendiente)');
    let boton1 = document.createElement('button');
    boton1.textContent = tarea.completa ? 'Pendiente' : 'Completar';
    boton1.onclick = () => completar(numero);
    let boton2 = document.createElement('button');
    boton2.textContent = 'Eliminar';
    boton2.onclick = () => eliminar(numero);
    item.append(texto, boton1, boton2);
    lista.append(item);
  });
  if (tareas.length === 0) {
    let item = document.createElement('li');
    item.textContent = 'Todavía no hay tareas.';
    lista.append(item);
  }
  document.getElementById('resumen').textContent = 'Total de tareas: ' + tareas.length + ' | Completadas: ' + tareas.filter(t => t.completa).length;
}
actualizar();
