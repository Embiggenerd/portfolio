(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>

      canvas{
       
        border: black solid 1px;
      }

      .canvas-wrapper {
        margin: 0 auto;
        width: 800px;
      }

      .buttons-container {
        margin: 0 auto;
        width: 800px;
        display:flex;
        justify-content: center;
      }
      
    </style>
    
    <div class="canvas-wrapper">
      <canvas></canvas>
    </div>
    <div class="buttons-container">
      <button class="run-it"> Run it </button>
      <button class="start-over"> start over </button>
      <button class="random"> Random </button>
      <button class="forward"> Forward</button>
      <button class="speed">Faster</button>
    </div>
    
    `
  customElements.define('game-of-life', class extends HTMLElement {
    constructor() {
      super();
      this.$shadow = this.attachShadow({ mode: 'closed' });
      this.$shadow.appendChild(template.content.cloneNode(true));
      this.$canvas = this.$shadow.querySelector('canvas')
      this.$runIt = this.$shadow.querySelector('.run-it')
      this.$startOver = this.$shadow.querySelector('.start-over')
      this.$random = this.$shadow.querySelector('.random')
      this.$forward = this.$shadow.querySelector('.forward')
      this.$speed = this.$shadow.querySelector('.speed')
      this.$canvasWrapper = this.$shadow.querySelector('.canvas-wrapper')
      this.ctx = this.$canvas.getContext('2d')
      this.marginLeft = 0
      this.marginTop = 0
      this.running = false
      this.speed = 500
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
      this.initStartOver()
      this.initRandom()
      this.initForward()
      this.initSpeed()
      this.initTrackMargins()
    }

    initOnClick() {
      this.$canvasWrapper.addEventListener("click", (event) => {
        const positionX = Math.floor((event.pageX - this.marginLeft) / this.blockWidth)
        const positionY = Math.floor((event.pageY - this.marginTop) / this.blockHeight)

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
      this.killAll()
    }

    initRunIt() {
      this.$runIt.addEventListener('click', () => {
        this.running ? this.$runIt.textContent = "Run it" : this.$runIt.textContent = "Stop"
        this.running = !this.running
        this.runIt()
      })
    }

    initSpeed() {
      this.$speed.addEventListener('click', () => {
        if (this.speed == 500) {
          this.speed = 100
          this.$speed.textContent = "Slower"

        } else {
          this.speed = 500
          this.$speed.textContent = "Faster"
        }
        this.runIt()
      })
    }

    initStartOver() {
      this.$startOver.addEventListener('click', () => {
        this.startOver()
      })
    }

    initRandom() {
      this.$random.addEventListener('click', () => {
        this.randomGrid()
      })
    }

    initTrackMargins() {
      this.marginLeft = this.$canvasWrapper.offsetLeft
      this.marginTop = this.$canvasWrapper.offsetTop

      window.addEventListener('resize', (event) => {
        this.marginTop = this.$canvasWrapper.offsetTop
        this.marginLeft = this.$canvasWrapper.offsetLeft
      })
    }

    initForward() {
      this.$forward.addEventListener('click', () => {
        this.moveForward()
      })
    }

    randomGrid() {
      this.running = false

      for (let i = 0; i < this.blocksX; i++) {
        for (let j = 0; j < this.blocksY; j++) {
          this.state[i][j] = Math.floor(Math.random() * 2)
        }
      }
      this.drawGrid()
    }

    killAll() {
      for (let i = 0; i < this.blocksX; i++) {
        for (let j = 0; j < this.blocksY; j++) {
          this.state[i][j] = 0
        }
      }
    }

    moveForward() {
      this.updateGrid()
      this.drawGrid()
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


    runIt() {
      const timeoutId = setTimeout(() => {
        if (!this.running) {
          clearTimeout(timeoutId)
          return
        }
        console.log('speeed', this.speed)
        this.updateGrid()
        this.drawGrid()
        this.runIt()
      }, this.speed)
    }

    clear() {
      this.ctx.clearRect(0, 0, this.iw, this.ih)
    }

    startOver() {
      this.running ? this.$runIt.textContent = "Run it" : this.$runIt.textContent = "Stop"
      this.running = false
      this.killAll()
      this.drawGrid()
    }
  });
})();
