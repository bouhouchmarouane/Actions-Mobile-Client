import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Company} from "../../interfaces/company";
import {CompanyService} from "../../services/company.service";
import {NavigationPage} from "../navigation/navigation";
import {Tag} from "../../interfaces/tag";
import {TagService} from "../../services/tag.service";
import { ToastController } from 'ionic-angular';
import {OperationsPage} from "../operations/operations";

@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html',
})
export class CompanyDetailsPage {

  private company: Company;
  private tags: Tag[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public companyService: CompanyService,
              public alertCtrl: AlertController,
              public tagService: TagService,
              public toastCtrl: ToastController) {
    this.company = this.navParams.data.company;
    this.tagService.getTagsByCompany(this.company.id)
      .then(response => this.tags = response);
  }

  deleteCompany(company_id: number) {
    let confirm = this.alertCtrl.create({
      title: 'Delete company',
      message: 'Do you agree to delete this company?',
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
            this.companyService.deleteCompany(company_id);
            this.navCtrl.pop();
            this.removeCompanyToast();
          }
        }
      ]
    });
    confirm.present();
  }

  navigate(){
    this.navCtrl.push(NavigationPage, {company: this.company});
  }

  removeCompanyToast() {
    let toast = this.toastCtrl.create({
      message: 'Company was removed successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  goToOperations(){
    this.navCtrl.push(OperationsPage, {company: this.company});
  }
}
