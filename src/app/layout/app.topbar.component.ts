import { ImageService } from './../demo/service/image.service';
import { UserService } from 'src/app/demo/service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { Router } from '@angular/router';
import { AppMessageService } from '../demo/service/app-message.service';
import { PhotoService } from '../demo/service/photo.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent implements OnInit {
  isShowAcount: boolean = false;
  isChangePassword: boolean = true;
  isSelectImages: boolean = false;
  avatar: any[] = []
  imageUrl: any
  selectedIndex: any
  images: any[] = []
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private router: Router,
    private msgService: AppMessageService,
    private userService: UserService,
    private imageService: ImageService,
    private photoService: PhotoService
  ) { }

  myself = {
    id: null,
    username: null,
    role: {lable: null, value: null},
    imageUrl: null,
    password: null,
    confirmPassword: null
  }
  ROLE: any = [
    { lable: "ADMIN", value: "Admin" },
    { lable: "USER", value: "User" },
  ]
  ngOnInit(): void {
    this.getAvarta();
    this.userService.getById(localStorage.getItem("userId")).subscribe({
      next: res => {
        this.myself.id = res.id
        this.myself.role = this.ROLE.find((r: any) => r.value === res.role)
        this.myself.username = res.username
        this.myself.imageUrl = res.image?.imageUrl
        this.imageUrl = res.image?.imageUrl
      },
      error: err => {

      }
    })
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showRightMenu();
  }

  onSearchClick() {
    this.layoutService.toggleSearchBar();
  }

  onRightMenuClick() {
    this.layoutService.showRightMenu();
  }

  get logo() {
    const logo =
      this.layoutService.config().menuTheme === 'white' ||
        this.layoutService.config().menuTheme === 'orange'
        ? 'dark'
        : 'white';
    return logo;
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/auth/login']);
    this.msgService.success("Đăng xuất thành công!")
  }
  async submit() {
    await this.getImages();
    const data = {
      imageUrl: this.myself.imageUrl,
      username: this.myself.username,
      role: this.myself.role.value,
      password: null
    }
    if (this.myself.password === this.myself.confirmPassword && this.myself.confirmPassword) {
      data.password = this.myself.password
    }
    console.log(data)
    this.userService.update(this.myself.id, data).subscribe({
      next: res => {
        this.msgService.success("Cập nhật thành công!");
        this.isShowAcount = false;
      },
      error: err => {
        this.msgService.error("Cập nhật không thành công!");
      }
    })
  }
  getAvarta() {
    this.photoService.getAvarta().then(res => {
      this.avatar = res
    })
  }
  getImages(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imageService.searchImage(this.imageUrl).subscribe({
        next: res => {
          if (res.code) {
            this.myself.imageUrl = res.image.imageUrl;
            resolve();
          } else {
            this.createImage().then(resolve).catch(reject);
          }
        },
        error: err => {
          console.log(err);
          reject(err);
        }
      });
    });
  }
  createImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imageService.create(JSON.stringify(this.imageUrl)).subscribe({
        next: res => {
          this.myself.imageUrl = res.imageUrl;
          resolve();
        },
        error: err => {
          console.log(err);
          reject(err);
        }
      });
    });
  }
}
