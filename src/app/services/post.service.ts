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

  arrPosts: Post[];

  constructor() {

  }

  agregarPost(pPost: Post): Promise<string> {
    return new Promise((resolve, rejec) => {
      this.arrPosts.push(pPost);

      console.log(this.arrPosts);

      localStorage.setItem('arrPosts', JSON.stringify(this.arrPosts));

      resolve('Post añadido correctamente')
    })

  }

  getAllPosts(): {

  }

  getPostsByCategoria(cat) {

  }
}
