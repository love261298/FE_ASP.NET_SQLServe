import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/demo/service/user.service';
import { ConversationService } from 'src/app/demo/service/conversation.service';
import { UserConversationService } from 'src/app/demo/service/userConversation.service';
import { MessageService } from 'src/app/demo/service/message.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html'
})
export class ChatSidebarComponent implements OnInit {
  searchValue: string = '';
  myself: any
  users: any[] = [];
  @Input() user: any = null
  @Output() onChange = new EventEmitter<any>();
  filteredUsers: any[] = [];
  filterConversations: any[] = [];
  lastMessage!: any;
  conversations: any[] = [];
  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private userConversationService: UserConversationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getConversation()
  }
  getUsers() {
    const myId = localStorage.getItem('userId');
    this.userService.getAll().subscribe({
      next: (res: any[]) => {
        this.myself = res.find(u => u.id === myId);
        this.users = res.filter((u: any) => u.id !== myId);
        this.filterUser();
      },
      error: err => {
        console.error('Failed to fetch users:', err);
      }
    });
  }
  getConversation() {
    const myId = localStorage.getItem('userId');
    this.conversationService.getConversationByUserId(myId).subscribe({
      next: res => {
        this.conversations = res;
        this.conversations.forEach((c: any) => {
          this.userConversationService.GetUserConversation(c.id).subscribe({
            next: res => {
              c.userConversations = res.filter((uc: any) => {
                return uc.userId != myId
              })
              c.userConversations.forEach((uc: any) => {
                if (uc.userId != myId) {
                  this.userService.getById(uc.userId).subscribe({
                    next: res => {
                      uc.user = res
                    }
                  })
                }
              })
              console.log(c)
            }
          })
        })
        this.filterConversation();
        this.filterUser();
      },
      error: err => {
        console.log(err)
      }
    })
  }
  filterUser() {
    if (this.searchValue === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((u: any) =>
        u.username.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  }
  filterConversation() {
    if (this.searchValue === '') {
      this.filterConversations = this.conversations;
    } else {
      this.filterConversations = []
    }
  }
  createConversation(user: any) {
    if (user && this.myself && user.id != this.myself.id) {
      const userId = [user.id, this.myself.id]
      this.conversationService.create(userId).subscribe({
        next: res => {
          console.log(res)
          this.getConversation()
          this.changeView(res.conversation)
        },
        error: err => console.log(err)
      })
    }
  }
  changeView(conversation: any) {
    this.onChange.emit(conversation)
  }
}
