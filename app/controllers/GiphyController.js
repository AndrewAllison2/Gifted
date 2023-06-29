import { AppState } from "../AppState.js";
import { giphyService } from "../services/GiphyService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

const _drawGifs = () => {
  let template = ''
  AppState.gifs.forEach(gif => {
    template += `<img onclick="app.GiphyController.setGifUrl('${gif}')" class="img-fluid my-2" src="${gif}">`
  })
  setHTML('gifList', template)
}



export class GiphyController {
  constructor() {
    console.log('Giphy controller loaded');
    AppState.on('gifs', _drawGifs)
  }

  searchGif(event) {
    event.preventDefault()
    let form = event.target
    let formData = getFormData(form)
    giphyService.searchGif(formData)
      .then(res => {
      })
      .catch(error => {
        Pop.error(error.message)
        console.error(error)
      })
  }

  setGifUrl(url) {
    document.getElementById('urlInput').value = url
  }
}