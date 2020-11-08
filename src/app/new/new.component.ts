import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  formPost: FormGroup;
  idPost: number;

  constructor(private postService: PostService) {
    this.formPost = new FormGroup({
      titulo: new FormControl('', [
        Validators.required
      ]),
      texto: new FormControl('', [
        Validators.required,
        Validators.minLength(150)
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

    await this.postService.addPost(this.formPost.value, this.idPost);
    console.log(this.formPost.value);
    this.idPost++

    this.formPost.reset();

  }

}
