import { Injectable } from "@angular/core";
import { database } from "firebase";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { map } from "rxjs/operators";
import firebase from "firebase";
import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";

import constants from "../../app/app.constants";

@Injectable()
export class DataProvider {
  public userData;

  public bottles;
  public configuration;
  public currentBottle;
  public currentBottleDrinkers;
  public userHistory;
  public askers;

  constructor(
    private _afDB: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _gplus: GooglePlus,
    private _platform: Platform
  ) {
    this.bottles = this._afDB
      .list("/bottles")
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

    this.currentBottleDrinkers = this._afDB
      .list(`/currentBottle/drinkers`)
      .valueChanges();

    this.askers = this._afDB.list(`/currentAsk`).valueChanges();

    this.configuration = this._afDB.object("/configuration").valueChanges();
    this.currentBottle = this._afDB.object("/currentBottle").valueChanges();
  }

  public doLogin(): Promise<any> {
    if (this._platform.is("cordova")) {
      return this._nativeGoogleLogin();
    } else {
      return this._webGoogleLogin();
    }
  }

  private async _nativeGoogleLogin(): Promise<firebase.User> {
    try {
      const gplusUser = await this._gplus.login({
        webClientId: constants.webClientId,
        offline: true,
        scopes: "profile email"
      });

      return await this._afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );
    } catch (err) {
      console.log(err);
    }
  }

  private async _webGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this._afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }

  public doLogout() {
    return this._afAuth.auth.signOut();
  }

  public checkActiveSession(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.userData = user;
          console.log("USER", this.userData);
          this.getUserHistory();
          resolve();
        } else reject();
      });
    });
  }

  public startCurrentBottle() {
    return this._afDB
      .object("/currentBottle")
      .set({
        startTimestamp: database.ServerValue.TIMESTAMP
      })
      .then(() => {
        let askRef = this._afDB
          .object("/currentAsk")
          .valueChanges()
          .subscribe(data => {
            let newVal = {
              ...data
            };
            this._afDB
              .list("/askHistory")
              .push(newVal)
              .then(() => askRef.unsubscribe())
              .then(() => {
                this._afDB.object("/currentAsk").remove();
              });
          });
      });
  }

  public finishCurrentBottle() {
    let saveRef = this._afDB
      .object("/currentBottle")
      .valueChanges()
      .subscribe(data => {
        let newVal = {
          ...data,
          endTimestamp: database.ServerValue.TIMESTAMP
        };
        this._afDB
          .list("/bottles")
          .push(newVal)
          .then(() => saveRef.unsubscribe())
          .then(() => {
            this._afDB.object("/currentBottle").remove();
          });
      });
  }

  public getUserHistory() {
    this.userHistory = this._afDB
      .list(`/userHistory/${this.userData.uid}`)
      .valueChanges();
  }

  public drinkCoffee(size: { uid; size }) {
    return this._afDB
      .list("/currentBottle/drinkers")
      .push({
        user: {
          uid: this.userData.uid,
          name: this.userData.displayName
        },
        timestamp: database.ServerValue.TIMESTAMP,
        size
      })
      .then(() => {
        this._afDB.list(`/userHistory/${this.userData.uid}`).push({
          timestamp: database.ServerValue.TIMESTAMP,
          size
        });
      });
  }
  public askForCoffee() {
    return this._afDB.list("/currentAsk").push({
      user: {
        uid: this.userData.uid,
        name: this.userData.displayName
      },
      timestamp: database.ServerValue.TIMESTAMP
    });
  }
}
