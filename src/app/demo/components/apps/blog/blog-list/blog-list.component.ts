import { UserService } from './../../../../service/user.service';
import { Subscription, filter } from 'rxjs';
import { ImageService } from './../../../../service/image.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Blog } from 'src/app/demo/api/blog';
import { AppMessageService } from 'src/app/demo/service/app-message.service';
import { BlogService } from 'src/app/demo/service/blog.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/demo/service/message.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) { }
  totalBlogs: any[] = [];
  users!: any;
  messages!: any
  async ngOnInit() {
    await this.getUsers();
    await this.getMessages();
    this.getBlogs();
  }
  getBlogs() {
    this.blogService.getAll().subscribe({
      next: res => {
        this.totalBlogs = res;
        this.totalBlogs.forEach((blog: any) => {
          blog.user = this.users.find((u: any) => {
            return u.id === blog.userId
          })
          blog.messages = this.messages.filter((msg: any) => {
            return blog.id === msg.blogId
          })
        });
      }
    })
  }
  getUsers() {
    this.userService.getAll().subscribe({
      next: res => {
        this.users = res
      }
    })
  }
  getMessages() {
    this.messageService.getAll().subscribe({
      next: res => {
        this.messages = res
        this.messages.forEach((msg: any) => {
          msg.user = this.users.find((u: any) => {
            return u.id === msg.userId
          })
        })
      }
    })
  }
  onCreateBlog() {
    this.router.navigate(["/apps/blog/edit", { queryParams: { id: null} }]);
  }
}
