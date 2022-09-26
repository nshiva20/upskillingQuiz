import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Quiz } from '../quiz.model';
import { ResultsComponent } from '../results/results.component';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  quiz!: Quiz[];
  name!: String;
  email!: String;
  welcomeForm!: FormGroup;

  ngOnInit() {
    this.welcomeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]]
    });

  }
  constructor(private questionsService: QuestionsService, public resComp: ResultsComponent, private formBuilder: FormBuilder, private apiService:BackendApiService, private route:Router) {
    this.questionsService.getQuizzes()
      .subscribe(quiz => {
        this.quiz = quiz;
      });
  }
  getUser(name: any, email: any, url:string) {
    let userDetails = {
      name,
      email,
    };
    userDetails.name = this.name;
    userDetails.email = this.email; 
    // alert(JSON.stringify(userDetails));
    // this.questionsService.getUserData(userDetails);
    this.resComp.getUserData(userDetails);
    // console.log(userDetails);
    this.apiService.checkAccess(userDetails).subscribe((res:any)=>{
      // alert(JSON.stringify(res) +" ____________")
      if(res.response==true){
        // alert("in here")
        this.route.navigate(['/'+url]);
      }
    })
    // 
  }

  reset() {
    this.quiz = [];
  }
}
