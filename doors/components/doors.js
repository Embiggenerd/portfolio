const template = document.createElement('template');

template.innerHTML = `
    <style>
    .sides {
        display: grid;
        grid-template-columns: 50vw 50vw;
    }
    
    html,
    body {
        height: 100%;
        margin: 0;
        font-family: "Arial Black", sans-serif;
    }
    
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    
    .intro {
        position: absolute;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }
    
    .sides {
        position: relative;
    }
    
    .side {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 6vw;
    }
    
    .left {
        background-color: #dcc9a1;
        color: #534325;
    }
    
    .right {
        background-color: #1b636f;
        color: #ffffff;
        flex-direction: column-reverse;
    }
    
    .name {
        margin: 0.3em;
    }
    
    .emoji {
        font-size: 3em;
    }
    
    .open {
        position: absolute;
        width: 8vw;
        height: 8vw;
        background: #ffffff;
        border-radius: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.4vw;
        color: #123456;
        border-width: 10px;
        border-style: solid;
        border-color: #1b636f #dcc9a1 #dcc9a1 #1b636f;
    }
    
    </style>

    <div class="intro">
    
        <div class="sides">
            <div class="side left">
                <h2 class="name">Monkey</h2>
                <div class="emoji">🐒</div>
            </div>
            <div class="open">
                <span>Open</span>
            </div>
            <div class="side right">
                <h2 class="name">Robot</h2>
                <div class="emoji">🤖</div>
            </div>
        </div>
    </div>
    
`;

class Doors extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$open = this._shadowRoot.querySelector('.open')
        this.$left= this._shadowRoot.querySelector('.left')
        this.$right = this._shadowRoot.querySelector('.right')

        this.tl = gsap.timeline({ paused: true })
        this.tl.to(this.$open, { duration: 2, rotate: 135 });
        this.tl.to(this.$left, { duration: 3, x: "-50vw" })
        this.tl.to(this.$right, { duration: 3.92, x: "60vw", delay: -3 })
        this.tl.to(this.$open, { duration: 3.92, x: "60vw", delay: -3.92 })

        this.$open.addEventListener('mouseover', () => {
            this.tl.play();
        })

    }

    _animateDoors(tl, el) {
        tl.to(".open", { duration: 2, rotate: 135 });
        tl.to(".left", { duration: 3, x: "-50vw" })
        tl.to(".right", { duration: 3.92, x: "60vw", delay: -3 })
        tl.to(".open", { duration: 3.92, x: "60vw", delay: -3.92 })

        el.addEventListener('mouseover', () => {
            tl.play();
        })
    }
}

window.customElements.define('doors-component', Doors)