import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  message: string;
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

    this.http.post<LoginResponse>('/api/login', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          this.router.navigate(['/home']);
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
