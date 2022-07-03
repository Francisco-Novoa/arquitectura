window.onload = async () => {
  const imagenContainer = document.getElementById("imagesContainer");

  const crearImagen = ({ url, alt }) => {
    const box = document.createElement("div");
    box.classList.add("col-md-3", "w3_tab_img_left");
    box.innerHTML = `            
        <div class="col-md-3 w3_tab_img_left" style="padding:8px;">
            <div class="demo">
                <a class="cm-overlay" href="${url}">
                    <figure class="imghvr-shutter-in-out-diag-2">
                    <img src="${url}" alt="${alt}" width="300px" height="200px" />
                    </figure>
                </a>
            </div>
        </div>`;
    imagenContainer.appendChild(box);
  };

  const loadImages = async () => {
    const result = (await axios.get("/api/imagenes")).data.data.imagenes;
    return result;
  };
  const images = await loadImages();

  images.map(image => {
    console.log(image);
    crearImagen(image);
  });

  const blogContainter = document.getElementById("noticiasContainer");
  const getNoticias = async () => {
    const result = await axios.get("/api/noticias");
    return result.data.data;
  };

  const loadNoticias = async () => {
    console.log("cargando noticias");
    const { noticias } = await getNoticias();
    noticias.map(({ username, fecha, cuerpo, encabezado, imagen, titulo }) => {
      const box = document.createElement("div");
      box.innerHTML = `
                <div class="agile-blog-grid-img">
                    <a href="#" data-toggle="modal" data-target="#myModal2"><img src="${
                      imagen[0].url
                    }" alt="${imagen[0].alt}" /></a>
                    <a href="#" data-toggle="modal" data-target="#myModal2">${titulo}</a>
                    <p>Publicado por <a href="#">${username}</a> &nbsp;&nbsp;${new Intl.DateTimeFormat().format(
        new Date(fecha)
      )} &nbsp;&nbsp;</p>
                </div>
                <div class="agile-blog-grid-info">
                    <p>${encabezado}</p>
                </div>
                <div class="agile-blog-grid-info">
                    <p>${cuerpo}</p>
                </div>
        `;
      box.classList.add("col-md-3", "agile-blog-grid", "noticias");
      blogContainter.appendChild(box);
    });
  };
  loadNoticias();

  const loadWeather = async () => {
    try {
      const weather = await axios.get("/api/weather?query=Santiago");
      return weather;
    } catch (error) {
      console.error(error);
    }
  };

  const weather = await loadWeather();
};
