import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signupData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSignupData();
  }

  fetchSignupData(): void {
    this.http.get<{ signupData: any[] }>('http://localhost:5000/api/signup')
      .subscribe(
        response => {
          console.log('Response received:', response); 
          this.signupData = response.signupData;
        },
        error => {
          console.error('Error fetching data from API:', error);
        }
      );
  }
  
}
