import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  arrPosts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .then(posts => {
        this.arrPosts = posts;
      })
  }

  onClickDelete(pIndice: number) {
    this.postService.deletePost(pIndice);
  }

}
