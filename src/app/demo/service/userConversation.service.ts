import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserConversationService extends BaseService{
  protected override url: string = 'UserConversations';

  GetUserConversation(conversationId:any){
    return this.http.get<any>(`${this.apiUrl}/${this.url}/conversation/${conversationId}`)
  }
  GetUserConversationsByUserId(UserId:any){
    return this.http.get<any>(`${this.apiUrl}/${this.url}/user/${UserId}`)
  }
}
