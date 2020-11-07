import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService } from '../services/post.service';

@Component({
  selector: 'app-detalle-post',
  templateUrl: './detalle-post.component.html',
  styleUrls: ['./detalle-post.component.css']
})
export class DetallePostComponent implements OnInit {

  postSelect: Post

  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit(): void {

    /*  this.activateRoute.params.subscribe(async params => {
       console.log(params);
 
       const postId = parseInt(params.postId);
 
     }) */

    const postId = Number(this.activateRoute.snapshot.paramMap.get('postId'))
    console.log(postId);
    this.postService.getById(postId).then(post => {
      this.postSelect = post
    })

  }

}
