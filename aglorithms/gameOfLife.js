(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        height: 100%;
        width: 100%;
      }
      
    </style>
    <canvas></canvas>
    `
  customElements.define('game-of-life', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.$canvas = this.shadowRoot.querySelector('canvas')
      this.c = this.$canvas.getContext('2d')
    }
    connectedCallback() {
      this.$canvas.width = window.innerWidth
      this.$canvas.height = window.innerHeight
      this.drawRect()
      this.drawLine()
    }

    drawRect(){
      const x = 100
      const y = 100
      const width = 100
      const height = 100
      this.c.fillRect(x, y, width, height)
    }

    drawLine(){
      this.c.beginPath()
      this.c.moveTo(50, 300)
      this.c.lineTo(60, 200)
      this.c.stroke()
    }
  });
})();
