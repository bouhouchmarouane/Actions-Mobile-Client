import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Company} from "../../interfaces/company";

/**
 * Generated class for the NavigationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  company: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = this.navParams.data.company;
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    let latLng = new google.maps.LatLng(this.company.latitude, this.company.longitude);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 2,
      center: latLng
    });
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }

}
