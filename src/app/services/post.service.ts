import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initPosts } from 'src/assets/data/init-posts';

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
    if (localStorage.getItem('posts')) {
      this.posts = JSON.parse(localStorage.getItem('posts'));
    } else {
      this.posts = initPosts;
    }
  }

  addPost(post: Post, id): Promise<any> {
    return new Promise((resolve, reject) => {
      post.id = id;
      console.log(this.posts);
      this.posts.push(post);

      localStorage.setItem('posts', JSON.stringify(this.posts));
      resolve(this.router.navigate(['blog', post.id]));
    })
  }

  editPost(post: Post, id): Promise<any> {
    /* console.log(id); */
    return new Promise((resolve, reject) => {
      this.posts = JSON.parse(localStorage.getItem('posts'))

      const postEditIndex = this.posts.findIndex(post => {
        return post.id == id
      })

      this.posts[postEditIndex].titulo = post.titulo;
      this.posts[postEditIndex].texto = post.texto;
      this.posts[postEditIndex].autor = post.autor;
      this.posts[postEditIndex].fecha = post.fecha;
      this.posts[postEditIndex].categoria = post.categoria;
      this.posts[postEditIndex].claves = post.claves;
      this.posts[postEditIndex].imagen = post.imagen;

      /* console.log(this.posts[postEditIndex]); */
      localStorage.setItem('posts', JSON.stringify(this.posts));
      resolve(this.router.navigate(['blog', id]));
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
      /*   if (this.posts.find(post => post.id === pId)) {
          resolve(this.posts.find(post => post.id === pId))
        } else {
          reject('post no encontrado')
        } */
    })
  }
}
