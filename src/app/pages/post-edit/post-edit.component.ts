import { Component, OnInit } from '@angular/core';
import {LandingComponent} from '../landing/landing.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(private lnd: LandingComponent, private router: Router) { }

  ngOnInit() {
  }
  goToHome() {
    this.router.navigateByUrl('/app/home');
  }
  }
