import { AdMob, AdOptions } from "@capacitor-community/admob";

export default async function showInterstitial(){
  const TEST_ID = 'ca-app-pub-3940256099942544/1033173712'
  const options: AdOptions = {
    adId: TEST_ID
  }
  AdMob.prepareInterstitial(options)
  AdMob.showInterstitial()
}