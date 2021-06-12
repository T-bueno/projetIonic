import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, Platform } from "@ionic/angular";
import { Post } from '../models/post.model';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1-offer',
  templateUrl: 'tab1-offer.page.html',
  styleUrls: ['tab1-offer.page.scss']
})
export class Tab1OfferPage {
  posts: any;
  //posts = {} as Post;
  subscription: any;
  searchedItem: any;
  user = {} as User;
  id: any;
  userId: string;
  postId: string;


  constructor(
    private toastCtrl: ToastController,
    private auth: AuthService,
    private afs: AngularFirestore,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private actRoute: ActivatedRoute,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
    }
  ngOnInit() {
    // console.log(this.id);

    //this.getPostById(this.id);
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
    
    })
  }
  /*
  async getPostById(id: string) {
    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    this.firestore
      .doc("posts/" + id)
      .valueChanges()
      .subscribe(data => {
        this.posts.poste = data["poste"];
        this.posts.entreprise = data["entreprise"];
        this.posts.adresse = data["adresse"];
        this.posts.libelle_activite = data["libelle_activite"];
        this.posts.libelle_presentation = data["libelle_presentation"];
        this.posts.libelle_poste = data["libelle_poste"];
        this.posts.postId = data["posteId"];

        // dismiss loader
        loader.dismiss();
      });
  }
  */


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
          this.searchedItem = this.posts;
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
  async favorite()
  {
        const res = await this.afs.collection('favorite').add({
          poste: this.posts.poste,
          entreprise: this.posts.entreprise,
          adresse: this.posts.adresse,
          userId: this.userId,
          postId: this.id

    });

}
}