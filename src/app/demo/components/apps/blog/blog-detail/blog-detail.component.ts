import { filter, forkJoin } from 'rxjs';
import { Message } from './../../../../api/message';
import { Blog } from './../../../../api/blog';
import { UserService } from './../../../../service/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/demo/service/blog.service';
import { MessageService } from 'src/app/demo/service/message.service';

@Component({
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private userService: UserService,
    private messageService: MessageService
  ) { }
  blog!: any;
  blogId!: any;
  users!: any;
  messages!: any;
  isMe: boolean = false;
  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');

    forkJoin({
      users: this.userService.getAll(),
      messages: this.messageService.getAll()
    }).subscribe({
      next: ({ users, messages }) => {
        this.users = users;
        this.messages = messages.map((msg: any) => ({
          ...msg,
          user: users.find((u: any) => u.id === msg.userId)
        }));
        this.getBlog();
      }
    });
  }

  getBlog() {
    this.blogService.getById(this.blogId).subscribe({
      next: res => {
        this.blog = res;
        this.blog.user = this.users.find((u: any) => this.blog.userId === u.id);
        this.blog.messages = this.messages.filter((msg: any) => msg.blogId === this.blog.id);

        const today = new Date();
        const createdAt = new Date(this.blog.createdAt);
        this.blog.dateAgo = today.getTime() - createdAt.getTime();

        this.isMe = localStorage.getItem("userId") == this.blog.userId;
      }
    });
  }
}
