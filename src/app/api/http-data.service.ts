import {Injectable} from '@angular/core';
import {DataSymfonyService} from './data-symfony.service';
import {Observable} from 'rxjs';
import { HttpHeaders} from '@angular/common/http';
import {ajaxPost} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  state = this.dataSymfonyService.getState();
  data = this.dataSymfonyService.data;
  dataUser = this.dataSymfonyService.dataUser;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private dataSymfonyService: DataSymfonyService) {
  }

  previous() {
    return this.data;
  }

  temporarySave() {
    this.save();
    this.data.intervention.state = 'wip';
    return this.toJson();
  }

  finalSave() {
    this.save();
    this.data.intervention.state = 'closed';
    return  this.toJson();
  }

  validatePreplanning() {
    this.data.intervention.state = 'opened';
    return this.toJson();
  }

  deletePreplanning() {
    this.data.intervention.state = 'created';
    return  this.toJson();
  }

  save() {
  }

  toJson() {
    return JSON.stringify(this.data);
  }
  getToValidateUrl(): string {
    return this.dataSymfonyService.getEnvironment() ? `/${this.dataUser.user.lang}${this.data.path.toValidate}` : 'url';
  }
  getToWorkflowUrl(): string {
    return this.dataSymfonyService.getEnvironment() ? `${location.origin}/${this.dataUser.user.lang}${this.data.path.toWorkflow}` : 'url';
  }

  post(data: string): Observable<any> {
    return ajaxPost(this.getToValidateUrl(), data, {'Content-Type': 'application/json'});
  }
}
