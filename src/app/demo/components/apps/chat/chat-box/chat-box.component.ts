import { UserService } from './../../../../service/user.service';
import { MessageService } from './../../../../service/message.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, ViewChild, ElementRef, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit, OnChanges {
  textContent: string = '';
  emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
    '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
    '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
  ];
  myId: any
  user!: any
  messages: any[] = []
  @Input() conversation!: any;
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.myId = localStorage.getItem("userId")
  }

  getMessages(id: any) {
    this.messageService.getByConversationId(id).subscribe({
      next: (res) => {
        this.messages = res;
        this.cdr.markForCheck();
        setTimeout(() => {
          if (this.chatWindow && this.chatWindow.nativeElement) {
            this.chatWindow.nativeElement.scrollTo({
              top: this.chatWindow.nativeElement.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversation'] && changes['conversation'].currentValue) {
      if (!this.myId) {
        this.myId = localStorage.getItem("userId");
      }

      const newConversation = changes['conversation'].currentValue;

      this.user = newConversation.userConversations.find((uc: any) => uc.user.id !== this.myId)?.user;

      this.getMessages(newConversation.id);
    }
  }


  onEmojiSelect(emoji: string) {
    this.textContent += emoji;
  }
  sendMessage() {
    if (this.textContent.trim().length > 0) {
      const data = {
        blogId: null,
        conversationId: this.conversation.id,
        description: this.textContent
      }
      this.messageService.create(data).subscribe({
        next: res => {
          this.getMessages(this.conversation.id);
          this.textContent = '';
        }
      })
    }
  }
}
