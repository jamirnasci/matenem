import {AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize} from '@capacitor-community/admob'

export default async function showBanner(){
  const options: BannerAdOptions = {
    adId: 'ca-app-pub-2077187211919243/7859551012',
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true
  }
  await AdMob.showBanner(options)
}