import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { api } from "./AxiosService.js"

class SandboxGiftsService {
  async openGift(giftId) {
    const res = await api.put(`api/gifts/${giftId}`, { opened: true })
    console.log(res, 'this is response for putting/editing gift');

    // let foundGift = AppState.gifts.find(gift => gift.id == giftId)
    // foundGift = new Gift(res.data)

    let oldGiftIndex = AppState.gifts.findIndex(gift => gift.id == giftId)
    AppState.gifts[oldGiftIndex] = new Gift(res.data)

    // console.log(foundGift, "Here is the new gift with the data")
    AppState.emit('gifts')
  }
  async createGift(data) {
    console.log(data)
    const res = await api.post('api/gifts', new Gift(data))

    console.log(res);
    AppState.gifts.unshift(new Gift(res.data))
    AppState.emit('gifts')
  }
  async getGifts() {
    const res = await api.get('api/gifts')
    console.log(res.data);

    // let storedGifts = AppState.gifts

    // console.log('checking reference', storedGifts === AppState.gifts);
    // res.data.map()

    // map broke reference here when aliased out
    AppState.gifts = res.data.map(pojo => new Gift(pojo))
    console.log('appstate gifts', AppState.gifts);
  }

}

export const sandboxGiftsService = new SandboxGiftsService()
