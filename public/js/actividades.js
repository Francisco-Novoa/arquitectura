window.onload = async () => {
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("id");
  console.log(token, userId);
  const [
    id,
    nombre,
    descripcion,
    hora,
    fecha,
    cupos,
    traslado,
    precio,
    createButton,
    editButton,
    deleteButton,
    tablaActividades,
  ] = [
    "input-id",
    "input-nombre",
    "input-descripcion",
    "input-hora",
    "input-fecha",
    "input-cupos",
    "input-traslado",
    "input-precio",
    "act-create-button",
    "act-update-button",
    "act-delete-button",
    "tabla-actividades",
  ].map(id => document.getElementById(id));

  const loadData = act => () => {
    console.log(act);
    id.value = act.id;
    nombre.value = act.nombre;
    descripcion.value = act.descripcion;
    hora.value = new Date(act.hora).toISOString();
    fecha.value = new Date(act.fecha).toISOString();
    cupos.value = act.cupo;
    traslado.value = act.cupo_traslado;
    precio.value = act.precio;
  };

  const loadActividades = async () => {
    const {
      data: {
        data: { actividad },
      },
    } = await axios.get("/api/actividad");
    tablaActividades.innerHTML = "";
    actividad.map(act => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
              <td>${act.nombre}</td>
              <td>${act.descripcion}</td>
              <td>${new Date(act.hora).toISOString()}</td>
              <td>${new Date(act.fecha).toISOString()}</td>
              <td>${act.cupo}</td>
              <td>${act.cupo_traslado}</td>
              <td>${act.precio}</td>
              <td>
                <button id="load-act-${act.id}">Cargar</button>
              </td>`;
      tablaActividades.appendChild(tableRow);
      document
        .getElementById(`load-act-${act.id}`)
        .addEventListener("click", loadData(act));
    });
    id.value = "";
    nombre.value = "";
    fecha.value = "";
    descripcion.value = "";
    hora.value = "";
    cupos.value = "";
    traslado.value = "";
    precio.value = "";
  };

  loadActividades();

  const editarActividad = async () => {
    try {
      const result = await axios.put(
        `/api/actividad/${id.value}`,
        {
          nombre: nombre.value,
          descripcion: descripcion.value,
          hora: new Date(hora.value).toISOString(),
          fecha: new Date(fecha.value).toISOString(),
          cupo: cupos.value,
          cupo_traslado: traslado.value,
          precio: precio.value,
        },
        { Authorization: `bearer ${token}` }
      );
      loadActividades();
    } catch (error) {
      console.error(error);
    }
  };

  editButton.addEventListener("click", editarActividad);

  const eliminarActividad = async () => {
    try {
      const result = await axios.delete(`/api/actividad/${id.value}`);
      loadActividades();
    } catch (error) {
      console.error(error);
    }
  };
  deleteButton.addEventListener("click", eliminarActividad);

  const crearActividad = async () => {
    try {
      const result = await axios.post(
        `/api/actividad`,
        {
          nombre: nombre.value,
          descripcion: descripcion.value,
          hora: new Date(Date.now()).toISOString(),
          fecha: new Date(Date.now()).toISOString(),
          cupo: cupos.value,
          cupo_traslado: traslado.value,
          precio: precio.value,
        },
        { Authorization: `bearer ${token}` }
      );
      loadActividades();
    } catch (error) {
      console.error(error);
    }
  };
  createButton.addEventListener("click", crearActividad);
};
