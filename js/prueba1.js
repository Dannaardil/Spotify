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


 