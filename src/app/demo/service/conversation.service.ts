import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService extends BaseService {
  protected override url: string = 'Conversations';

  getConversationByUserId(userIds: any) {
    return this.http.get<any>(`${this.apiUrl}/${this.url}/user/${userIds}`)
  }
}
