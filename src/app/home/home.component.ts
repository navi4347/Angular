import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from '../Services/signup.service';
import { Subscription } from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {
  userid: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  signupData: SignupData[] = [];
  editedUser: SignupData = { userid: '', username: '', password: '' };
  isEditing: boolean = false;
  isAdding: boolean = false;
  private subscription!: Subscription;

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
    this.fetchSignupData();
  }

  fetchSignupData(): void {
    this.subscription = this.signupService.getAllSignupData()
      .subscribe(
        response => {
          this.signupData = response.signupData || []; 
        },
        error => {
          console.error('Error fetching data from API:', error);
        }
      );
  }

  onSubmit(): void {
    const data = {
      userid: this.userid,
      username: this.username,
      password: this.password
    };

    this.signupService.addSignupData(data).subscribe(
      response => {
        console.log('Data inserted successfully:', response);
        this.userid = '';
        this.username = '';
        this.password = '';
        this.errorMessage = '';
        this.fetchSignupData();
      },
      error => {
        console.error('Error inserting data:', error);
        this.errorMessage = 'Error inserting data. Please try again.';
      }
    );
  }

  editSignup(pair: SignupData): void {
    this.editedUser = { ...pair };
    this.isEditing = true;
  }

  updateSignup(): void {
    this.signupService.updateSignupData(this.editedUser.userid, this.editedUser).subscribe(
      response => {
        console.log('Data updated successfully:', response);
        this.editedUser = { userid: '', username: '', password: '' };
        this.isEditing = false;
        this.fetchSignupData();
      },
      error => {
        console.error('Error updating data:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editedUser = { userid: '', username: '', password: '' };
    this.isEditing = false;
  }

  cancelAction(): void {
    this.isAdding = false;
    this.isEditing = false;
  }

  deleteSignup(userid: string): void {
    this.signupService.deleteSignupData(userid).subscribe(
      response => {
        console.log('Data deleted successfully:', response);
        this.fetchSignupData();
      },
      error => {
        console.error('Error deleting data:', error);
      }
    );
  }

  showAddForm(): void {
    this.isAdding = true;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
