import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tab4-profile',
  templateUrl: './tab4-profile.page.html',
  styleUrls: ['./tab4-profile.page.scss'],
})
export class Tab4ProfilePage implements OnInit 
{
  userId: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  ville: string;
  contrat: string;
  emploi: string;
  localisation: string;
  dispo: string;
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  connected: boolean;
  imagePath: string;
  upload: any;



  constructor
  (
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router,
    public afSG: AngularFireStorage,
    private camera: Camera,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() 
  {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.name = user.userName;
      this.lastname = user.userLastName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
      this.ville = user.userVille;
      this.contrat = user.userContrat;
      this.emploi = user.userEmploi;
      this.localisation = user.userLocalisation;
      this.dispo = user.userDispo;
    })
  }

  async updateProfile()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Updating..',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afs.collection('user').doc(this.userId).set({
      'userName': this.name,
      'userLastName' : this.lastname,
      'userEmail': this.email,
      'userPhone': this.phone,
      'userVille': this.ville,
      'userContrat': this.contrat,
      'userEmploi': this.emploi,
      'userLocalisation': this.localisation,
      'userDispo': this.dispo,
      'editAt': Date.now()
    },{merge: true})
    .then(() => {
      loading.dismiss();
      this.toast('Update Success!', 'success');
      this.router.navigate(['/tabs/profile']);
    })
    .catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  
      async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
  }
  
    async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }
  
    async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  public goToLogOut(){
    this.router.navigate(['logout']);
  }

}
