window.onload = async () => {
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("id");
  console.log(token, userId);
  const [
    id,
    nombre,
    descripcion,
    dificultad,
    duracion,
    ubicacion,
    comentario,
    createButton,
    editButton,
    deleteButton,
    tablaRutas,
  ] = [
    "input-id",
    "input-nombre",
    "input-descripcion",
    "input-dificultad",
    "input-duracion",
    "input-ubicacion",
    "input-comentario",
    "ruta-create-button",
    "ruta-update-button",
    "ruta-delete-button",
    "tabla-rutas",
  ].map(id => document.getElementById(id));

  const loadData = ruta => () => {
    console.log(ruta);
    id.value = ruta.id;
    nombre.value = ruta.nombre;
    descripcion.value = ruta.descripcion;
    dificultad.value = ruta.dificultad;
    ubicacion.value = ruta.ubicacion;
    duracion.value = ruta.duracion;
    comentario.value = ruta.comentario;
  };

  const loadRutas = async () => {
    const {
      data: {
        data: { rutas },
      },
    } = await axios.get("/api/rutas");
    tablaRutas.innerHTML = "";
    rutas.map(ruta => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
              <td>${ruta.nombre}</td>
              <td>${ruta.descripcion}</td>
              <td>${ruta.dificultad}</td>
              <td>${ruta.duracion}</td>
              <td>${ruta.ubicacion}</td>
              <td>${ruta.comentario}</td>
              <td>
                <button id="load-ruta-${ruta.id}">Cargar</button>
              </td>`;
      tablaRutas.appendChild(tableRow);
      document
        .getElementById(`load-ruta-${ruta.id}`)
        .addEventListener("click", loadData(ruta));
    });
    id.value = "";
    nombre.value = "";
    descripcion.value = "";
    dificultad.value = "";
    duracion.value = "";
    ubicacion.value = "";
    comentario.value = "";
  };
  loadRutas();

  const editarRuta = async () => {
    try {
      const result = await axios.put(
        `/api/rutas/${id.value}`,
        {
          nombre: nombre.value,
          descripcion: descripcion.value,
          dificultad: dificultad.value,
          duracion: duracion.value,
          ubicacion: ubicacion.value,
          comentario: comentario.value,
        },
        { Authorization: `bearer ${token}` }
      );
      loadRutas();
    } catch (error) {
      console.error(error);
    }
  };
  editButton.addEventListener("click", editarRuta);

  const eliminarActividad = async () => {
    try {
      const result = await axios.delete(`/api/rutas/${id.value}`);
      loadRutas();
    } catch (error) {
      console.error(error);
    }
  };
  deleteButton.addEventListener("click", eliminarActividad);

  const crearActividad = async () => {
    try {
      const result = await axios.post(
        `/api/rutas`,
        {
          nombre: nombre.value,
          descripcion: descripcion.value,
          dificultad: dificultad.value,
          duracion: duracion.value,
          ubicacion: ubicacion.value,
          comentario: comentario.value,
        },
        { Authorization: `bearer ${token}` }
      );
      loadRutas();
    } catch (error) {
      console.error(error);
    }
  };
  createButton.addEventListener("click", crearActividad);
};
