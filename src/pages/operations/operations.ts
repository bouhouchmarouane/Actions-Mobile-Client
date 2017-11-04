import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Company} from "../../interfaces/company";
import {OperationService} from "../../services/operation.service";
import {Operation} from "../../interfaces/operation";

/**
 * Generated class for the OperationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-operations',
  templateUrl: 'operations.html',
})
export class OperationsPage {

  private company: Company;
  private buys: Operation[];
  private sells: Operation[];
  private sellItems: Operation[] = [];
  private buyItems: Operation[] = [];
  private operation_type: string;
  private items_scroll = 5;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public operationService: OperationService) {
    this.company = this.navParams.data.company;
    //Sells
    this.operationService.getSellsByCompany(this.company.id)
      .then(response => {
        this.sells = response;
        for (let i = 0; i < this.items_scroll; i++)
          this.sellItems.push(this.sells[this.sellItems.length] );
      });
    //Buys
    this.operationService.getBuysByCompany(this.company.id)
      .then(response => {
        this.buys = response;
        for (let i = 0; i < this.items_scroll; i++)
          this.buyItems.push(this.buys[this.buyItems.length] );
        console.log(this.buyItems);
      });
  }

  loadOperations(operation_type, event){
    setTimeout(() => {
      if(operation_type == 'b'){
        for (let i = 0; i < this.items_scroll; i++)
          this.buyItems.push(this.buys[this.buyItems.length] );
      }
      else{
        for (let i = 0; i < this.items_scroll; i++)
          this.sellItems.push(this.sells[this.sellItems.length] );
      }
      event.complete();
    }, 2500);
  }

  operation_type_chenged(){
    this.content.scrollToTop();
  }
}
