(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      
      .about {
        padding: 0;
        box-sizing: border-box;
        display: flex;
        margin-top:50px;
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
        line-height: 24px;
      }

      .image {
        width: 350px;
        margin-left: 25px;
        transform: scaleX(-1);
        z-index:-1;
        position: relative;

      }

      a {
        color: rgb(6, 145, 242);
        text-decoration: none;
      }
      
      .section {
        width: 400px;
      }
    </style>

    <style>
    @media only screen and (max-width: 800px) {
      .img-section {
        display:none;   
      }
    }
    </style>

    <div class="about">
     
      <div class="section" >
        <h2>Hey, I'm Igor</h2>
        <p>
          I'm a full stack developer and former professional poker player.
        	I <a href="#learn"> learn in public</a>, which means you can see my
          progress. As I learn a topic, I will check it off, and 
          <a href="portfolio.html">build a project</a> based on it, or <a href="articles.html">
          write an article</a> about it. 
          If you think we would work well together, you can 
          <a href="contact.html">drop me a line</a> at Igor.Atakhanov@gmail.com.
        </p>
      </div>
     
      <div class="section img-section" >
        <img class="image" src="manbunyelloworange.svg"/>
      </div>

    </div>`

  customElements.define('about-component', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  });
})();
