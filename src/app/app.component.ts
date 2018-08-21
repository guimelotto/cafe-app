import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { LandingPage } from "../pages/landing/landing";

import { DataProvider } from "../providers/data/data";
import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  public rootPage: any;

  constructor(
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen,
    private _data: DataProvider
  ) {
    this._platform.ready().then(() => {
      this._statusBar.styleDefault();
      this._splashScreen.hide();
      this._data
        .checkActiveSession()
        .then(() => (this.rootPage = TabsPage))
        .catch(() => (this.rootPage = LandingPage));
    });
  }
}
