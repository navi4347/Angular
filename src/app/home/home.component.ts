import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SignupData {
  userid: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signupData: SignupData[] = []; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSignupData();
  }

  fetchSignupData(): void {
    this.http.get<{ signupData: SignupData[] }>('http://localhost:5000/api/signup')
      .subscribe(
        response => {
          this.signupData = response.signupData || []; 
        },
        error => {
          console.error('Error fetching data from API:', error);
        }
      );
  }
}
