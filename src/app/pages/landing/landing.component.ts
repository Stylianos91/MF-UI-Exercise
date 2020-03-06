import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
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
  constructor(private serverService: ServerService) { }

  ngOnInit() {
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
        console.log(this.USERS);
        console.log(this.POSTS);
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
    console.log('-----------------');
    console.log(tableData);
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
    const newRow = {user: this.userToLogin, id: this.TABLE_DATA.length, body: this.editMessage, title: this.editTitle};
    this.TABLE_DATA.unshift(newRow);
    this.TABLE_DATA = [...this.TABLE_DATA];
    this.updateMax();
  }

  editPost() {
    const editRow = {user: this.userToLogin, id: this.postToEdit['id'], body: this.editMessage, title: this.editTitle};
    for (let i = 0; i < this.TABLE_DATA.length; i++) {
      if (this.TABLE_DATA[i].id === this.postToEdit['id']) {
        this.TABLE_DATA[i] = editRow;
      }
    }
    this.TABLE_DATA = [...this.TABLE_DATA];
    this.updateMax();
  }
  deletePost() {
    for (let i = 0; i < this.TABLE_DATA.length; i++) {
      if (this.TABLE_DATA[i].id === this.postToEdit['id']) {
          this.TABLE_DATA.splice( i, 1);
      }
    }
    this.TABLE_DATA = [...this.TABLE_DATA];
    this.updateMax();
  }

  updateMax() {
    this.max = this.TABLE_DATA.length / this.pageSize;
    console.log('Table length is ' + this.TABLE_DATA.length);
  }
}
