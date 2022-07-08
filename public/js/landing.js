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
                      imagen !== null ? imagen[0]?.url : ""
                    }" alt="${imagen !== null ? imagen[0]?.alt : ""}" /></a>
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

  //const weather = await loadWeather();
  // login
  const loginCorreo = document.getElementById("emailInput");
  const loginPassword = document.getElementById("passwordInput");
  const loginButton = document.getElementById("formButton");

  loginButton.addEventListener("click", async event => {
    try {
      const {
        data: { token, id, perfil },
      } = await axios.post("/api/login", {
        correo: loginCorreo.value,
        password: loginPassword.value,
      });
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("id", id);
      const storageTK = window.localStorage.getItem("token");
      const storageID = window.localStorage.getItem("id");
      console.log(storageTK, storageID);
      loginPassword.value = "";
      loginCorreo.value = "";
      if (perfil === "administrador") {
        return (window.location.href = "/admin.html");
      }
      return (window.location.href = "/perfil-usuario.html");
    } catch (error) {
      console.error(error);
    }
  });

  const registerCorreo = document.getElementById("emailRegistro");
  const registerPassword = document.getElementById("passwordRegistro");
  const registerRut = document.getElementById("rutRegistro");
  const registerNombre = document.getElementById("nombreRegistro");
  const registerFechaNacimiento = document.getElementById(
    "fechaNacimientoRegistro"
  );
  const registerFono = document.getElementById("fonoRegistro");
  const registerDireccion = document.getElementById("direccionRegistro");
  const registerGenero = document.getElementById("generoRegistro");

  registerButton.addEventListener("click", async event => {
    try {
      const user = await axios.post("/api/users", {
        correo: registerCorreo.value,
        password: registerPassword.value,
        rut: registerRut.value,
        nombre: registerNombre.value,
        fecha_nacimiento: new Date(Date.now()).toISOString(),
        fono: registerFono.value,
        direccion: registerDireccion.value,
        genero: registerGenero.value,
      });
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  });
};
