// src/app/tasks/task-list/task-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Your Tasks</h2>
    <ul>
      <li *ngFor="let task of tasks">
        <!-- If editing -->
        <div *ngIf="editingTask?.id === task.id; else viewMode">
          <input [(ngModel)]="editingTask.title" placeholder="Title" />
          <input [(ngModel)]="editingTask.description" placeholder="Description" />
          <select [(ngModel)]="editingTask.status">
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button (click)="saveTask()">Save</button>
          <button (click)="cancelEdit()">Cancel</button>
        </div>

        <!-- Default view mode -->
        <ng-template #viewMode>
          <strong>{{ task.title }}</strong> - {{ task.description }} 
          ({{ task.status }})
          <button (click)="startEdit(task)">Edit</button>
          <button (click)="deleteTask(task.id)">Delete</button>
        </ng-template>
      </li>
    </ul>
  `,
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => (this.tasks = data));
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    });
  }

  startEdit(task: Task): void {
    // clone object to avoid editing list reference directly
    this.editingTask = { ...task };
  }

  cancelEdit(): void {
    this.editingTask = null;
  }
  // 🔥 Added for TDD
  editTask(task: Task) {
    this.editingTask = { ...task }; // shallow copy for editing
  }

  saveTask(): void {
  
  if (!this.editingTask || this.editingTask.id === undefined) return;

  this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe((updated) => {
    const idx = this.tasks.findIndex((t) => t.id === updated.id);
    if (idx > -1) this.tasks[idx] = updated;
    this.editingTask = null;
  });
}
}
