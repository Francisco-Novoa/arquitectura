window.onload = async () => {
  const bottonEditarCliente = document.getElementById(`cliente-update-button`);

  const llenarMensaje = id => async mensaje => {
    const label = (document.getElementById(id).innerHTML =
      mensaje.response.data.error);
  };

  const id = document.getElementById(`input-id`);
  const nombre = document.getElementById(`input-nombre`);
  const rut = document.getElementById(`input-rut`);
  const correo = document.getElementById(`input-correo`);
  const fecha_nacimiento = document.getElementById(`input-fecha_nacimiento`);
  const genero = document.getElementById(`input-genero`);
  const fono = document.getElementById(`input-fono`);
  const direccion = document.getElementById(`input-direccion`);
  const fono_emergencia = document.getElementById(`input-fono_emergencia`);
  const nombre_emergencia = document.getElementById(`input-nombre_emergencia`);
  const estado = document.getElementById(`input-estado`);
  const derivar_a = document.getElementById(`input-derivar_a`);
  const perfilesSelect = document.getElementById("select-perfil");

  const editarCliente = async () => {
    const msgFunction = llenarMensaje("cliente-update-button-label");
    try {
      const result = await axios.put(`/api/users/${id.value}`, {
        nombre: nombre.value,
        rut: rut.value,
        correo: correo.value,
        fecha_nacimiento: fecha_nacimiento.value,
        genero: genero.value,
        fono: fono.value,
        direccion: direccion.value,
        fono_emergencia: fono_emergencia.value,
        nombre_emergencia: nombre_emergencia.value,
        estado: estado.value,
        derivar_a: derivar_a.value,
        perfil: perfilesSelect.value,
      });
      loadClientes();
    } catch (error) {
      console.error(error);
      msgFunction(error);
    }
  };

  bottonEditarCliente.addEventListener("click", editarCliente);

  const eliminarCliente = id => async () => {
    try {
      const result = await axios.delete(`/api/users/${id}`);
      loadClientes();
    } catch (error) {
      llenarMensaje(id)(error.data.message);
    }
  };

  const tablaClientes = document.getElementById("tabla-clientes");

  const loadData = user => () => {
    console.log(user);
    id.value = user.id;
    nombre.value = user.nombre;
    correo.value = user.correo;
    rut.value = user.rut;
    fecha_nacimiento.value = user.fecha_nacimiento;
    genero.value = user.genero;
    fono.value = user.fono;
    direccion.value = user.direccion;
    fono_emergencia.value = user.fono_emergencia;
    nombre_emergencia.value = user.nombre_emergencia;
    estado.value = user.estado;
    derivar_a.value = user.derivar_a;
    perfilesSelect.value = user.perfileId;
  };

  const loadClientes = async () => {
    const clientes = await axios.get("/api/users");
    console.log(clientes);
    tablaClientes.innerHTML = "";
    clientes.data.data.user.map(cliente => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
          <td>${cliente.nombre}</td>
          <td>${cliente.rut}</td>
          <td>${cliente.correo}</td>
          <td>${cliente.fecha_nacimiento}</td>
          <td>${cliente.genero}</td>
          <td>${cliente.fono}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.fono_emergencia}</td>
          <td>${cliente.nombre_emergencia}</td>
          <td>${cliente.estado}</td>
          <td>${cliente.derivar_a}</td>
          <td>${cliente.createdAt}</td>
          <td>${cliente.updatedAt}</td>
          <td>${cliente["perfile.tipo"]}</td>
          <td>
            <button id="button-load-cliente-${cliente.rut}" >Cargar</button>
          </td>
          
          `;
      tablaClientes.appendChild(tableRow);
      document
        .getElementById(`button-load-cliente-${cliente.rut}`)
        .addEventListener("click", loadData(cliente));
    });
  };

  loadClientes();

  const getPerfiles = async () => {
    const {
      data: {
        data: { perfiles },
      },
    } = await axios.get("/api/perfil");
    perfiles.map(({ id, tipo }) => {
      const opcion = document.createElement("option");
      opcion.setAttribute("value", id);
      opcion.innerHTML = `${tipo}`;
      perfilesSelect.appendChild(opcion);
    });
  };

  getPerfiles();
};
