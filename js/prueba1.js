///frame spotify
class myframe extends HTMLElement{
    id
    constructor(id){
        super();
        this.attachShadow({mode: "open"});
    }
    connectedCallback(){
        this.shadowRoot.innerHTML = /*html*/`
            <iframe class="spotify-iframe" width="350" height="500" src="https://open.spotify.com/embed/track/${this.id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
           
        `
        
    }
    static get observedAttributes(){
        return ["uri"];
    }
    attributeChangedCallback(name,old,now){
        let[nameUri, album, id] = now.split(":")
        this.id = id;
    }
}
customElements.define("my-frame",myframe)



//////////////////////////////77mostrar columnas responsive ///
function ocultarTodasLasColumnas() {
    var columnas = document.querySelectorAll('.column');
    columnas.forEach(function(columna) {
        columna.style.display = 'none';
    });
}

function mostrarColumna(numColumna) {
    ocultarTodasLasColumnas();
    var columnaAMostrar = document.getElementById('columna' + numColumna);
    columnaAMostrar.style.display = 'flex';
}


// //////////////////////pruebas ///
// const searchForm = document.getElementById('searchForm');
// const searchInput = document.getElementById('searchInput');
// const spotifyPlayer = document.getElementById('spotifyPlayer');

// searchForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

//     const searchTerm = searchForm.displayName;

//     // Realizar la búsqueda en la API de Spotify
//     buscarCancionEnSpotify(searchTerm)
//         .then(function(songId) {
//             // Actualizar el iframe de Spotify con la nueva canción
//             mostrarCancionEnSpotify(songId);
//         })
//         .catch(function(error) {
//             console.error('Error al buscar la canción:', error);
//         });
// });
// function buscarCancionEnJson(searchTerm) {
//     // Realizar una solicitud para cargar el archivo JSON
//     return fetch('./album.json')
   
//         .then(response => response.json())
//         .then(data => {
//             // Buscar la canción en el archivo JSON
//             const cancionEncontrada = data.find(cancion => cancion.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

//             if (cancionEncontrada) {
//                 return cancionEncontrada.id;
//             } else {
//                 throw new Error('Canción no encontrada');
//             }
//         });
// }

// function mostrarCancionEnSpotify(songId) {
//     // Actualizar el iframe de Spotify con la nueva canción
//     const iframeSrc = `https://open.spotify.com/embed/album/${songId}`;
//     spotifyPlayer.innerHTML = `<iframe style="border-radius:12px" src="${iframeSrc}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    
// }




// const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=albums&offset=0&limit=10&numberOfTopResults=5';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '2a79d9d097msha23448f0aaf24bap1737a2jsn024f95d36e5e',
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
//     fetch(url)

// } catch (error) {
// 	console.error(error);
// }

//  export class myClase extends HTMLElement {

//  }
// class AlbumSearch extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.innerHTML = `
//       <style>
//         /* Estilos CSS para el componente */
//       </style>
//       <input type="text" placeholder="Buscar álbum...">
//       <ul></ul>
//     `;

//     this.input = this.shadowRoot.querySelector('input');
//     this.list = this.shadowRoot.querySelector('ul');
//     this.input.addEventListener('input', this.handleSearch.bind(this));
//   }

//   connectedCallback() {
//     this.loadData();
//   }

//   async loadData() {
//     try {
//       const response = await fetch('./json/album');
//       const data = await response.json();
//       this.albums = data.albums.items;
//       this.renderInitialData();
//     } catch (error) {
//       console.error('Error al cargar los datos:', error);
//     }
//   }

//   handleSearch() {
//     const query = this.input.name.trim().toLowerCase();
//     const albums = this.getAlbums();

//     const filteredAlbums = albums.filter(album =>
//       album.data.name.toLowerCase().includes(query)
//     );

//     this.renderAlbums(filteredAlbums);
//   }

//   getAlbums() {
//     return this.albums || [1];
//   }

//   renderAlbums(albums) {
//     this.list.innerHTML = '';

//     albums.forEach(album => {
//       const li = document.createElement('li');
//       const albumName = document.createElement('span');
//       albumName.textContent = album.data.name;
//       li.appendChild(albumName);
//       this.list.appendChild(li);
//     });
//   }

//   renderInitialData() {
//     const albums = this.getAlbums();
//     this.renderAlbums(albums);
//   }
// }

// customElements.define('album-search', AlbumSearch);