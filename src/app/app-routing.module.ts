import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
const routes: Routes = [
  { path:'', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  {path:'login', component: LoginComponent},
  { path: '**', redirectTo: '404' }, 
  {path: '404', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
