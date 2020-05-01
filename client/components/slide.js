let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host {color:red }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <div class="swiper-slide">
    <h1>SLIDE1</h1>
  </div>
`;
customElements.define('slide-c', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
  
});