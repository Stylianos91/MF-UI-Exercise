import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';
import {Router} from '@angular/router';
import {LandingComponent} from '../landing/landing.component';
import {BindingService} from '../../services/binding.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private serverService: ServerService, private router: Router, private bnd: BindingService) { }

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
    if (this.bnd.userToLogin['id'] === post.user['id']) {
      this.bnd.isNew = false;
      this.bnd.postToEdit = post;
      this.bnd.editTitle = post.title;
      this.bnd.editMessage = post.body;
      this.router.navigateByUrl('/app/postedit');
    }
  }

  goToNew() {
    this.bnd.isNew = true;
    this.bnd.editTitle = '';
    this.bnd.editMessage = '';
    this.router.navigateByUrl('/app/postedit');
  }
  ngOnInit() {

  }
}
