(() => {
    // Step 1: Define html template for the web component
    const tmpl = document.createElement('template')
    tmpl.innerHTML = `
        <style>
            .pop {
                border-radius: 5px;
                background: rgba(0,0,0,0.3);
                padding: 10px;
                font-family: 'Raleway';
                font-size: 1.2rem;
                font-weight: 600;
                text-align: center;
                color: #fff;
            }
            .score-board {
                width: 100%;
                padding: 10px 0;
                margin: 15px 0;
                display: flex;
                flex-flow: row wrap;
            }
            .score-board > * {
                flex: 1 1 33.33%;
                padding: 10px 0;
            }
            .score {
                font-size: 2rem;
            }
        </style>
        <div class='score-board pop'>
            <div>Player 1</div>
            <div>Tie</div>
            <div>Player 2</div>
            <div class="p1score score">0</div>
            <div class="tiescore score">0</div>
            <div class="p2score score">0</div>
        </div>
    `
    
    // Step 2: create the web component
    class Scoreboard extends HTMLElement {
        constructor () {
            super()
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true))

            // hook up ui elements
            this.p1ScoreElem = this.shadowRoot.querySelector('.p1score')
            this.p2ScoreElem = this.shadowRoot.querySelector('.p2score')
            this.tieScoreElem = this.shadowRoot.querySelector('.tiescore')
        }

        connectedCallback() {
            // reflect attribute values on DOM
            console.log(this.p1ScoreElem, this.p1Score)
            this.p1ScoreElem.innerHTML = this.p1Score
            this.p2ScoreElem.innerHTML = this.p2Score
            this.tieScoreElem.innerHTML = this.tieScore
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log(name, oldValue, newValue)
            switch (name) {
                case 'p1score':
                    this.p1ScoreElem.innerHTML = newValue
                    break
                case 'p2score':
                    this.p2ScoreElem.innerHTML = newValue 
                    break
                case 'tiescore':
                    this.tieScoreElem.innerHTML = newValue  
                    break                 
                default:
                    break;
            }
        }

        static get observedAttributes() {
            return ['p1score', 'p2score', 'tiescore']
        }

        // Read / set attributes
        get p1Score() {
            return this.getAttribute('p1score')
        }
        get p2Score() {
            return this.getAttribute('p2score')
        }
        get tieScore() {
            return this.getAttribute('tiescore')
        }
        set p1Score(val) {
            this.setAttribute('p1score', val)
        }
        set p2Score(val) {
            this.setAttribute('p2score', val)
        }
        set tieScore(val) {
            this.setAttribute('tiescore', val)
        }
    }

    // Step 3: register the web component
    window.customElements.define('score-board', Scoreboard)

})()
