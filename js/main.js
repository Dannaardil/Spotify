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
            const type = uri.split(':')[1];
            this.shadowRoot.innerHTML = `
                <iframe class="spotify-iframe" width="350" height="670" src="https://open.spotify.com/embed/${type}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2a79d9d097msha23448f0aaf24bap1737a2jsn024f95d36e5e',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    this.loadAlbums('Taylor%20Swift');

    // Agregar evento al botón de búsqueda
    const searchButton = document.getElementById('buttonSearch');
    const searchInput = document.getElementById('searchForm');

    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
    
      if (searchTerm !== '') {
        this.loadAlbums(searchTerm);
      }
    });

    // Agregar evento al input para permitir la búsqueda al presionar Enter
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
          this.loadAlbums(searchTerm);
        }
      }
    });
  }

  async loadAlbums(searchTerm) {
    const formattedSearchTerm = searchTerm.replace(/\s/g, '%20');
    const url = `https://spotify23.p.rapidapi.com/search/?q=${formattedSearchTerm}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2a79d9d097msha23448f0aaf24bap1737a2jsn024f95d36e5e',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const albumCovers = data.albums.items.map(album => {
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
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
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
///////////////////////77SECTION MAY LIKEEEEEEEEEEEEEEEEEEEE
// Album Cover List Element
class AlbumCoverListElement2 extends HTMLElement {
  constructor() {
    super();
    fetch('./json/albums.json')
      .then(response => response.json())
      .then(albumData => {
        const albumCovers = albumData.tracks.items
          .slice(0, 10)
          .map(album => {
            const coverUrl = album.data.albumOfTrack.coverArt.sources[0].url;
            const albumId = album.data.uri.split(':')[2];
            const albumName = album.data.name;
            const albumCover = `
              <div class="albumMayContainer">
                <img src="${coverUrl}" data-id="${albumId}" class="album-may">
                
                <p class="album-name-may">${albumName}</p>
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

      myFrame.setAttribute('uri', `spotify:track:${albumId}`);
      console.log(`Album "${albumName}" clicked!`);
    }
  }
}
customElements.define('album-may-cover', AlbumCoverListElement2);