import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { DetallePostComponent } from './detalle-post/detalle-post.component';
import { ErrorComponent } from './error/error.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:postId', component: DetallePostComponent },
  { path: 'new', component: NewComponent },
  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
