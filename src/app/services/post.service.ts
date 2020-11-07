import { Injectable } from '@angular/core';

export interface Post {
  titulo: string;
  texto: string;
  autor: string;
  imagen: string;
  fecha: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];

  constructor() {
    /* localStorage */
    if (localStorage.getItem('posts')) {
      this.posts = JSON.parse(localStorage.getItem('posts'));
    } else {
      this.posts = [];
    }
  }

  addPost(Post): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(Post);
      console.log(this.posts);
      this.posts.push(Post);


      localStorage.setItem('posts', JSON.stringify(this.posts));
      resolve('Post añadido correctamente');
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


}
