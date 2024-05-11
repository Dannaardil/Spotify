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


////////////////////////////////////////columnas
// function ocultarTodasLasColumnas() {
//     var columnas = document.querySelectorAll('.album');
//     columnas.forEach(function(columna) {
//         columna.style.display = 'none';
//     });
// }
// function ocultarTodasLasColumnas() {
//     var columnas = document.querySelectorAll('.main__heading');
//     columnas.forEach(function(columna) {
//         columna.style.display = 'none';
//     });
// }
// function ocultarTodasLasColumnas() {
//     var columnas = document.querySelectorAll('.main__heading');
//     columnas.forEach(function(columna) {
//         columna.style.display = 'none';
//     });
// }

// function mostrarColumna(numColumna) {
//     ocultarTodasLasColumnas();
//     var columnaAMostrar = document.getElementById('columna' + numColumna);
//     columnaAMostrar.style.display = 'block';
// }
// ////////////////////////////////////////