import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog-list-card',
    templateUrl: './blog-list-card.component.html',
})
export class BlogListCardComponent {

    @Input() blog!: any;

    constructor(private router: Router) { }

    navigateToDetail(): void {
        this.router.navigateByUrl(`/apps/blog/detail/${this.blog.id}`);
    }
}
