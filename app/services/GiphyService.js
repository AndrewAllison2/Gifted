import { AppState } from "../AppState.js"
import { giphyApi } from "./AxiosService.js"

class GiphyService {
  searchGif(formData) {
    // console.log(formData)
    return giphyApi.get('search', {
      params: {
        q: formData.gifQuery
      }
    })
      .then(res => {
        AppState.gifs = res.data.data.map(gifData => gifData.images.downsized_large.url)
        console.log(AppState.gifs, 'heres the gifs hopefully')
      })
  }

  clearGifs() {
    console.log('cleared gifs')
    AppState.gifs = []
    console.log(AppState.gifs)
  }
}

export const giphyService = new GiphyService()