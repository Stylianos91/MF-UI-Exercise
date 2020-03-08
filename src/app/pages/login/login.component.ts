import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BindingService} from '../../services/binding.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  availableUsers = [];
  userNameField = '';
  userNotValid = false;
  constructor(private bnd: BindingService, private router: Router) { }
  checkEmpty(field) {
    if (!field.replace(/\s/g, '').length) {
      return true;
    } else {
      return false;
    }
  }
  getUsers() {
    for (let i = 0; i < this.bnd.USERS.length; i++) {
      this.availableUsers.push(this.bnd.USERS[i].username);
    }
    }

  checkUsers(userName) {
    this.getUsers();
      if (this.availableUsers.includes(userName)) {
        this.userNotValid = false;
      } else {
        this.userNotValid =  true;
      }
  }

  loginAction(userName) {
    this.checkUsers(userName);
    for (let i = 0; i < this.bnd.USERS.length; i++) {
     if (userName === this.bnd.USERS[i].username) {
       this.bnd.userToLogin = this.bnd.USERS[i];
       sessionStorage.setItem('userLoggedIn', JSON.stringify(this.bnd.userToLogin));
       this.router.navigateByUrl('/app/home');
     }
    }
  }
  ngOnInit() {
  }

}
