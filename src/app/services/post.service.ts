import { Injectable } from '@angular/core';

export interface Post {
  titulo: string,
  texto: string,
  autor: string,
  imagen: string,
  fecha: string,
  categoria: string,
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  agregarPost(Post) {

  }

  gettAllPosts() {

  }

  getPostsByCategoria(cat) {

  }
}
