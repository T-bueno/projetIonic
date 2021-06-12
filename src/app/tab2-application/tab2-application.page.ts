import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController, LoadingController, Platform } from "@ionic/angular";

@Component({
  selector: 'app-tab2-application',
  templateUrl: 'tab2-application.page.html',
  styleUrls: ['tab2-application.page.scss']
})
export class Tab2ApplicationPage {
  candidature: any;
  subscription: any;
  searchedItem: any;

  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
  ) {}

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async getCandidature() {
    // console.log("get posts");

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
      this.firestore
        .collection("candidature")
        .snapshotChanges()
        .subscribe(data => {
          this.candidature = data.map(e => {
            return {
              id: e.payload.doc.id,
              poste: e.payload.doc.data()["poste"],
              entreprise: e.payload.doc.data()["entreprise"],
              adresse: e.payload.doc.data()["adresse"]
            };
          });

          // dismiss loader
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    };
  }

  async deleteCandidature(id: string) {
    // console.log(id);

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    await this.firestore.doc("candidature/" + id).delete();

    // dismiss loader
    loader.dismiss();
  }

  ionViewWillEnter() {
    this.getCandidature();
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  searchInList(event: any) {
    const val = event.target.value;

    this.searchedItem = this.candidature;

    if (val && val.trim() != '') {
      
      this.searchedItem = this.candidature.filter((candidature: any) => {
        return (candidature.poste.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }  

}
