import { Component, OnInit } from '@angular/core';
import {LandingComponent} from '../landing/landing.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userNameFound = '';
  availableUsers = [];
  constructor(private lnd: LandingComponent, private router: Router) { }
  checkEmpty(field) {
    if (!field.replace(/\s/g, '').length) {
      return true;
    } else {
      return false;
    }
  }
  getUsers() {
    for (let i = 0; i < this.lnd.USERS.length; i++) {
      this.availableUsers.push(this.lnd.USERS[i].username);
    }
    }

  checkUsers(userName) {
    this.getUsers();
      if (this.availableUsers.includes(userName)) {
        console.log('Found in names ' + userName);
        this.userNameFound = userName;
        return false;
      } else {
        console.log('Not in names');
        return true;
      }
  }

  loginAction() {
    for (let i = 0; i < this.lnd.USERS.length; i++) {
     if (this.userNameFound === this.lnd.USERS[i].username) {
       this.lnd.userToLogin = this.lnd.USERS[i];
       sessionStorage.setItem('userLoggedIn', this.lnd.userToLogin['name'].toString());
       console.log('Login action------0');
       this.router.navigateByUrl('/app/home');
     }
    }
  }
  ngOnInit() {
  }

}
