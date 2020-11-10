import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Post {
  id: number;
  titulo: string;
  texto: string;
  autor: string;
  imagen: string;
  fecha: string;
  categoria: string;
  claves: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];

  constructor(
    private router: Router
  ) {
    /* localStorage */
    if (localStorage.getItem('posts')) {
      this.posts = JSON.parse(localStorage.getItem('posts'));
    } else {
      this.posts = [];
    }
  }

  addPost(post: Post, id): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(post);
      post.id = id;
      console.log(this.posts);
      this.posts.push(post);

      localStorage.setItem('posts', JSON.stringify(this.posts));
      resolve(this.router.navigate(['blog', post.id]));
    })

  }

  getAllPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.posts);
    })
  }

  getPostsByCategory(cat): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const arrFilterCategory = this.posts.filter(post => {
        return post.categoria === cat
      });
      resolve(arrFilterCategory);
    })

  }

  deletePost(pIndice: number) {
    this.posts.splice(pIndice, 1);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  getById(pId: number): Promise<Post> {
    return new Promise((resolve, reject) => {
      resolve(this.posts.find(post => post.id === pId))
    })
  }


}
