import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post, PostService } from '../services/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './uploadadapter.class';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public Editor = ClassicEditor;
  formPost: FormGroup;
  idPost: number;
  action: string;
  postEdit: Post;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

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

    if (this.router.url.includes('edit')) {
      this.action = 'edit'
    } else {
      this.action = 'new'
    }
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.postService.getById(Number(this.activatedRoute.snapshot.paramMap.get('postId')))
        .then(postEdit => {
          this.postEdit = postEdit
          this.formPost.controls.titulo.setValue(postEdit.titulo);
          this.formPost.controls.texto.setValue(postEdit.texto);
          this.formPost.controls.autor.setValue(postEdit.autor);
          this.formPost.controls.imagen.setValue(postEdit.imagen);
          this.formPost.controls.fecha.setValue(postEdit.fecha)
          this.formPost.controls.categoria.setValue(postEdit.categoria)
          this.formPost.controls.claves.setValue(postEdit.claves)
        })
    }
  }

  async onSubmit() {
    if (this.formPost.valid) {
      if (this.action === 'new') {
        await this.postService.addPost(this.formPost.value, this.idPost);
        console.log(this.formPost.value);
        this.idPost++
        this.formPost.reset();
      } else if (this.action === 'edit') {
        await this.postService.editPost(this.formPost.value, this.postEdit.id)
        this.formPost.reset();
      }
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


