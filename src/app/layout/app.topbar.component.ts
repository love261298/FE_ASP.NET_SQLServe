import { ImageService } from './../demo/service/image.service';
import { UserService } from 'src/app/demo/service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { Router } from '@angular/router';
import { AppMessageService } from '../demo/service/app-message.service';
import { PhotoService } from '../demo/service/photo.service';

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
        role: null,
        imageId: null,
        password: null,
        confirmPassword: null
    }
    imageURL: any
    ROLE: any = [
        { name: "ADMIN", code: 'admin' },
        { name: "USER", code: 'user' },
    ]
    ngOnInit(): void {
        this.getImages();
        this.getAvarta();
        this.userService.getById(localStorage.getItem("userId")).subscribe({
            next: res => {
                this.myself.id = res.id
                this.myself.username = res.username
                this.myself.role = res.role
                this.myself.imageId = res.imageId
                this.imageURL = res.image.imageUrl
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
    submit() {
        console.log(this.myself)
    }
    getAvarta() {
        this.photoService.getAvarta().then(res => {
            this.avatar = res
        })
    }
    getImages() {
        this.imageService.getAll().subscribe({
            next: res => this.images = res,
            error: err => console.log(err)
        })
    }
}
