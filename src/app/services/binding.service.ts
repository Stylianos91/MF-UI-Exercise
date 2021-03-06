import { Injectable } from '@angular/core';
import {ServerService} from './server.service';

@Injectable({
  providedIn: 'root'
})
export class BindingService {
  private TABLE_DATA = [];
  USERS = [];
  private POSTS = [];
  max = 0;
  pageSize = 10;
  page = 1;
  isNew = true;
  editTitle = '';
  editMessage = '';
  userToLogin = [];
  postToEdit = [];
  showGotSaved = false;
  showGotUpdated = false;
  showGotDeleted = false;
  constructor(private serverService: ServerService) {
    this.onGetPosts();
  }
  onGetPosts() {
    this.serverService.getServerPosts().subscribe(
      (response: any []) => {
        this.POSTS = response;
        this.onGetUsers();
      },
      (error) => console.log(error)
    );
  }
  onGetUsers() {
    this.serverService.getServerUsers().subscribe(
      (response: any []) => {
        this.USERS = response;
        this.buildTable(this.USERS, this.POSTS);
      },
      (error) => console.log(error)
    );
  }
  buildTable(users, post) {
    const tableData = [];
    for (let i = 0; i < post.length; i++) {
      tableData.push({user: post[i].userId, id: post[i].id,  body: post[i].body , title: post[i].title });
    }
    for (let i = 0; i < tableData.length; i++) {
      const id = tableData[i].user;
      tableData[i].user = users[id - 1];
    }
    this.TABLE_DATA = tableData;
    this.updateMax();
  }
  get tableData() {
    return this.TABLE_DATA
      .map((post, i) => ({id: i + 1, ...post}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  increasePage() {
    this.page++;
  }
  decreasePage() {
    this.page--;
  }

  saveNewPost() {
    this.resetMessages();
    const newRow = {user: this.userToLogin, id: this.TABLE_DATA.length, body: this.editMessage, title: this.editTitle};
    this.TABLE_DATA.unshift(newRow);
    this.TABLE_DATA = [...this.TABLE_DATA];
    this.updateMax();
    this.showGotSaved = true;
  }

  editPost() {
    this.resetMessages();
    const editRow = {user: this.userToLogin, id: this.postToEdit['id'], body: this.editMessage, title: this.editTitle};
    for (let i = 0; i < this.TABLE_DATA.length; i++) {
      if (this.TABLE_DATA[i].id === this.postToEdit['id']) {
        this.TABLE_DATA[i] = editRow;
      }
    }
    this.TABLE_DATA = [...this.TABLE_DATA];
    this.updateMax();
    this.showGotUpdated = true;
  }
  deletePost() {
    this.resetMessages();
    for (let i = 0; i < this.TABLE_DATA.length; i++) {
      if (this.TABLE_DATA[i].id === this.postToEdit['id']) {
        this.TABLE_DATA.splice( i, 1);
      }
    }
    this.TABLE_DATA = [...this.TABLE_DATA];
    this.updateMax();
    this.showGotDeleted = true;
  }
  checkForUser() {
    this.userToLogin = JSON.parse(sessionStorage.getItem('userLoggedIn'));
    if (this.userToLogin) {
      return true;
    } else {
      return false;
    }
  }
  updateMax() {
    this.max = this.TABLE_DATA.length / this.pageSize;
  }
  resetMessages() {
    this.showGotSaved = false;
    this.showGotUpdated = false;
    this.showGotDeleted = false;
  }
}
