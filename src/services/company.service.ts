import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Company} from '../interfaces/company';
import {Tag} from '../interfaces/tag';

const companiesUrl = 'http://localhost:8080/companies';

@Injectable()
export class CompanyService {
  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getCompanies() {
    return this.http.get(companiesUrl)
      .toPromise()
      .then(response => response.json()._embedded.companies)
      .catch(this.handleError);
  }

  deleteCompany(id: number) {
    return this.http.delete(companiesUrl + '/' + id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in company service');
    return Promise.reject(error.message || error);
  }
}
