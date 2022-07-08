window.onload = async () => {
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("id");
  console.log(token, userId);
  const [tablaImagenes, id, url, alt, editButton, deleteButton, createButton] =
    [
      "tabla-imagenes",
      "input-id",
      "input-url",
      "input-alt",
      "img-update-button",
      "img-delete-button",
      "img-create-button",
    ].map(id => document.getElementById(id));

  const loadData = img => () => {
    console.log(img);
    id.value = img.id;
    url.value = img.url;
    alt.value = img.alt;
  };

  const loadImagenes = async () => {
    const {
      data: {
        data: { imagenes },
      },
    } = await axios.get("/api/imagenes");
    tablaImagenes.innerHTML = "";
    imagenes.map(img => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
              <td>${img.id}</td>
              <td>${img.url}</td>
              <td>${img.alt}</td>
              <td>
                <img src="${img.url}"
                    alt="${img.alt}"
                    width="150px"
                    heigth="150px"></img>
              </td>
              <td>
                <button id="load-img-${img.id}">Cargar</button>
              </td>`;
      tablaImagenes.appendChild(tableRow);
      document
        .getElementById(`load-img-${img.id}`)
        .addEventListener("click", loadData(img));
    });
    id.value = "";
    titulo.value = "";
    fecha.value = "";
    encabezado.value = "";
    cuerpo.value = "";
    user.value = "";
  };

  // const editarNoticia = async () => {
  //   try {
  //     const result = await axios.put(
  //       `/api/noticias/${id.value}`,
  //       {
  //         titulo: titulo.value,
  //         encabezado: encabezado.value,
  //         cuerpo: cuerpo.value,
  //         usuario: userId,
  //       },
  //       { Authorization: `bearer ${token}` }
  //     );
  //     loadNoticias();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // editButton.addEventListener("click", editarNoticia);

  // const eliminarNoticia = async () => {
  //   try {
  //     const result = await axios.delete(`/api/noticias/${id.value}`);
  //     loadNoticias();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // deleteButton.addEventListener("click", eliminarNoticia);

  const crearImagen = async () => {
    try {
      const result = await axios.post(
        `/api/imagenes`,
        {
          url: url.value,
          alt: alt.value,
        },
        { Authorization: `bearer ${token}` }
      );
      loadImagenes();
    } catch (error) {
      console.error(error);
    }
  };
  createButton.addEventListener("click", crearImagen);
  loadImagenes();
};
