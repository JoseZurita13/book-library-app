import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadingBooksComponent } from './pages/reading-books/reading-books.component'
import { WelcomeComponent } from './pages/welcome/welcome.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'



const routes: Routes = [

  {
    path: 'welcome',
    title: 'Welcome',
    component: WelcomeComponent
  },
  {
    path: 'reading-books',
    title: 'Reading Books',
    component: ReadingBooksComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
