import { AppState } from "../AppState.js";
import { giphyService } from "../services/GiphyService.js";
import { sandboxGiftsService } from "../services/SandboxGiftsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _drawGifts() {
  let template = ''

  let storedGifts = AppState.gifts

  storedGifts.forEach(gift => {
    if (gift.opened) {
      template += gift.OpenedTemplate
    }
    else {
      template += gift.ClosedTemplate
    }
  })
  console.log('drawn');
  setHTML('giftList', template)
}


export class SandboxGiftController {


  constructor() {
    console.log('controller loaded');

    this.getGifts()

    AppState.on('gifts', _drawGifts)
  }

  async getGifts() {
    try {
      await sandboxGiftsService.getGifts()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async createGift(event) {
    try {
      event.preventDefault()
      let form = event.target

      let data = getFormData(form)
      form.reset()
      giphyService.clearGifs()
      document.getElementById('gifInput').value = ''
      await sandboxGiftsService.createGift(data)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)

    }
  }

  async openGift(giftId) {
    try {
      await sandboxGiftsService.openGift(giftId)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)

    }
  }
}