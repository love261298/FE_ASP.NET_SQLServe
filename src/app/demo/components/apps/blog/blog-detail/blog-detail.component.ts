import { filter } from 'rxjs';
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
  async ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    await this.getUsers();
    await this.getMessages();
    this.getBlog()
  }
  getUsers() {
    this.userService.getAll().subscribe({
      next: res => {
        this.users = res
        console.log(this.users)
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
        console.log(this.messages)
      }
    })
  }
  getBlog() {
    this.blogService.getById(this.blogId).subscribe({
      next: res => {
        this.blog = res
        this.blog.user = this.users.find((u: any) => { return this.blog.userId === u.id })
        this.blog.messages = this.messages.filter((msg: any) => {
          return msg.blogId === this.blog.id
        })
        const today = new Date();
        const createdAt = new Date(this.blog.createdAt);
        this.blog.dateAgo = today.getTime() - createdAt.getTime();
        console.log(this.blog)
      }
    })
  }
  comments: any[] = [
    {
      image: "assets/demo/images/avatar/circle/avatar-f-3@2x.png",
      name: "Courtney Henry",
      date: "03 February 2022",
      description: "Reprehenderit ut voluptas sapiente ratione nostrum est."
    },
    {
      image: "assets/demo/images/avatar/circle/avatar-f-1@2x.png",
      name: "Esther Howard",
      date: "03 February 2022",
      description: "How likely are you to recommend our company to your friends and family ?"
    },
    {
      image: "assets/demo/images/avatar/circle/avatar-f-4@2x.png",
      name: "Darlene Robertson",
      date: "03 February 2022",
      description: "Quo quia sit nihil nemo doloremque et."
    },
    {
      image: "assets/demo/images/avatar/circle/avatar-f-5@2x.png",
      name: "Esther Howard",
      date: "03 February 2022",
      description: "How likely are you to recommend our company to your friends and family ?"
    }
  ];

}
