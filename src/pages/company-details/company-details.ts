import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Company} from "../../interfaces/company";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html',
})
export class CompanyDetailsPage {

  private company: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyService) {
    this.company = this.navParams.data.company;
  }
}
