(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      .testimonials {
        /*background: rgb(6, 145, 242);*/
        padding: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;;
        height:240px;
        top: 100px;
        position:relative;
      }

      h2 {
        font-family: Muli;
        font-size: 29px;
      }

      li {
        list-style-type: none;
      }

      p {
       /* color: rgb(91, 107, 127);*/
        font-size: 15px;
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
        height: 160px;;
        background:white;
        width: 300px;
        border-radius: 10px;
        border: 2px solid rgb(6, 145, 242);
        text-align: center;
        margin: 0 10px;
        overflow: hidden;
        padding: 0 1em;
      }

      .truncated {
        overflow: hidden;
        position: relative; 
        line-height: 1.2em;
        max-height: 6em; 
        text-align: justify;  
        margin-right: -1em;
        padding-right: 1em;
      }
      .truncated:before {
        content: '...';
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .truncated:after {
        content: '';
        position: absolute;
        right: 0;
        width: 1em;
        height: 1em;
        margin-top: 0.2em;
        background: white;
      }
    </style>

    <div class="testimonials">
      
      <div class="section" >
        <p class="truncated">
          Igor is motivated, dedicated and a hard worker. He has a great work ethic and 
          works well with colleagues on team projects. He is a team player and rises to 
          the challenge on projects...
        </p>
        <h4>
          - Eralp, former manager
        </h4>
      </div>

      <div class="section" >
        <p class="truncated">
          Through my time working with Igor, I have seen a lot of growth. He was always 
          helping other students in slack help channels. A student who is willing pay it 
          forward and give back to his team...
        </p>
        <h4>
          - Justin, former supervisor
        </h4>
      </div>
      
      <div class="section">
        <p class="truncated">
          Igor is an amazing coder. He takes specifications and can uncover what areas need 
          the most work on. He is passionate about creating great products. He takes feedback 
          seriously and internalizes it...
        </p>
        <h4>
          - Israel, former manager
        </h4>
      </div>
    </div>`

  customElements.define('testimonials-component', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  });
})();