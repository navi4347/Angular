import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.login();
  }

  login() {
    this.http.post('http://localhost:5000/api/login', { username: this.username, password: this.password }, { responseType: 'text' })
      .subscribe(
        response => {
          const jsonResponse = JSON.parse(response);
          this.router.navigate(['/home']);
        },
        error => {
          this.loginError = true;
          this.errorMessage = 'Invalid username or password';
          this.username = '';
          this.password = '';
          setTimeout(() => {
            this.loginError = false;
          }, 3000);
        }
      );
  }
}