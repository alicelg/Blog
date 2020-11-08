import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './uploadadapter.class';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public Editor = ClassicEditor;
  formPost: FormGroup;
  idPost: number;

  constructor(private postService: PostService) {
    this.formPost = new FormGroup({
      titulo: new FormControl('', [
        Validators.required
      ]),
      texto: new FormControl('', [
        Validators.required,
        /* Validators.minLength(150) */
      ]),
      autor: new FormControl('', [
        Validators.required,
      ]),
      imagen: new FormControl('', [
        Validators.required,
      ]),
      fecha: new FormControl('', [
        Validators.required,
      ]),
      categoria: new FormControl('', [
        Validators.required,
      ]),
      claves: new FormControl('', [
        Validators.required,
      ]),
    })
    this.idPost = JSON.parse(localStorage.getItem('posts')) ? (JSON.parse(localStorage.getItem('posts')).slice(-1)[0].id + 1) : 1;
    /*     console.log(this.idPost);
     */
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.formPost.valid) {
      await this.postService.addPost(this.formPost.value, this.idPost);
      console.log(this.formPost.value);
      this.idPost++

      this.formPost.reset();
    } else {
      alert('Alguno de los campos no está relleno')
    }


  }

  /* esto sirve para subir las fotos al textarea - editor de texto */
  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }

}


