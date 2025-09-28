import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';
import { AuthGuard } from '../guards/auth-guard';

const routes: Routes = [
  { path: '', component: TaskList, canActivate: [AuthGuard] },
  { path: 'new', component: TaskForm, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TaskForm, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
