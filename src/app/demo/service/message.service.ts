import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {
  protected override url: string = 'Messages';
  getByBlogId(blogId: any) {
    return this.http.get<any>(`${this.apiUrl}/${this.url}/blog/${blogId}`);
  }

  getByConversationId(conversationId: any) {
    return this.http.get<any>(`${this.apiUrl}/${this.url}/conversation/${conversationId}`);
  }
}

