import {Component, OnInit} from '@angular/core';
import {LandingComponent} from '../landing/landing.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  titleField = '';
  messageField = '';

  constructor(private lnd: LandingComponent, private router: Router) {
  }

  ngOnInit() {
    this.titleField = this.lnd.editTitle;
    this.messageField = this.lnd.editMessage;
  }

  goToHome() {
    this.confirmNavigation('/app/home');
  }

  saveAction() {
    console.log('Save action------------------');
    this.titleField = this.lnd.editTitle;
    this.messageField = this.lnd.editMessage;
    this.router.navigateByUrl('/app/home');
    this.lnd.saveNewPost();
  }

  cancelAction() {
    console.log('Cancel action------------------');
  }

  checkModified() {
    if ((this.titleField !== this.lnd.editTitle) && (this.messageField !== this.lnd.editMessage)) {
      return true;
    } else {
      return false;
    }
  }

  checkAnyModified() {
    if ((this.titleField !== this.lnd.editTitle) || (this.messageField !== this.lnd.editMessage)) {
      return true;
    } else {
      return false;
    }
  }

  checkEmpty(field) {
    if (!field.replace(/\s/g, '').length) {
      return true;
    } else {
      return false;
    }
  }

  checkValidated() {
    if ((this.checkEmpty(this.lnd.editTitle) === false && this.lnd.editTitle.length < 200) &&
      (this.checkEmpty(this.lnd.editMessage) === false && this.lnd.editMessage.length < 2000)) {
      return true;
    } else {
      return false;
    }
  }

  checkDisabled() {
    if (this.checkModified() === true && this.checkValidated() === true) {
      return false;
    } else {
      return true;
    }
  }

  confirmNavigation(url) {
    if (this.checkAnyModified() === true) {
      if (confirm('Unsaved Changes, Leave anyway?')) {
        this.router.navigateByUrl(url);
      }
    } else {
      this.router.navigateByUrl(url);
    }

  }

}
