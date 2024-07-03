const tabla = document.getElementById("cuerpo-tabla");
const busqueda = document.getElementById("busqueda");

fetch("./src/datos.csv")
  .then(respuesta => respuesta.text())
  .then(datos => {
    const filas = datos.split("\n");
    const encabezados = filas.shift().split(",");
    const registros = filas.map(fila => fila.split(","));

    // Función para dibujar la tabla con los datos
    const dibujarTabla = (registros) => {
      tabla.innerHTML = "";
      registros.forEach(registro => {
        const fila = document.createElement("tr");
        registro.forEach(valor => {
          const celda = document.createElement("td");
          celda.textContent = valor;
          fila.appendChild(celda);
        });
        tabla.appendChild(fila);
      });
    };

    // Dibujar la tabla con todos los registros
    dibujarTabla(registros);

    // Agregar listener para la búsqueda
    busqueda.addEventListener("keyup", () => {
      const valorBusqueda = busqueda.value.toLowerCase();
      const registrosFiltrados = registros.filter(registro => {
        const registroString = registro.join("").toLowerCase();
        return registroString.includes(valorBusqueda);
      });
      dibujarTabla(registrosFiltrados);
    });
  });
