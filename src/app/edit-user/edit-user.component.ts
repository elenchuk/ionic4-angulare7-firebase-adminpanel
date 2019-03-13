import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  constructor(
      public firebaseService: FirebaseService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      public alertController: AlertController,
      public modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      age: [this.item.age, Validators.required],
    });
  }

  onSubmit(value) {
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
        .then(
            res => {
              this.router.navigate(['']);
            }
        );
  }
  cancel() {
    this.router.navigate(['']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm delete user',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.firebaseService.deleteUser(this.item.id)
                .then(
                    res => {
                      this.router.navigate(['']);
                    },
                    err => {
                      console.log(err);
                    }
                );
          }
        }
      ]
    });

    await alert.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarDialogComponent
    });
    modal.onDidDismiss().then((data) => {
      if (data) {
        this.item.avatar = data.data.link;
      }
    });
    return await modal.present();
  }

}
