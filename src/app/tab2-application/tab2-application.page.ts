import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController, LoadingController, Platform } from "@ionic/angular";
import { AuthService } from '../services/auth.service';
import { Candidature } from '../models/candidature';
import { User } from '../models/user';

@Component({
  selector: 'app-tab2-application',
  templateUrl: 'tab2-application.page.html',
  styleUrls: ['tab2-application.page.scss']
})
export class Tab2ApplicationPage {
  candidature = {} as Candidature;
  user = {} as User;
  candidatures: any;
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
    this.getCandidature();
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

  async getCandidature() {
    // console.log("get candidatures");

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {

    if (this.user.userId == this.candidature.userId){

    
      this.firestore
        .collection("candidature")
        .snapshotChanges()
        .subscribe(data => {
          this.candidatures = data.map(e => {
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
        this.searchedItem = this.userItem;

        //this.searchedItem = this.candidatures[0].userId;
        //db.collection('candidature').doc(this.userId).get();
        
        });
        }
    } catch (e) {
      this.showToast(e);
    };
  }

  filterInList(){
    //console.log("test1 " + this.candidatures[0].userId);
    const val = this.userId;

    this.searchedItem = this.candidatures.filter((candidatures: any) => {
      console.log((candidatures.userId.toLowerCase().indexOf(val.toLowerCase()) > -1));
      return (candidatures.userId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      
    })
    // this.search.getInputElement().then(item => console.log(item))
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

    this.searchedItem = this.userItem;

    if (val && val.trim() != '') {
      
      this.searchedItem = this.candidatures.filter((candidatures: any) => {
        //console.log('DANS searcheInList candidatures.post = ' + candidatures.poste);
        return (candidatures.poste.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }  

}
