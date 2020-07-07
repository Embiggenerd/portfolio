(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      
      .learn {
        padding: 0;
        padding-top: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
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
        width: 300px;
      }
    </style>

    <div class="learn">
     
      <div class="section" >
        <h2>Front-End</h2>
        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Reactjs
          </li> 
          <ul>
            <li>
              <input type="checkbox" disabled checked />
              Typescript
            <li>
              <input type="checkbox" disabled />
              Reactive
            </li>
            <li>
              <input type="checkbox" disabled checked />
              Drag and Drop
            </li>
          </ul>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Angular
          </li> 
            <ul>
              <li>
                <input type="checkbox" disabled />
                Reactive
              </li>
              <li>
                <input type="checkbox" disabled />
                Drag and Drop
              </li>
            </ul>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled />
            Vue
          </li>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Web-Components
          </li>
          <ul>
          <li>
            <input type="checkbox" disabled />
            Polymer
          </li>
        </ul>
        </ul>
      </div>
     

      <div class="section" >
        <h2>Back-End</h2>
        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Node
          </li> 
          <ul>
            <li>
              <input type="checkbox" disabled checked />
              Typescript
            <li>
              <input type="checkbox" disabled checked />
              Restful
            </li>
            <li>
              <input type="checkbox" disabled checked />
              Streaming
            </li>
          </ul>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Go
          </li> 
          <ul>
            <li>
            <input type="checkbox" disabled  />
              GRPC
            <li>
              <input type="checkbox" disabled checked />
              Restful
            </li>
            <li>
              <input type="checkbox" disabled checked />
              Streaming
            </li>
          </ul>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled />
            Rust
          </li>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled />
            C++
          </li>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled />
            Python
          </li>
        </ul>
      </div>
      
      <div class="section">
        <h2>Devops</h2>
        <ul>
          <li>
            <input type="checkbox" disabled checked />
            QA
          </li> 
          <ul>
            <li>
              <input type="checkbox" disabled checked />
              Jenkins
            <li>
              <input type="checkbox" disabled checked />
              Cypress
            </li>
            <li>
              <input type="checkbox" disabled checked />
              Selenium 
            </li>
          </ul>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Orchestration
          </li> 
          <ul>
            <li>
              <input type="checkbox" disabled checked />
              Docker Compose
            <li>
              <input type="checkbox" disabled />
              Kubernetes
            </li>
          </ul>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled />
            Ansible
          </li>
        </ul>

        <ul>
          <li>
            <input type="checkbox" disabled checked />
            Microservices
          </li>
        </ul>

        <ul>
        <li>
          <input type="checkbox" disabled />
          Observability
        </li> 
        <ul>
          <li>
            <input type="checkbox" disabled />
            Prometheus with Grafana
          </li>
          
        </ul>
      </div>
    </div>`

  customElements.define('learn-component', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  });
})();