(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      .banner {
        margin: 0;
        padding: 0;
        color: rgb(6, 145, 242);
        font-size: 44px;
        font-weight: 700;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center; 
      }
    </style>

    <h1 class="banner">IGOR ATAKHANOV</h1>`


  customElements.define('banner-component', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  });
})();