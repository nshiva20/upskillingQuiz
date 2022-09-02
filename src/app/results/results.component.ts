import { Component, Input } from '@angular/core';
import { Answers } from '../quiz.model';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})


export class ResultsComponent {
  userData: any;
  completeJSON: any;
  @Input() answers: Answers;
  getUserData(userData) {
    this.userData = userData;
  }

  async getCompleteJson(data) {
    this.completeJSON = {
      userDetails: this.userData,
      quizDetails: data
    }
    var jsonStr = JSON.stringify(this.completeJSON)
  }
}
