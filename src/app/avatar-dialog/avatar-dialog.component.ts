import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {ModalController} from '@ionic/angular';
import { Input } from '@angular/core';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();
  @Input() value: any;

  constructor(
      public firebaseService: FirebaseService,
      public modalController: ModalController
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getAvatars()
        .subscribe(data => this.avatars = data);
  }

  closeModal(avatar) {
    this.modalController.dismiss(avatar);
  }

}
