import {AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize} from '@capacitor-community/admob'

export default class Banner {

  private TEST_ID: string = 'ca-app-pub-2077187211919243/7859551012'
  private options: BannerAdOptions
  
  constructor(){
    this.options = {
      adId: this.TEST_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: false
    }
  }
  async showBanner(){
    await AdMob.showBanner(this.options)
  }
  async hideBanner(){
    await AdMob.hideBanner()
    await AdMob.removeBanner()
  }
}