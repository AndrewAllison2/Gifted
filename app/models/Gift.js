export class Gift {
  constructor(data) {
    this.id = data._id || ''
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened ? data.opened : false
  }

  get ClosedTemplate() {
    return `
    <div class="col-4">
      <div onclick="app.SandboxGiftController.openGift('${this.id}')" class="closed-gift">
        <div class="closed-gift-info">
          <h2>${this.tag}</h2>
          <h3>Click to Open!</h3>
        </div>
      </div>
    </div>
    `
  }

  get OpenedTemplate() {
    return `
    <div class="col-4">
      <div class="opened-gift">
        <div class="gift-img-container">
          <img
            src="${this.url}"
            alt="">
        </div>
        <h4>${this.tag}</h4>
      </div>
    </div>
    `
  }
}


