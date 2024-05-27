import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.login();
  }

  login() {
    if (this.username === 'username' && this.password === 'password') {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
      this.errorMessage = 'Invalid username or password';
      this.username = '';
      this.password = '';
      setTimeout(() => {
        this.loginError = false;
      }, 3000);
    }
  }
}
