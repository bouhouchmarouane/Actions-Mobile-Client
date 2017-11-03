import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Company} from "../../interfaces/company";
import {CompanyService} from "../../services/company.service";
import {Http} from "@angular/http";

@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html',
})
export class CompanyDetailsPage {

  private company: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyService, public alertCtrl: AlertController) {
    this.company = this.navParams.data.company;
  }

  deleteCompany(company_id: number) {
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to remove this company?',
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
          }
        }
      ]
    });
    confirm.present();
  }
}
