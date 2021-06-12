import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController, LoadingController, Platform } from "@ionic/angular";

@Component({
  selector: 'app-tab1-offer',
  templateUrl: 'tab1-offer.page.html',
  styleUrls: ['tab1-offer.page.scss']
})
export class Tab1OfferPage {
  posts: any;
  subscription: any;
  searchedItem: any;
  count: number;
  entreprise: any;


  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
  ) {
    //this.searchInList(event: any)
    /*
    - La fonction searchList doit s'exécuter chargement de la page.
      Mais je ne sais pas quel paramètre lui donner pour que ca fonctionne.
    */
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async getEntreprises() {
    // console.log("get posts");
    this.count = 0;


    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
      this.firestore
        .collection("entreprise")
        .snapshotChanges()
        .subscribe(data => {
          this.entreprise = data.map(e => {
            this.count +=1;
            return {
              id: e.payload.doc.id,
              adresse: e.payload.doc.data()["adresse"],
              codepostal: e.payload.doc.data()["code_postal"],
              nom: e.payload.doc.data()["nom"],
              poste: e.payload.doc.data()["poste"],
              photo: e.payload.doc.data()["photo"]
            };
          });

          // dismiss loader
          loader.dismiss();
          this.searchedItem = this.entreprise;
        });
    } catch (e) {
      this.showToast(e);
    };
  }

  async deletePost(id: string) {
    // console.log(id);

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    await this.firestore.doc("entreprise/" + id).delete();

    // dismiss loader
    loader.dismiss();
  }

  ionViewWillEnter() {
    this.getEntreprises();
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

    this.searchedItem = this.entreprise;

    if (val && val.trim() != '') {

      this.searchedItem = this.entreprise.filter((entreprise: any) => {
        return (entreprise.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }
}
