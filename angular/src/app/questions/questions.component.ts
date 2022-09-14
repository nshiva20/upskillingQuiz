import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quiz!: Quiz;
  answers!: Answers;
  questions!: Question[];
  currentQuestionIndex!: number;
  ansCorrect: any;
  ansCount = 0;
  userDetails;
  showResults = false;

  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, public questionsService: QuestionsService, public resultComp: ResultsComponent) { }

  ngOnInit() {

    // read from the dynamic route and load the proper quiz data
    this.questionsService.getQuestions(this.route.snapshot.params['quizId'])
      .subscribe(questions => {
        // initialize everything
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      this.getJson();
      return;
    }

    this.currentQuestionIndex++;
  }

  reset() {
    this.quiz = new Quiz('', '', '', '');
    this.questions = [];
    this.answers = new Answers([]);
    this.currentQuestionIndex = -1;
  }

  getJson() {
    this.userDetails = this.questionsService.getUserData(this.userDetails)
    this.ansCorrect = this.answers.values;
    for (var i = 0; i < this.answers.values.length; i++) {
      if (this.ansCorrect[i].correct === true) {
        this.ansCount++;
      }
    }
    this.ansCount = this.ansCount;
    var comJson = {
      quizData: this.answers.values,
      scoreCount: this.ansCount
    }
    this.resultComp.getCompleteJson(comJson)

  }
}
