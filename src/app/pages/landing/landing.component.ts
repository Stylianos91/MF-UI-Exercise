import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private TABLE_DATA = [];
  private USERS = [];
  private POSTS = [];
   max;
  pageSize = 10;
  page = 1;
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
      tableData.push({user: post[i].userId, body: post[i].body , title: post[i].title });
    }
    for (let i = 0; i < tableData.length; i++) {
      const id = tableData[i].user;
      tableData[i].user = users[id - 1];
    }
    console.log('-----------------');
    console.log(tableData);
    this.TABLE_DATA = tableData;
    this.max = this.TABLE_DATA.length / this.pageSize;
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
}
