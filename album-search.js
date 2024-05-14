class AlbumSearch extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          ul { list-style: none; padding: 0; }
          li { padding: 5px; }
        </style>
        <input type="text" placeholder="Buscar álbum...">
        <ul></ul>
      `;
  
      this.input = this.shadowRoot.querySelector('input');
      this.list = this.shadowRoot.querySelector('ul');
      this.input.addEventListener('input', this.handleSearch.bind(this));
    }
  
    connectedCallback() {
      this.loadData();
    }
  
    async loadData() {
      try {
        const response = await fetch('albums.json');
        const data = await response.json();
        this.albums = data.albums;
        this.renderInitialData();
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }
  
    handleSearch() {
      const query = this.input.value.trim().toLowerCase();
      const filteredAlbums = this.albums.filter(album =>
        album.name.toLowerCase().includes(query)
      );
  
      this.renderAlbums(filteredAlbums);
    }
  
    renderAlbums(albums) {
      this.list.innerHTML = '';
  
      albums.forEach(album => {
        const li = document.createElement('li');
        li.textContent = `${album.name} - ${album.artist}`;
        this.list.appendChild(li);
      });
    }
  
    renderInitialData() {
      this.renderAlbums(this.albums);
    }
  }
  
  customElements.define('album-search', AlbumSearch);