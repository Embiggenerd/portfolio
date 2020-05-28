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
    <button> Run it </button>
    `
  customElements.define('game-of-life', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.$canvas = this.shadowRoot.querySelector('canvas')
      this.$runIt = this.shadowRoot.querySelector('button')
      this.ctx = this.$canvas.getContext('2d')
      this.animate = this.animate.bind(this)
      this.running = false
      this.blocksX = 100
      this.blocksY = 50
      this.blockWidth = 8
      this.blockHeight = 8
      this.canvasWidth = this.blocksX * this.blockWidth
      this.canvasHeight = this.blocksY * this.blockHeight
      this.state = []
      this.updateState = []
    }

    connectedCallback() {
      this.initCanvas()
      this.initGrid()
      this.drawGrid()
      this.initOnClick()
      this.initRunIt()
    }

    initOnClick() {
      this.$canvas.addEventListener("click", (event) => {
        console.log(event.pageX, event.pageY)
        const positionX = Math.floor(event.pageX / this.blockWidth)
        const positionY = Math.floor(event.pageY / this.blockHeight)

        this.state[positionX][positionY] === 1 ? this.state[positionX][positionY] = 0 : this.state[positionX][positionY] = 1

        this.drawGrid()
      }, false)
    }

    initCanvas() {
      this.$canvas.width = this.blocksX * this.blockWidth
      this.$canvas.height = this.blocksY * this.blockHeight
    }

    initGrid() {
      this.updateState = [...Array(this.blocksX).keys()].map(() => [])

      this.state = [...Array(this.blocksX).keys()].map(() => [])

      for (let i = 0; i < this.blocksX; i++) {
        for (let j = 0; j < this.blocksY; j++) {
          this.state[i][j] = 0
        }
      }
    }

    drawGrid() {

      this.clear()
      for (let i = 0; i < this.blocksX; i++) {
        for (let j = 0; j < this.blocksY; j++) {
          if (this.state[i][j] === 1) {
            this.ctx.fillStyle = "blue"
            this.ctx.fillRect(i * this.blockWidth, j * this.blockHeight, this.blockWidth, this.blockHeight)
            this.ctx.stroke()
          } else {
            this.ctx.fillStyle = "white"
            this.ctx.fillRect(i * this.blockWidth, j * this.blockHeight, this.blockWidth, this.blockHeight)
            this.ctx.stroke()
          }
        }
      }
    }

    updateGrid() {
      for (let j = 1; j < this.blocksX - 1; j++) {
        for (let k = 1; k < this.blocksY - 1; k++) {
          let total = 0
          total += this.state[j - 1][k + 1]; // top right
          total += this.state[j][k + 1]; // middle right
          total += this.state[j + 1][k + 1]; // bottom right

          total += this.state[j + 1][k]; // bottom center

          total += this.state[j + 1][k - 1]; // bottom left
          total += this.state[j][k - 1]; // middle left
          total += this.state[j - 1][k - 1]; // top left

          total += this.state[j - 1][k]; // top center

          // When we apply rules to state, we make changes to second array, which we will switch over
          switch (total) {
            case 2:
              this.updateState[j][k] = this.state[j][k];

              break;
            case 3:
              this.updateState[j][k] = 1;

              break;
            default:
              this.updateState[j][k] = 0;
          }


        }
      }

      // Switch states
      const temp = this.state
      this.state = this.updateState
      this.updateState = temp
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

    runIt() {
      const intervalID = setInterval(() => {
        if(!this.running){
          clearInterval(intervalID)
        }
        this.updateGrid()
        this.drawGrid()
      }, 500)
    }

    clear() {
      this.ctx.clearRect(0, 0, this.iw, this.ih)
    }

    initRunIt() {
      this.$runIt.addEventListener('click', () => {
        this.running = !this.running
        this.runIt()
      })
    }

  });
})();
