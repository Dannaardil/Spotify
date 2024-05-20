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
                <iframe class="spotify-iframe" width="338" height="670" src="https://open.spotify.com/embed/${type}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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

class AlbumImage extends HTMLElement {
  constructor() {
    super();
    const imgSrc = this.getAttribute('src');
    const imgAlt = this.getAttribute('alt');
    this.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}" class="album-cover">
    `;
  }
}

customElements.define('album-cover', AlbumImage);

// Album Cover List Element
class albumShow extends HTMLElement {
  constructor() {
    super();
    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '198deaf6ffmshbc16ea84d5b3a79p18ee5ejsnb8d9d76b0f89',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    this.showAlbum('Taylor%20Swift');


    const searchButton = document.getElementById('buttonSearch');
    const searchInput = document.getElementById('searchForm');
/// que busqu cuando se le da click al boton de busqueda ///
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
    
      if (searchTerm !== '') {
        this.showAlbum(searchTerm);
      }
    });

    // Agregar evento al input para permitir la búsqueda al presionar Enter
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
          this.showAlbum(searchTerm);
        }
      }
    });
  }

  async showAlbum(searchTerm) {
    const formattedSearchTerm = searchTerm.replace(/\s/g, '%20');
    const url = `https://spotify23.p.rapidapi.com/search/?q=${formattedSearchTerm}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '198deaf6ffmshbc16ea84d5b3a79p18ee5ejsnb8d9d76b0f89',
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
      this.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            const id = img.dataset.id;
          
            const AlbumTracksComponent = document.querySelector('.playNext');
            AlbumTracksComponent.setAttribute('uri', `spotify:album:${id}`);
           
        });
    });
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

customElements.define('album-cover-list', albumShow);


////para que se reproduzcan las canciones de el album en la parte de track////////////

class AlbumTracksComponent extends HTMLElement {
  constructor() {
      super();
  }

  connectedCallback() {
      this.renderFrame();
  }

  async renderFrame() {
      const uri = this.getAttribute('uri');
      
      if (uri) {
          const id = uri.split(':')[2];
          await this.loadTrackList(id);
      }
  }

  async loadTrackList(albumId) {

        const url = `https://spotify23.p.rapidapi.com/albums/?ids=${albumId}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '198deaf6ffmshbc16ea84d5b3a79p18ee5ejsnb8d9d76b0f89',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        };
       


      try {
          const response = await fetch(url, options);
          const result = await response.json();

          // Obtener el primer álbum de la respuesta
          const album = result.albums[0];

          // Obtener la URL de la tercera imagen
          const imageUrl = album.images[2].url;

          // Crear la plantilla HTML para cada pista del álbum
          let templates = '';
          album.tracks.items.forEach(track => {
              templates += `
                  <div class="playNextBox">
                      <i class='bx bx-menu'></i>
                      <img src="${imageUrl}" alt="" data-id="${track.uri}">

                      <div class="playNextDescription">
                          <div>
                              <h4>${track.name}</h4>
                              <p class="playNextArtist">${track.artists[0].name}</p>
                          </div>
                         
                      </div>
                  </div>
              `;
          });
          this.innerHTML = templates;
          
          this.querySelectorAll('img').forEach(img => {
              img.addEventListener('click', () => {
                  const id = img.dataset.id;
                  const myFrame = document.querySelector('.main__frame');
                  myFrame.setAttribute('uri', `${id}`);
                  
              });
          });
      } catch (error) {
          console.error(error);
      }
  }

  static get observedAttributes() {
      return ['uri'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'uri' && oldValue !== newValue) {
          this.renderFrame();
      }
  }
}

customElements.define('album-tracks', AlbumTracksComponent);



///////////////////////77SECTION MAY LIKEEEEEEEEEEEEEEEEEEEE
// Album Cover List Element
class albumShow2 extends HTMLElement {
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
customElements.define('album-may-cover', albumShow2);



////////////////////cambiar colores ////////
document.getElementById('colorButton').addEventListener('click', function() {
  const root = document.documentElement;
  
  const originalColors = {
    color1: 'black',
    color2: '#121212',
    color3: 'rgb(255, 255, 255)',
    color4:  '#242424',
    color5: '#1ed760',
  };

  const newColors = {
    color1: 'white',
    color2: 'rgba(168, 168, 168, 0.753)',
    color3: 'white',
    color4: 'rgba(168, 168, 168, 0.753)',
    color5: 'white'
  };

  const currentColors = {
    color1: getComputedStyle(root).getPropertyValue('--color1').trim(),
    color2: getComputedStyle(root).getPropertyValue('--color2').trim(),
    color3: getComputedStyle(root).getPropertyValue('--color3').trim(),
    color4: getComputedStyle(root).getPropertyValue('--color4').trim(),
    color5: getComputedStyle(root).getPropertyValue('--color5').trim()
  };

  const useNewColors = Object.keys(originalColors).every(key => currentColors[key] === originalColors[key]);

  Object.keys(originalColors).forEach(key => {
    root.style.setProperty(`--${key}`, useNewColors ? newColors[key] : originalColors[key]);
  });
});

