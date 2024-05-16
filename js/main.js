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
// Album Cover Element
class AlbumCoverElement extends HTMLElement {
  constructor() {
    super();
    const imgSrc = this.getAttribute('src');
    const imgAlt = this.getAttribute('alt');
    this.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}" class="album-cover">
    `;
  }
}
customElements.define('album-cover', AlbumCoverElement);

// Album Cover List Element
class AlbumCoverListElement extends HTMLElement {
  constructor() {
    super();
    fetch('./json/albums.json')
      .then(response => response.json())
      .then(albumData => {
        const albumCovers = albumData.albums.items
          .slice(0, 10)
          .map(album => {
            const coverUrl = album.data.coverArt.sources[0].url;
            const albumId = album.data.uri.split(':')[2];
         
            const albumCover = `
              <div class="album-container">
                <img src="${coverUrl}" data-id="${albumId}" class="album-cover">
             
              </div>
            `;
            return albumCover;
          });
        this.innerHTML = albumCovers.join('');
        this.addEventListener('click', this.handleAlbumClick.bind(this));
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }

  handleAlbumClick(event) {
    const clickedElement = event.target.closest('.album-container');
    if (clickedElement) {
      const albumId = clickedElement.querySelector('.album-cover').dataset.id;
  
      const myFrame = document.querySelector('.main__frame');

      myFrame.setAttribute('uri', `spotify:album:${albumId}`);
     
    }
  }
}
customElements.define('album-cover-list', AlbumCoverListElement);
// Album Cover Element
// Album Cover Element

///////////////////////77SECTION MAY LIKEEEEEEEEEEEEEEEEEEEE
// Album Cover List Element
class AlbumCoverListElement2 extends HTMLElement {
  constructor() {
    super();
    fetch('./json/albums.json')
      .then(response => response.json())
      .then(albumData => {
        const albumCovers = albumData.albums.items
          .slice(0, 10)
          .map(album => {
            const coverUrl = album.data.coverArt.sources[0].url;
            const albumId = album.data.uri.split(':')[2];
            const albumName = album.data.name;
            const albumCover = `
              <div class="albumMayContainer">
                <img src="${coverUrl}" data-id="${albumId}" class="album-may">
                <span class="album-name-may">${albumName}</span>
              </div>
            `;
            return albumCover;
          });
        this.innerHTML = albumCovers.join('');
        this.addEventListener('click', this.handleAlbumClick.bind(this));
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }

  handleAlbumClick(event) {
    const clickedElement = event.target.closest('.albumMayContainer');
    if (clickedElement) {
      const albumId = clickedElement.querySelector('.album-may').dataset.id;
      const albumName = clickedElement.querySelector('.album-name-may').textContent;
      const myFrame = document.querySelector('.main__frame');

      myFrame.setAttribute('uri', `spotify:album:${albumId}`);
      console.log(`Album "${albumName}" clicked!`);
    }
  }
}
customElements.define('album-may-cover', AlbumCoverListElement2);