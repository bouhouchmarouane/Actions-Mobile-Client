import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../interfaces/tag";
import {appInitializerFactory} from "@angular/platform-browser/src/browser/server-transition";

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

  updateTag(tag: Tag) {
    let prompt = this.alertCtrl.create({
      title: 'Update tag',
      message: "Enter the new label for this tag",
      inputs: [
        {
          name: 'label',
          placeholder: 'Label'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            tag.label = data.label;
            this.tagService.updateTag(tag)
              .then(() => {
                this.initialiseTags();
                this.tagToast('Tag was updated successfully');
              })
          }
        }
      ]
    });
    prompt.present();
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
                this.tagToast('Tag was deleted successfully');
              })
          }
        }
      ]
    });
    confirm.present();
  }

  tagToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
