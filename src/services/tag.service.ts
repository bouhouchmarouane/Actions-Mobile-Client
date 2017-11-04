import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Tag} from "../interfaces/tag";


const tagsUrl = 'http://localhost:8080/tags';
const companiesUrl = 'http://localhost:8080/companies';

@Injectable()
export class TagService {

  constructor(private http: Http) { }

  getTags() {
    return this.http.get(tagsUrl)
      .toPromise()
      .then(response => response.json()._embedded.tags)
      .catch(this.handleError);
  }

  getTagsByCompany(company_id: number): Promise<Tag[]> {
    return this.http.get(companiesUrl + '/' + company_id + '/tags')
      .toPromise()
      .then(response => response.json()._embedded.tags)
      .catch(this.handleError);
  }

  deleteTag(id: number) {
    return this.http.delete(tagsUrl + '/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  updateTag(tag: Tag) {
    return this.http.put(tagsUrl + "/" + tag.id, tag)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred****', error);
    return Promise.reject(error.message || error);
  }
}
