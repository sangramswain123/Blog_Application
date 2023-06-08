import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private http: HttpClient , private router:Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  user:any = {};
  signupSuccess = false;
  signupError = false;

  credentials: any = {};
  loginError = false;

  signupUser(){
    this.apiService.signupUser(this.user).subscribe(
      response => {
        console.log(this.user);
        console.log(response);
        this.signupSuccess = true;
        this.signupError = false;
      },
      error => {
        console.error(error);
        this.signupSuccess = false;
        this.signupError = true;
      }
    );
  }

  account = 'login';
  toggleSignup(): void {
    this.account = this.account === 'signup' ? 'login' : 'signup';
  }


  loginUser(){
    this.apiService.loginUser(this.credentials).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('email', response.email);
        localStorage.setItem('name', response.name);
        this.router.navigateByUrl('/home');
      },
      error => {
        console.error(error);
        this.loginError = true;
      }
    );
  }

}
