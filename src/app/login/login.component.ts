import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  message: string;
  error?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.login();
  }
  login() {
    this.http.post<LoginResponse>('http://localhost:5000/api/login', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          if (response.error) {
            this.loginError = true;
            this.username = '';
            this.password = '';
            setTimeout(() => {
              this.loginError = false;
            }, 3000);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.loginError = true;
          this.username = '';
          this.password = '';
          setTimeout(() => {
            this.loginError = false; 
          }, 3000);
        }
      );
  }
}
