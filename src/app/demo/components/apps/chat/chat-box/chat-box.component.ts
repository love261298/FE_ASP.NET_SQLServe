import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Message } from 'src/app/demo/api/message';
import { AppMessageService } from 'src/app/demo/service/app-message.service';
import { ConversationService } from 'src/app/demo/service/conversation.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit, OnChanges {
  message!: Message;
  textContent: string = '';
  emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
    '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
    '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
  ];
  conversation = {
    userIds: [] as (string | null)[],
    message: [] as (string | null)[]
  }
  myId: any
  @Input() user!: any;

  constructor(
    private conversationService: ConversationService,
  ) { }
  ngOnInit(): void {
  }
  ngOnChanges() {
    this.getConversation()
  }
  getConversation() {
    this.myId = localStorage.getItem("userId");
    this.conversation.userIds.push(this.myId)
    this.conversation.userIds.push(this.user.id)
  }
  onEmojiSelect(emoji: string) {
    this.textContent += emoji;
  }
}
