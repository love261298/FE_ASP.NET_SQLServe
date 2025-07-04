import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ChipModule } from "primeng/chip";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RippleModule } from "primeng/ripple";
import { BlogEditRoutingModule } from "./blog-edit-routing.module";
import { BlogEditComponent } from "./blog-edit.component";
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        RippleModule,
        ChipModule,
        EditorModule,
        BlogEditRoutingModule,
        DialogModule,
        ReactiveFormsModule
    ],
    declarations: [BlogEditComponent]
})
export class BlogEditModule { }
