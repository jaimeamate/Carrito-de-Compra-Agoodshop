// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Define el Custom Element sin usar template
  class QuantitySelector extends HTMLElement {
    constructor() {
      super();

      // Creamos un Shadow DOM
      this.attachShadow({ mode: 'open' });

      // Creamos los elementos directamente en el Shadow DOM
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            /*width: max-content;*/
            box-sizing: border-box;

          }

          button {
            font-size: .8em;
            cursor: pointer;
            border: none;
            background-color: #fff;
            width: max-content;
            border: 1px solid gray;
            border-radius: 5px;
            &:hover{
              box-shadow: 1px 1px 10px gray;
            }
          }
          
          #valor {
            font-size: 1em;
            border: 1px solid grey;
            border-radius: 5px;
            padding: 2.5px 10px;
            text-align: center;
          }
          /* REMOVER FLECHAS CONTROL DEL INPUT NUMBER */
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            display: none;
          }
        </style>
        <button id="restar">-</button>
        <input id="valor" type="number" min="0" max="999" oninput="validity.valid||(value='')"/>
        <button id="sumar">+</button>
      `;
      //propiedades del objeto
      this._contador = 0
      this.max = 999
      this.min = 0
      this.format = '10'
      // Agregamos eventos onclick a los botones del objeto
      this.botonResta = this.shadowRoot.getElementById('restar')
      this.botonResta.addEventListener('click', () => this.restar())
      this.botonSumar = this.shadowRoot.getElementById('sumar')
      this.botonSumar.addEventListener('click', () => this.sumar())
      this.inputValor = this.shadowRoot.getElementById('valor')
      this.inputValor.addEventListener('input', () => {
      if(this.inputValor.value === '' || this.inputValor.value === this.max){
          this.reset()
        }
        else
        {
          this.inputValor.value = parseInt(this.inputValor.value, this.format)
          this._contador = this.inputValor.value
        }
      })
    }

    // Función para restar
    restar() {
      if(this._contador>this.min){
        this._contador--;
        this.actualizarContador();
      }
    }

    // Función para sumar
    sumar() {
      if(this._contador<this.max){
        this._contador++;
        this.actualizarContador();
      }else{
        this._contador = 0;
        this.actualizarContador();
      }
    }

    // Función para actualizar el contenido del contador
    actualizarContador() {
      this.inputValor.value = this._contador;
      this.inputValor.dispatchEvent(new CustomEvent('input'))
    }

    reset(){
      this.inputValor.value = this.min
      this._contador = this.min
    }
  }

  // Registra el Custom Element
  customElements.define('quantity-selector', QuantitySelector);
});

