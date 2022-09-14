import { Component, Input } from '@angular/core';
import { Answers } from '../quiz.model';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import nodemailer from "nodemailer";
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})


export class ResultsComponent {

  userData: any;
  completeJSON: any;
  jsonStr;

  constructor(public backendAPI: BackendApiService) { }
  @Input() answers!: Answers;

  getUserData(userData: any) {
    this.userData = userData;
  }
  getCompleteJson(data: any) {
    this.completeJSON = {
      userDetails: this.userData,
      quizDetails: data
    }
    this.jsonStr = JSON.stringify(this.completeJSON);
    this.backendAPI.create(this.completeJSON);
    // const blob = new Blob([jsonStr], { type: 'application/json' });
    // saveAs(blob, '../test.json');
  }


}
