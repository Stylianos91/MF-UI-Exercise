import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';
import {Router} from '@angular/router';
import {LandingComponent} from '../landing/landing.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userIn = '';

  constructor(private serverService: ServerService, private router: Router, private lnd: LandingComponent) { }



  checkForUser() {
this.userIn = sessionStorage.getItem('userLoggedIn');
    if (this.userIn) {
      return true;
    } else {
      return false;
    }
  }



  goToCompanySite(site) {
    const url = 'http://' + site;
    const win = window.open(url, '_blank');
    win.focus();
  }
  goToLogin() {
    sessionStorage.clear();
    this.router.navigateByUrl('/app/login');
  }
  goToEdit(post, title, isNew) {
    console.log(post);
    console.log(title);
    this.lnd.isNew = isNew;
    this.router.navigateByUrl('/app/postedit');
  }
  ngOnInit() {

  }
}
