import { AdMob, AdOptions } from "@capacitor-community/admob";

export default class Interstitial {

  private options: AdOptions
  private TEST_ID: string = 'ca-app-pub-2077187211919243/5907318866'
  constructor(){
    this.options = {
      adId: this.TEST_ID,
      isTesting: false
    }
  }

  async showInterstitial(){
    await AdMob.prepareInterstitial(this.options)
    await AdMob.showInterstitial()
  }
}