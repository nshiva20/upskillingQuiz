import { Component } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Quiz } from '../quiz.model';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  quiz: Quiz[];

  constructor(private questionsService: QuestionsService,public resComp:ResultsComponent) {
    this.questionsService.getQuizzes()
      .subscribe(quiz => {
        this.quiz = quiz;
      });
  }
  getUser(name, email) {
    let userDetails = {
      name,
      email
    };
    userDetails.name = name;
    userDetails.email = email;
    this.resComp.getUserData(userDetails);
  }

  reset() {
    this.quiz = undefined;
  }
}
