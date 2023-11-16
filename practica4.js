const url_movies = 'https://api.themoviedb.org/3/movie/popular?api_key=b33b261bf432a774cbc66c38aa098674&lenguage=en&page=';
const url_genres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b33b261bf432a774cbc66c38aa098674&lenguage=en'
let peliculas = document.getElementById("peliculas");
let listGeneros = document.getElementById("generos");
let pageInicio = 1;
let categoria_id = "todos";
let pagina = document.getElementById("pagina");
let carrusel = document.getElementById("innerCarrusel");
let ids = [];
let idPelicula = 0;

function auto(){
	idPelicula++
	if(idPelicula >=19){
		idPelicula = 0;
	}
	console.log(idPelicula)
}

if (pageInicio <= 1) {
	pageInicio = 1
} else if (pageInicio >= 500) {
	pageInicio = 500
}
pagina.textContent = pageInicio;

fetch(url_movies + pageInicio)
	.then((response) => response.json())
	.then((datos) => {
		let peliculas = datos.results;
		// console.log(peliculas)
		peliculas.forEach(pelicula => {
			// console.log(pelicula)
			showPeliculas(pelicula);
			showCarrusel(pelicula);
			let automatico = setInterval(() => {
				carrusel.innerHTML = ""
				idPelicula++;
				ids = [];
				if(idPelicula>=19){
					idPelicula = 0;
				}
				fetch(url_movies + pageInicio)
					.then((response) => response.json())
					.then((datos) => {
						let peliculas = datos.results;
						peliculas.forEach(pelicula => {
							showCarrusel(pelicula);
						});
				})
			}, 4000);
		});
})

fetch(url_genres)
	.then((response) => response.json())
	.then((allGeneros) => {
		let generos = allGeneros.genres;
		generos.forEach(genero => {
			// console.log(genero.name)
			let option = document.createElement("option")
			option.value = genero.id
			option.textContent = `${genero.name}`
			listGeneros.append(option)
		})
	})

let prev = document.getElementById("prev");
prev.addEventListener("click", function () {
	peliculas.innerHTML = "";
	pageInicio--;

	// console.log(categoria_id)
	if (pageInicio <= 1) {
		pageInicio = 1
	}
	pagina.value = `${pageInicio}`
	// console.log(pageInicio)
	fetch(url_movies + pageInicio)
		.then((response) => response.json())
		.then((datos) => {
			let peliculas = datos.results
			peliculas.forEach(pelicula => {
				// console.log(pelicula)
				showPorCategoria(pelicula, categoria_id)
			});
		}
		)
})
let next = document.getElementById("next")
next.addEventListener("click", function () {
	peliculas.innerHTML = ""
	pageInicio++
	if (pageInicio >= 500) {
		pageInicio = 500
	}
	pagina.value = `${pageInicio}`;
	// console.log(pageInicio)
	fetch(url_movies + pageInicio)
		.then((response) => response.json())
		.then((datos) => {
			let peliculas = datos.results
			peliculas.forEach(pelicula => {
				// console.log(pelicula)
				showPorCategoria(pelicula, categoria_id)
			});
		}
		)
})

pagina.addEventListener("keyup", function () {
	peliculas.innerHTML = ""
	pageInicio = pagina.value;
	// console.log(pageInicio)
	if (pageInicio <= 1) {
		pageInicio = 1;
	} else if (pageInicio >= 500) {
		pageInicio = 500;
	}
	fetch(url_movies + pageInicio)
		.then((response) => response.json())
		.then((datos) => {
			let peliculas = datos.results
			peliculas.forEach(pelicula => {
				showPorCategoria(pelicula, categoria_id)
			})
		})

})

let search = document.getElementById("generos");
search.addEventListener("change", function () {
	peliculas.innerHTML = "";
	categoria_id = document.getElementById("generos").value;
	// console.log(categoria_id)
	fetch(url_movies + pageInicio)
		.then((response) => response.json())
		.then((datos) => {
			let peliculas = datos.results
			peliculas.forEach(pelicula => {
				// console.log(pelicula)
				showPorCategoria(pelicula, categoria_id)
			});
		}
		)
})

function showCarrusel(datosApi){
	ids.push(datosApi.id)
	// console.log(ids[idPelicula])
		if(datosApi.id === ids[idPelicula]){
			// console.log(ids)
			// console.log(id)
			carrusel.innerHTML = `	
					<div class="carrusel-item">
						<img src="https://image.tmdb.org/t/p/w400${datosApi.backdrop_path}" alt="">
						<div class="detallesCarrusel">
							<h2>${datosApi.title}</h2>
							<span>${datosApi.release_date}</span>
							<p>${datosApi.overview}</p>
						</div>
					</div>
					`;
		}
}


let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
	btnPrev.addEventListener("click", ()=>{
		carrusel.innerHTML = ""
		idPelicula--;
		ids = [];
		if(idPelicula<=0){
			idPelicula = 19;
		}
		fetch(url_movies + pageInicio)
			.then((response) => response.json())
			.then((datos) => {
				let peliculas = datos.results;
				peliculas.forEach(pelicula => {
					showCarrusel(pelicula);
				});
		})
	});
	btnNext.addEventListener("click", ()=>{
		carrusel.innerHTML = ""
		idPelicula++;
		ids = [];
		if(idPelicula>=19){
			idPelicula = 0;
		}
		fetch(url_movies + pageInicio)
			.then((response) => response.json())
			.then((datos) => {
				let peliculas = datos.results;
				peliculas.forEach(pelicula => {
					showCarrusel(pelicula);
				});
		})
	});



function showPeliculas(datosApi) {
	// ids.push(datosApi.id)
	// console.log(datosApi)
	let poster = `https://image.tmdb.org/t/p/w342${datosApi.poster_path}`;
	let generos_id = datosApi.genre_ids;
	let pelicula = document.createElement("div");
	pelicula.id = "pelicula";
	pelicula.innerHTML = `<div class="detalles"><img src="https://image.tmdb.org/t/p/w342${poster}" alt="poster"></div>`
	peliculas.append(pelicula);
}


function showPorCategoria(datosApi, id_genero) {
	let generos_id = datosApi.genre_ids;
	let poster = `https://image.tmdb.org/t/p/w342${datosApi.poster_path}`;
	let pelicula = document.createElement("div");
	let idGen = parseInt(id_genero)
	// console.log(generos_id)
	if (id_genero == "todos") {
		pelicula.id = "pelicula";
		pelicula.innerHTML = `<div class="detalles"><img src="https://image.tmdb.org/t/p/w342${poster}" alt="poster"></div>`
		peliculas.append(pelicula);
	} else if (generos_id.includes(idGen)) {
		pelicula.id = "pelicula";
		pelicula.innerHTML = `<div class="detalles"><img src="https://image.tmdb.org/t/p/w342${poster}" alt="poster"></div>`
		peliculas.append(pelicula);
	}
}

//Carusel--------------------------------------------------------------------------------




//Membresias-------------------------------------------
let member = document.getElementById("member");
let membresia = document.querySelectorAll(".membresia")
let buscarCategoria = document.querySelector(".buscarCategoria")
member.addEventListener("click", function () {
	let contenedor = document.querySelector(".contenedor")
	buscarCategoria.style.display = "none"
	contenedor.innerHTML = `
	<div id="membresias">
		<div class="membresia basic">
			<h3>MemberBasic</h3>
			<div class="costo-beneficio">
				<h5>Beneficios</h5>
				<h5>$100 por mes</h5>
			</div>
			<ul>
				<li>Angel</li>
				<li>Japheth</li>
				<li>Ramirez</li>
				<li>Aguilar</li>
			</ul>
			<div class="btn-comprar">
				<button class="comprar">Comprar</button>
			</div>
		</div>
		<div class="membresia duo">
			<h3>MemberDuo</h3>
			<div class="costo-beneficio">
				<h5>Beneficios</h5>
				<h5>$150 por mes</h5>
			</div>
			<ul>
				<li>Angel</li>
				<li>Japheth</li>
				<li>Ramirez</li>
				<li>Aguilar</li>
			</ul>
			<div class="btn-comprar">
				<button class="comprar">Comprar</button>
			</div>
		</div>
		<div class="membresia gold">
			<h3>GoldMember</h3>
			<div class="costo-beneficio">
				<h5>Beneficios</h5>
				<h5>$200 por mes</h5>
			</div>
			<ul>
				<li>Angel</li>
				<li>Japheth</li>
				<li>Ramirez</li>
				<li>Aguilar</li>
			</ul>
			<div class="btn-comprar">
				<button class="comprar">Comprar</button>
			</div>
		</div>
	</div>`;
})

//Login-------------------------------------------------

let body = document.querySelector("body")
let login = document.getElementById("login")
let registro = document.getElementById("registro")
login.addEventListener("click", Login)
registro.addEventListener("click", Registro)
function Login() {
	let modalContenedorPrincipal = document.createElement("div")
	modalContenedorPrincipal.id = "modalPrincipal";
	let modalContenedor = document.createElement("div");
	modalContenedor.id = "modalContenedor";
	modalContenedor.innerHTML = `
	<h1 id="login-title">Login</h1>
    <form id="formulario-login" action="loginRegistro.php" method="POST">
        <label><input type="text" name="user" placeholder="Usuario" required></label>
        <label><input type="password" name="password" placeholder="*********" required></label>
        <input type="submit" value="Ingresar">
    </form>`
	modalContenedorPrincipal.append(modalContenedor)
	body.append(modalContenedorPrincipal)
	
	let formulario = document.getElementById("formulario-login")
	formulario.addEventListener("submit" , (e) => {
		e.preventDefault()
		let datos = new FormData(formulario)
		fetch("loginRegistro.php", {
			method: "POST",
			body: datos
		})
			.then((res) => res.json())
			.then((datos) => {
				console.log(datos)
				if(datos == "Bienvenido"){
					formulario.remove();
					let bienvenida = document.getElementById("login-title")
					bienvenida.innerText = datos
					modalContenedor.style.backgroundColor = "yellow"
					setTimeout(function(){
						modalContenedorPrincipal.remove()
					}, 1000);
				} else {
					modalContenedor.style.backgroundColor = "red";
				}
			})
	})
	modalContenedorPrincipal.addEventListener("click", function (e) {
		if(e.target === modalContenedorPrincipal){
			modalContenedorPrincipal.remove()
		}
		
	})
}

function Registro() {
	let modalContenedorPrincipal = document.createElement("div")
	modalContenedorPrincipal.id = "modalPrincipal";
	let modalContenedor = document.createElement("div");
	modalContenedor.id = "modalContenedor";
	modalContenedor.innerHTML = `
	<h1 id="login-title">Registro</h1>
    <form id="formulario-registro" action="loginRegistro.php" method="POST">
        <label><input type="text" name="nombre" placeholder="Nombre" required></label>
        <label><input type="text" name="apellidos" placeholder="Apellidos" required></label>
		<label><input type="email" name="correo" placeholder="Correo" required></label>
		<label><input type="password" name="password" placeholder="Contraseña	" required></label>
        <input type="submit" value="Ingresar">
    </form>`
	modalContenedorPrincipal.append(modalContenedor)
	body.append(modalContenedorPrincipal)
	
	let formulario = document.getElementById("formulario-registro")
	formulario.addEventListener("submit" , (e) => {
		e.preventDefault()
		let datos = new FormData(formulario)
		// console.log(datos.get("nombre"))
		fetch("loginRegistro.php", {
			method: "POST",
			body: datos
		})
			.then((res) => res.json())
			.then((datos) => {
				if(datos == "Registro Exitoso"){
					formulario.remove();
					let bienvenida = document.getElementById("login-title")
					bienvenida.innerText = datos
					modalContenedor.style.backgroundColor = "yellow"
					setTimeout(function(){
						modalContenedorPrincipal.remove()
					}, 1000);
				}
			})
	})
	modalContenedorPrincipal.addEventListener("click", function (e) {
		if(e.target === modalContenedorPrincipal){
			modalContenedorPrincipal.remove()
		}
		
	})
}
















