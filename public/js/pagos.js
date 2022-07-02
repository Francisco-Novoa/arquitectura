window.onload = async () => {
    //   const login = await axios.post("/api/login", {
    //     correo: "pancho",
    //     password: "1234567890",
    //   });
  
    const tablaBancos = document.getElementById("tabla-bancos");
    const bottonCrearBanco = document.getElementById(`crear-banco-button`);
  
    const llenarMensaje = id => async mensaje => {
      const label = (document.getElementById(`message-banco-${id}`).innerHTML =
        mensaje.response.data.error);
    };
  
    const crearBanco = async () => {
      const nombre = document.getElementById(`crear-banco-input`);
      try {
        const result = await axios.post("api/banco", {
          nombre: nombre.value,
        });
        nombre.value = "";
        loadBancos();
      } catch (error) {
        alert(error);
      }
    };
  
    bottonCrearBanco.addEventListener("click", crearBanco);
  
    const editarBanco = id => async () => {
      const input = document.getElementById(`input-banco-edit-${id}`);
      try {
        const result = await axios.put(`/api/banco/${id}`, {
          nombre: input.value,
        });
        loadBancos();
      } catch (error) {
        llenarMensaje(id)(error);
      }
    };
  
    const eliminarBanco = id => async () => {
      try {
        const result = await axios.delete(`/api/banco/${id}`);
        loadBancos();
      } catch (error) {
        llenarMensaje(id)(error.data.message);
      }
    };
  
    const loadBancos = async () => {
      const bancos = await axios.get("/api/banco");
      tablaBancos.innerHTML = "";
      bancos.data.data.banco.map(banco => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
          <td>${banco.id}</td>
          <td>${banco.nombre}</td>
          <td>
            <div class="ordenado">
                <label class="error" id="message-banco-${banco.id}"></label >
            </div>
                <div class="ordenado">
                    <button id="button-send-banco-edit-${banco.id}" >Editar</button>
                    <input type="text" id="input-banco-edit-${banco.id}">
                </div>
            </td>
          <td>
            <button id="button-send-banco-delete-${banco.id}" >Eliminar</button>
          </td>`;
        tablaBancos.appendChild(tableRow);
        document
          .getElementById(`button-send-banco-delete-${banco.id}`)
          .addEventListener("click", eliminarBanco(banco.id));
        document
          .getElementById(`button-send-banco-edit-${banco.id}`)
          .addEventListener("click", editarBanco(banco.id));
      });
    };
  
    loadBancos();
  };
  