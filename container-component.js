(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      .container {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        height: 100vh;
      }
    </style>

    <div class="container">
      <slot></slot>
    </div>`

  customElements.define('container-component', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  });
})();