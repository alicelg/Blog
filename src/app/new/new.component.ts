import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
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
      titulo: new FormControl(),
      texto: new FormControl(),
      autor: new FormControl(),
      imagen: new FormControl(),
      fecha: new FormControl(),
      categoria: new FormControl(),
      claves: new FormControl(),
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
