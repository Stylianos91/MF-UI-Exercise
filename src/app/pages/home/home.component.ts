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

  constructor(private serverService: ServerService, private router: Router, private lnd: LandingComponent) { }

  goToCompanySite(site) {
    const url = 'http://' + site;
    const win = window.open(url, '_blank');
    win.focus();
  }
  goToLogin() {
    sessionStorage.clear();
    this.router.navigateByUrl('/app/login');
  }

  goToEdit(post) {
    if (this.lnd.userToLogin['id'] === post.user['id']) {
      this.lnd.isNew = false;
      this.lnd.postToEdit = post;
      this.lnd.editTitle = post.title;
      this.lnd.editMessage = post.body;
      this.router.navigateByUrl('/app/postedit');
    }
  }

  goToNew() {
    this.lnd.isNew = true;
    this.lnd.editTitle = '';
    this.lnd.editMessage = '';
    this.router.navigateByUrl('/app/postedit');
  }
  ngOnInit() {

  }
}
