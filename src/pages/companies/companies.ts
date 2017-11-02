import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CompanyService} from "../../services/company.service";
import {Company} from "../../interfaces/company";
import {CompanyDetailsPage} from "../company-details/company-details";

/**
 * Generated class for the CompaniesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {

  private companies: Company[];
  private items: Company[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyService) {
    this.companyService.getCompanies()
      .then(response => {
        this.companies = response;
        this.initializeItems();
      });
  }

  initializeItems(){
    this.items = this.companies
  }

  onSearch(ev: any){
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((c) => {
        return (c.name.toLowerCase().indexOf(val.toLowerCase()) !== -1);
      })
    }
  }

  detailsCompany(c){
    this.navCtrl.push(CompanyDetailsPage, {company: c});
  }
}
