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
  runActions(){
    console.log(' Run actions ');
  }

  ngOnInit() {

  }
}
