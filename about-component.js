(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      
      .about {
        padding: 0;
        box-sizing: border-box;
        display: flex;
        margin: 200px auto;
        justify-content: center;
      }

      h2 {
        font-family: Muli;
        font-size: 29px;
      }
      
      p {
        color: rgb(91, 107, 127);
        font-size: 19px;
        font-weight: 400;
      }

      .image {
        width: 350px;
        margin-left: 25px;
        transform: scaleX(-1);
        z-index:-1;
        position: relative;

      }
      
      .section {
        width: 400px;
      }
    </style>

    <div class="about">
     
      <div class="section" >
        <h2>Hey, I'm Igor</h2>
        <p>I'm a full stack developer and former professional poker player.
        I <a href="#learn"> learn in public </a> and write about things like software, how to convince 
        those around you to write better software, and complexity theory.
        </p>
      </div>
     
      <div class="section" >
        <img class="image" src="manbunyellow.svg"/>
      </div>

    </div>`

  customElements.define('about-component', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  });
})();