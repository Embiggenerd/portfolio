(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      // :host {
      //   height: 100%;
      //   width: 100%;
      // }
      canvas{
        border: black solid 1px;
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
      this.ctx = this.$canvas.getContext('2d')
      this.animate = this.animate.bind(this)
      this.x = 100
      this.y = 100
      this.iw = 800
      this.ih = 800
      this.dx = 4
      this.dy = 4

      this.radius = 30
    }
    connectedCallback() {
      this.$canvas.width = this.iw
      this.$canvas.height = this.ih
      this.drawGrid()
      // this.drawRect()
      // this.drawLine()
      // this.animate()
    }

    drawGrid() {
      const arr = [...Array(100).keys()].map(() => [])

      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          arr[i][j] = 0
        }
      }

      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          this.ctx.fillStyle = "blue"
          this.ctx.fillRect(i*8, j*8, 7, 7)
          // this.ctx.stroke()
        }
      }
      
      console.log(arr)
    }

    drawRect() {
      const x = 100
      const y = 100
      const width = 100
      const height = 100
      this.c.fillRect(x, y, 1, 1)
      this.c.stroke()
    }

    drawLine() {
      this.c.beginPath()
      this.c.moveTo(50, 300)
      this.c.lineTo(60, 200)
      this.c.stroke()
    }

    drawCircle() {
      this.c.beginPath()
      this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      this.c.strokeStyle = "blue"
      this.c.stroke()
    }

    animate() {
      requestAnimationFrame(this.animate)
      this.clear()
      this.drawCircle()
      if ((this.x > this.iw - this.radius) || (this.x < 0 + this.radius)) {
        this.dx = -this.dx
      }
      if ((this.y > this.ih - this.radius) || (this.y < 0 + this.radius)) {
        this.dy = -this.dy
      }
      this.x += this.dx
      this.y += this.dy
      console.log('hihi')
    }

    clear() {
      this.c.clearRect(0, 0, this.iw, this.ih)
    }

  });
})();
