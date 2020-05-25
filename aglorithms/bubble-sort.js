(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      .header {
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
      }
      
      .data-container {
        width: 600px;
        height: 384px;
        position: relative;
        margin: 0 auto;
      }
      
      .block {
        width: 28px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #58b7ff;
        transition: 0.2s all ease;
      }
      
      .block__id {
        position: absolute;
        top: -24px;
        width: 100%;
        text-align: center;
      }
    </style>

    <section class="header">Bubble Sort</section>
    <section class="data-container"></section>`

  customElements.define('bubble-sort', class extends HTMLElement {
    constructor() {
      super();
      this.$shadowRoot = this.attachShadow({ mode: 'open' });
      this.$shadowRoot.appendChild(template.content.cloneNode(true));
      this.$container = this.$shadowRoot.querySelector('.data-container')
    }

    connectedCallback() {
      this.generateBlocks();
      this.sort();
    }

    generateBlocks(num = 20) {
      for (let i = 0; i < num; i += 1) {
        const value = Math.floor(Math.random() * 100);
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.height = `${value * 3}px`;
        block.style.transform = `translateX(${i * 30}px)`;

        const blockLabel = document.createElement("label");
        blockLabel.classList.add("block__id");
        blockLabel.innerHTML = value;

        block.appendChild(blockLabel);
        this.$container.appendChild(block);
      }
    }

    swap(el1, el2) {
      return new Promise(resolve => {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        el1.style.transform = transform2;
        el2.style.transform = transform1;
        const container = this.$container
        // Wait for the transition to end!
        requestAnimationFrame(function () {
          setTimeout(function () {
            container.insertBefore(el2, el1);
            resolve();
          }, 250);
        });
      });
    }

    async sort(delay = 100) {
      let blocks = this.$shadowRoot.querySelectorAll(".block");
      console.log('block', blocks)
      for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
          blocks[j].style.backgroundColor = "#FF4949";
          blocks[j + 1].style.backgroundColor = "#FF4949";

          await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, delay)
          );

          const value1 = Number(blocks[j].childNodes[0].innerHTML);
          const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

          if (value1 > value2) {
            await this.swap(blocks[j], blocks[j + 1]);
            blocks = this.$shadowRoot.querySelectorAll(".block");
          }

          blocks[j].style.backgroundColor = "#58B7FF";
          blocks[j + 1].style.backgroundColor = "#58B7FF";
        }

        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
      }
    }
  });
})();
