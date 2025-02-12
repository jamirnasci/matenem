import { AdMob, AdOptions } from "@capacitor-community/admob";

export default class Interstitial {

  private options: AdOptions
  private TEST_ID: string = 'ca-app-pub-3940256099942544/1033173712'
  constructor(){
    this.options = {
      adId: this.TEST_ID,
      isTesting: true
    }
  }

  async showInterstitial(){
    await AdMob.prepareInterstitial(this.options)
    await AdMob.showInterstitial()
  }
}