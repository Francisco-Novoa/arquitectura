window.onload = async () => {
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("id");
  console.log(token, userId);
  const [
    id,
    titulo,
    fecha,
    encabezado,
    cuerpo,
    user,
    img,
    editButton,
    deleteButton,
    createButton,
    tablaImagenes,
  ] = [
    "input-id",
    "input-titulo",
    "input-fecha",
    "input-encabezado",
    "input-cuerpo",
    "input-user",
    "input-img",
    "news-update-button",
    "news-delete-button",
    "news-create-button",
    "tabla-imagenes",
  ].map(id => document.getElementById(id));

  // const loadData = news => () => {
  //   console.log(news);
  //   id.value = news.id;
  //   titulo.value = news.titulo;
  //   fecha.value = news.fecha;
  //   encabezado.value = news.encabezado;
  //   cuerpo.value = news.cuerpo;
  //   user.value = news.username;
  //   img.value = news.imagen ? news.imagen[0].url : "";
  // };

  // const loadNoticias = async () => {
  //   const {
  //     data: {
  //       data: { noticias },
  //     },
  //   } = await axios.get("/api/noticias");
  //   tablaNoticias.innerHTML = "";
  //   noticias.map(news => {
  //     const tableRow = document.createElement("tr");
  //     tableRow.innerHTML = `
  //             <td>${news.titulo}</td>
  //             <td>${news.fecha}</td>
  //             <td>${news.encabezado}</td>
  //             <td>${news.cuerpo}</td>
  //             <td>${news.username}</td>
  //             <td>
  //               ${news?.imagen?.map(
  //                 imagen => `
  //                   <img
  //                       src="${news.imagen[0].url}"
  //                       alt="${news.imagen[0].alt}"
  //                       width="150px"
  //                       heigth="150px"></img>
  //                   `
  //               )}
  //             </td>
  //             <td>
  //               <button id="load-news-${news.id}">Cargar</button>
  //             </td>`;
  //     tablaNoticias.appendChild(tableRow);
  //     document
  //       .getElementById(`load-news-${news.id}`)
  //       .addEventListener("click", loadData(news));
  //   });
  //   id.value = "";
  //   titulo.value = "";
  //   fecha.value = "";
  //   encabezado.value = "";
  //   cuerpo.value = "";
  //   user.value = "";
  //   img.value = "";
  // };

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

  // const crearNoticia = async () => {
  //   try {
  //     const result = await axios.post(
  //       `/api/noticias`,
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
  // createButton.addEventListener("click", crearNoticia);
  // loadNoticias();

  // const addImagen = imgId => async () => {
  //   if (!id.value) {
  //     console.log(
  //       "para asignar una imagen asegurate que una id ha sido cargada"
  //     );
  //     return null;
  //   }
  //   try {
  //     const asignada = await axios.post("/api/noticias/addImagen", {
  //       noticia: id.value,
  //       imagen: imgId,
  //     });
  //     loadNoticias();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
};
