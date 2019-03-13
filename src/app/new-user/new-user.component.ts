import {Component, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink = 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=PastelPink&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Skull&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Eating&skinColor=Yellow';

  constructor(
      private fb: FormBuilder,
      private router: Router,
      public firebaseService: FirebaseService,
      public modalController: ModalController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      age: ['', Validators.required ]
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarDialogComponent
    });
    modal.onDidDismiss().then((data) => {
      if (data) {
        this.avatarLink = data.data.link;
      }
    });
    return await modal.present();
  }

  resetFields() {
    this.avatarLink = 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=PastelPink&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Skull&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Eating&skinColor=Yellow';
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.firebaseService.createUser(value, this.avatarLink)
        .then(
            res => {
              this.resetFields();
              this.router.navigate(['']);
            }
        );
  }

}
