import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from './../../../../service/image.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selectedIndex: any;
  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private photoService: PhotoService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private mgsService: AppMessageService
  ) { }
  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.blogId;
    this.getImages()
    if (this.isEdit) {
      this.getBlog();
    }
  }
  getBlog() {
    this.blogService.getById(this.blogId).subscribe({
      next: res => {
        console.log(res)
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
            this.getBlog()
          }
        })
      } else {
        this.imageService.create(JSON.stringify(this.imageUrl)).subscribe({
          next: res => {
            data.imageId = res.imageId
            this.blogService.update(this.blog.id, data).subscribe({
              next: res => {
                this.mgsService.success("Cập nhật thành công!")
                this.getBlog()
              }
            })
          }
        })
      }
    }
  }
}

