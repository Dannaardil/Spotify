class myframe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.renderFrame();
    }

    renderFrame() {
        const uri = this.getAttribute('uri');
        if (uri) {
            // Obtener el ID del álbum de la URI
            const id = uri.split(':')[2];
            this.shadowRoot.innerHTML = `
                <iframe class="spotify-iframe" width="450" height="670" src="https://open.spotify.com/embed/album/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            `;
        } else {
            this.shadowRoot.innerHTML = '';
        }
    }

    static get observedAttributes() {
        return ["uri"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'uri' && oldVal !== newVal) {
            this.renderFrame();
        }
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



//////////////////////albums mostrar imagenes de los albums  y asignar el id //////////////////////////
class AlbumCoverElement extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const img = document.createElement('img');
  

    
      img.src = this.getAttribute('src');
      img.alt = this.getAttribute('alt');
      
    
    

      
      shadow.appendChild(img);
    }
  }
  
  class AlbumCoverListElement extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
     fetch('./json/albums.json')
  

        .then(response => response.json())
        .then(albumData => {
          const albumCovers = albumData.albums.items
            .slice(0, 10)
            .map(album => {
              const coverUrl = album.data.coverArt.sources[0].url;
            //   const albumName = album.data.uri;
              const albumName = album.data.uri.split(':')[2]
              const albumCover = document.createElement('img');
              albumCover.setAttribute('src', coverUrl);
              albumCover.setAttribute('id', albumName);
              albumCover.setAttribute('width', '200px');
              albumCover.setAttribute('height', '200px');
              albumCover.setAttribute('class', 'album-imagen');
              
              albumCover.addEventListener('click', this.handleAlbumClick.bind(this))

              
              return albumCover;
            });
            

            
            albumCovers.forEach(cover => shadow.appendChild(cover));
          console.log(albumCovers);

     

          
        })
        .catch(error => console.error('Error al cargar los datos:', error));
  
  
    }
    handleAlbumClick(event) {
      const clickedAlbum = event.target; 
      const albumName = clickedAlbum.getAttribute('id'); 
      const myFrame = document.querySelector('.main__frame');

    //   const uri = "https://open.spotify.com/embed/"
      // Actualizar el atributo 'uri' con el nuevo ID
      myFrame.setAttribute('uri', `spotify:album:${albumName}`);
   
      // Access album name from alt attribute
      console.log(`Album "${albumName}"`);
      
    }
  }
 
//  customElements.define('myFrame',handleAlbumClick )
  customElements.define('album-cover', AlbumCoverElement);
  customElements.define('album-cover-list', AlbumCoverListElement);