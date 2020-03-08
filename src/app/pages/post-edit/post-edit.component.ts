import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BindingService} from '../../services/binding.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  titleField = '';
  messageField = '';

  constructor(private bnd: BindingService, private router: Router) {
  }

  ngOnInit() {
    this.titleField = this.bnd.editTitle;
    this.messageField = this.bnd.editMessage;
  }

  goToHome() {
    this.confirmNavigation('/app/home');
  }

  saveAction() {
    this.titleField = this.bnd.editTitle;
    this.messageField = this.bnd.editMessage;
    this.router.navigateByUrl('/app/home');
    this.bnd.saveNewPost();
  }
  editAction() {
    this.router.navigateByUrl('/app/home');
    this.bnd.editPost();
  }
  deleteAction() {
    if (confirm('Are you sure you want to delete this post?')) {
      this.bnd.deletePost();
      this.router.navigateByUrl('/app/home');
    }

  }

  cancelAction() {
    this.confirmNavigation('/app/home');
  }

  checkModified() {
    if ((this.titleField !== this.bnd.editTitle) && (this.messageField !== this.bnd.editMessage)) {
      return true;
    } else {
      return false;
    }
  }

  checkAnyModified() {
    if ((this.titleField !== this.bnd.editTitle) || (this.messageField !== this.bnd.editMessage)) {
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
    if ((this.checkEmpty(this.bnd.editTitle) === false && this.bnd.editTitle.length < 200) &&
      (this.checkEmpty(this.bnd.editMessage) === false && this.bnd.editMessage.length < 2000)) {
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

  checkDisabledAny() {
    if (this.checkAnyModified() === true && this.checkValidated() === true) {
      return false;
    } else {
      return true;
    }
  }

  confirmNavigation(url) {
    this.bnd.resetMessages();
    if (this.checkAnyModified() === true) {
      if (confirm('Unsaved Changes, Leave anyway?')) {
        this.router.navigateByUrl(url);
      }
    } else {
      this.router.navigateByUrl(url);
    }

  }

}
