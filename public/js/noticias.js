window.onload = async () => {
  const blogContainter = document.getElementById("noticiasContainer");
  const getNoticias = async () => {
    const result = await axios.get("/api/noticias");
    return result.data.data;
  };

  const loadNoticias = async () => {
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
      box.classList.add("col-md-4", "agile-blog-grid", "noticias");
      blogContainter.appendChild(box);
    });
  };
  loadNoticias();
};
