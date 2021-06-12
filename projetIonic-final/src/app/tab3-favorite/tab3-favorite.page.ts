import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController, LoadingController, Platform } from "@ionic/angular";
import { AuthService } from '../services/auth.service';
import { Favorite } from '../models/favorite';
import { User } from '../models/user';

@Component({
  selector: 'app-tab3-favorite',
  templateUrl: 'tab3-favorite.page.html',
  styleUrls: ['tab3-favorite.page.scss']
})
export class Tab3FavoritePage {
  favorite = {} as Favorite;
  user = {} as User;
  favorites: any;
  subscription: any;
  searchedItem: any;
  userId: string;
  userItem: any;
  poste: string;

  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    // console.log(this.id);
    this.getFavorite();
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
    })
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async getFavorite() {
    // console.log("get favorites");

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {

    if (this.user.userId == this.favorite.userId){

    
      this.firestore
        .collection("favorite")
        .snapshotChanges()
        .subscribe(data => {
          this.favorites = data.map(e => {
            return {
              id: e.payload.doc.id,
              poste: e.payload.doc.data()["poste"],
              entreprise: e.payload.doc.data()["entreprise"],
              adresse: e.payload.doc.data()["adresse"],
              userId: e.payload.doc.data()["userId"],
              postId: e.payload.doc.data()["postId"]
            };
          });
        

          // dismiss loader
          loader.dismiss();

        this.searchedItem = this.filterInList();
        //this.searchedItem = this.candidatures[0].userId;
        //db.collection('candidature').doc(this.userId).get();
        console.log('return de la fonction dans getCandid' + this.filterInList());
        });
        }
    } catch (e) {
      this.showToast(e);
    };
  }

  filterInList(){
    //console.log("test1 " + this.candidatures[0].userId);
    const val = this.userId;

    this.searchedItem = this.favorites.filter((favorites: any) => {
      console.log((favorites.userId.toLowerCase().indexOf(val.toLowerCase()) > -1));
      return (favorites.userId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      
    })
    // this.search.getInputElement().then(item => console.log(item))
  }

  async deleteFavorite(id: string) {
    // console.log(id);

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    await this.firestore.doc("favorite/" + id).delete();

    // dismiss loader
    loader.dismiss();
  }

  ionViewWillEnter() {
    this.getFavorite();
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

    this.searchedItem = this.userItem;

    if (val && val.trim() != '') {
      
      this.searchedItem = this.favorites.filter((favorites: any) => {
        //console.log('DANS searcheInList candidatures.post = ' + candidatures.poste);
        return (favorites.poste.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }  

}
