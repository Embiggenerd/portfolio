(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>:host {
    color:red;
    text-align: center;
  
  <style>
  
  </style>
  <div class="swiper-slide"><h1 class="title"></h1></div>
  <slot></slot>
`;
  customElements.define('slide-component', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the constructor.

      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this.$title = shadowRoot.querySelector('.title')
    }

    static get observedAttributes() {
      return ['titleText'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.$title.innerHTML = this.titleText

    }

    get value() {
      return this.getAttribute('titleText');
    }

    set titleText(newValue) {
      this.setAttribute('titleText', newValue);
    }

    connectedCallback(){
      if (!this.hasAttribute('titleText')) {
        // this.setAttribute('titleText', 1);
        console.log('hasattr')
      }
      console.log(
        "slide1 connected"
      )
      this.$title.innerHTML = this.titleText
    }
  });
})()