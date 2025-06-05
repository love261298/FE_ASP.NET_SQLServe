import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from './../../../../service/image.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/demo/service/blog.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { AppMessageService } from 'src/app/demo/service/app-message.service';

@Component({
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
  imageUrl!: any;
  isEdit: boolean = true;
  isSelectImages: boolean = false;
  images: any[] = [];
  blogId: any
  blog: any
  isDeleteBlog: boolean = false;
  selectedIndex: any;
  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  constructor(
    private routeParam: ActivatedRoute,
    private imageService: ImageService,
    private photoService: PhotoService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private mgsService: AppMessageService,
    private router: Router
  ) { }
  ngOnInit() {
    this.routeParam.queryParams.subscribe(params => {
      this.blogId = params['id'];
      console.log(params)
    });
    this.getImages()
    if (this.blogId) {
      this.getBlog();
    }
  }
  getBlog() {
    this.blogService.getById(this.blogId).subscribe({
      next: res => {
        this.blog = res;
        this.postForm.patchValue({
          title: res.title,
          description: res.description
        });
        this.imageUrl = res?.image?.imageUrl
      }
    })
  }
  getImages() {
    this.photoService.getImagesBlog().then(res => {
      this.images = res
    })
  }
  onSubmit() {
    if (this.postForm.valid) {
      const data = {
        title: this.postForm.value.title,
        description: this.postForm.value.description,
        imageId: this.blog?.image?.id
      }
      if (this.imageUrl === this.blog?.image?.imageUrl) {
        this.blogService.update(this.blog.id, data).subscribe({
          next: res => {
            this.mgsService.success("Cập nhật thành công!")
            this.router.navigateByUrl("/apps/blog/list")
          }
        })
      } else {
        this.imageService.create(JSON.stringify(this.imageUrl)).subscribe({
          next: res => {
            data.imageId = res.imageId
            if (!!this.blogId) {
              this.blogService.update(this.blog.id, data).subscribe({
                next: res => {
                  this.mgsService.success("Cập nhật thành công!")
                  this.router.navigateByUrl("/apps/blog/list")
                }
              })
            } else {
              this.blogService.create(data).subscribe({
                next: res => {
                  this.mgsService.success("Tạo mới thành công!")
                  this.router.navigateByUrl("/apps/blog/list")
                }
              })
            }
          }
        })
      }
    }
  }

  onDelete() {
    console.log(this.blog.id)
    this.blogService.deleteById(this.blog.id).subscribe({
      next: res => {
        this.mgsService.success("Xóa thành công!")
        this.router.navigateByUrl('/apps/blog/list')
      },
      error: err => {
        this.mgsService.error("Xóa thất bại!")
      }
    })
  }
}

