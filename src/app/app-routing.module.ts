import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAnimeComponent } from './components/view-anime/view-anime.component';

const routes: Routes = [{
  path:'view-anime',component: ViewAnimeComponent , pathMatch: 'full' 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
