import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import {
  CreateEventComponent,
  EventDetailsComponent,
  EventListResolver,
  EventsListComponent,
  CreateSessionComponent,
  EventResolver
} from './events/index';

const routes: Routes = [
  { 
    path: 'events/new', 
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent']
  },
  { 
    path: 'events', 
    component: EventsListComponent,
    resolve: {events:EventListResolver}
  },
  { path: 'events/:id', component: EventDetailsComponent,
    resolve: {event: EventResolver}
  },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import ('./user/user.module')
      .then(m => m.UserModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
