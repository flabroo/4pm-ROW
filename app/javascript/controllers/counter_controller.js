import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
let currentCredit = 150
let idCounter = 1
export default class extends Controller {
  static targets = ["credit", "cost", "value", "basket", "name"]

  connect() {
  }

  increment(){
    let counter = this.valueTarget.innerText

    if ((counter == 3) || (currentCredit < this.costTarget.innerText)) {
      return
    } else {

      counter++
      this.valueTarget.innerText = counter
      let cost = this.costTarget.innerText
      let itemName = this.nameTarget.innerText
      let productId = this.valueTarget.dataset.id
      currentCredit = currentCredit - parseFloat(cost)
      this.dispatch("increment", { detail: { content: currentCredit}})
      const basketDiv = document.querySelector(".basket-tables");
      const basketTag = `<div class="basket-tables" data-id="list-${productId}">
                    <p class="counter">${idCounter}</p>
                    <p class="item">${itemName}</p>
                    <p class="cost">${cost}</p>
                    <p class="number">${counter}</p>
                  </div>`
      basketDiv.insertAdjacentHTML("afterend", basketTag)
      idCounter = idCounter + 1
    }
  }

  decrement(){
    let counter = this.valueTarget.innerText
    if (counter == 0) {
      this.valueTarget.innerText = 0
    } else {
      counter--
      this.valueTarget.innerText= counter
      let product = this.valueTarget.dataset.id

      let cost = this.costTarget.innerText
      currentCredit = currentCredit + parseFloat(cost)
      this.dispatch("decrement", { detail: { content: currentCredit}})

      const element = document.querySelector(`[data-id="list-${product}"]`)
      element.remove()
      idCounter = idCounter - 1
    }
  }
}
