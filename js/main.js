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
                <iframe class="spotify-iframe" width="350" height="670" src="https://open.spotify.com/embed/album/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            `;
        } else {
            this.shadowRoot.innerHTML = null;
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
                const albumId = album.data.uri.split(':')[2]
                const albumCover = document.createElement('img');

              
                const albumName = album.data.name;
                
                albumCover.setAttribute('src', coverUrl);
                albumCover.setAttribute('id', albumId);
                albumCover.setAttribute('name', albumName);

                // albumCover.()
                
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
      const albumId= clickedAlbum.getAttribute('id'); 
      const myFrame = document.querySelector('.main__frame');
      const albumName = clickedAlbum.getAttribute('name');
      
      
      //   const uri = "https://open.spotify.com/embed/"
      // Actualizar el atributo 'uri' con el nuevo ID
      myFrame.setAttribute('uri', `spotify:album:${albumId}`);
      
      
      // Access album name from alt attribute
      console.log(`Album "${albumName}"`);
      
    }
  }
  


  //  customElements.define('myFrame',handleAlbumClick )
  customElements.define('album-cover', AlbumCoverElement);
  customElements.define('album-cover-list', AlbumCoverListElement);
  //////////////////////////////77mostrar columnas responsive ///
  // function ocultarTodasLasColumnas() {
    //     var columnas = document.querySelectorAll('.column');
    //     columnas.forEach(function(columna) {
      //         columna.style.display = 'none';
      //     });
      // }
      
      // function mostrarColumna(numColumna) {
        //     console.log(numColumna);
        //     ocultarTodasLasColumnas();
        //     var columnaAMostrar = document.getElementById(`columna${numColumna}`);
        //     columnaAMostrar.style.display = 'flex';
        // }
        
        ////////////may like 
        class AlbumCoverListElement2 extends HTMLElement {
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
                    const albumId = album.data.uri.split(':')[2];
                    const albumName = album.data.name;
                    
                    // Create a container element for image and text
                    const albumContainer = document.createElement('div');
                    albumContainer.classList.add('album-container');
                    
                    const albumCover = document.createElement('img');
                    albumCover.src = coverUrl;
                    albumCover.setAttribute('id', albumId);
                    albumCover.width = 100;
                    albumCover.height = 100;
                    albumCover.classList.add('album-imagen');
                    
                    const albumNameText = document.createElement('span');
                    albumNameText.textContent = albumName;
                    albumNameText.classList.add('album-name');
                    
                    
                    // Append image and text to the container
                    albumContainer.appendChild(albumCover);
                    albumContainer.appendChild(albumNameText);
                    
                // Add click event listener to the container
                albumContainer.addEventListener('click', this.handleAlbumClick.bind(this));
                
                return albumContainer;
              });
              
              albumCovers.forEach(cover => shadow.appendChild(cover));
              console.log(albumCovers);
            })
            .catch(error => console.error('Error al cargar los datos:', error));
          }
          
          handleAlbumClick(event) {
            const clickedAlbumContainer = event.target.closest('.album-container'); // Get the closest container element
            if (clickedAlbumContainer) {
              const albumId = clickedAlbumContainer.querySelector('img').getAttribute('id');
              const albumName = clickedAlbumContainer.querySelector('.album-name').textContent;
              const style = clickedAlbumContainer.querySelector('.album-name').style.gap('2px');
              const myFrame = document.querySelector('.main__frame');
              
              myFrame.setAttribute('uri', `spotify:album:${albumId}`);
              
          console.log(`Album "${albumName}" clicked!`);
        }
      }
    }
    
    
    customElements.define('album-may_cover', AlbumCoverListElement2);