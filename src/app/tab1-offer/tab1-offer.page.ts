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

  async getPosts() {
    // console.log("get posts");

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
      this.firestore
        .collection("posts")
        .snapshotChanges()
        .subscribe(data => {
          this.posts = data.map(e => {
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

  async deletePost(id: string) {
    // console.log(id);

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    await this.firestore.doc("posts/" + id).delete();

    // dismiss loader
    loader.dismiss();
  }

  ionViewWillEnter() {
    this.getPosts();
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

    this.searchedItem = this.posts;

    if (val && val.trim() != '') {
      
      this.searchedItem = this.posts.filter((posts: any) => {
        return (posts.poste.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }  
}