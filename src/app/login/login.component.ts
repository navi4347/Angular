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

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    if (this.username === 'admin' && this.password === 'Password') {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
      this.username = '';
      this.password = '';
      setTimeout(() => {
        this.loginError = false; 
      }, 1000); 
    }
    if (event) {
      event.preventDefault();
    }
  }
}
