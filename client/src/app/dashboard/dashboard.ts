// src/app/dashboard/dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../tasks/task-list/task-list';
import { TaskForm } from '../tasks/task-form/task-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskList, TaskForm],
  template: `
    <h2>Task Dashboard</h2>
    <app-task-form (taskCreated)="onTaskCreated($event)"></app-task-form>
    <app-task-list [refreshTrigger]="refreshTrigger"></app-task-list>
  `,
})
export class Dashboard {
  refreshTrigger = 0;

  onTaskCreated(_: any) {
    // bump trigger to reload list
    this.refreshTrigger++;
  }
}
