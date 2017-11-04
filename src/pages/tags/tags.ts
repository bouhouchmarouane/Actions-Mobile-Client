import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../interfaces/tag";

/**
 * Generated class for the TagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tags',
  templateUrl: 'tags.html'
})
export class TagsPage {

  private tags: Tag[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tagService: TagService,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    this.initialiseTags();
  }

  initialiseTags(){
    this.tagService.getTags()
      .then(response => this.tags = response);
  }

  updateTag(tag: Tag){

  }

  deleteTag(tag: Tag) {
    let confirm = this.alertCtrl.create({
      title: 'Delete tag',
      message: 'Do you agree to delete this tag?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log("Disagree");
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.tagService.deleteTag(tag.id)
              .then(() => {
                this.initialiseTags();
                this.removeTagToast();
              })
          }
        }
      ]
    });
    confirm.present();
  }

  removeTagToast() {
    let toast = this.toastCtrl.create({
      message: 'Tag was removed successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
