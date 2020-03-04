import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {PostEditComponent} from './pages/post-edit/post-edit.component';
import {LandingComponent} from './pages/landing/landing.component';


const routes: Routes = [
  {
    path: 'app',
    component: LandingComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'postedit', component: PostEditComponent}]
  },
  {path: '', redirectTo: '/app/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
