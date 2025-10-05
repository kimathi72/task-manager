import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  template: `
    <h2>Your Tasks</h2>
    <ul>
      <li *ngFor="let task of tasks">
        <!-- Edit Mode -->
        <div *ngIf="editingTask && editingTask.id === task.id">
          <input [(ngModel)]="editingTask.title" placeholder="Title" />
          <input [(ngModel)]="editingTask.description" placeholder="Description" />
          <select [(ngModel)]="editingTask.status">
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
          <button (click)="saveTask()">Save</button>
          <button (click)="cancelEdit()">Cancel</button>
        </div>

        <!-- View Mode -->
        <div *ngIf="!editingTask || editingTask.id !== task.id">
          <strong>{{ task.title }}</strong> - {{ task.description }} ({{ task.status }})
          <button (click)="startEdit(task)">Edit</button>
          <button (click)="deleteTask(task.id!)">Delete</button>
        </div>
      </li>
    </ul>
  `
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input() refreshTrigger!: number;
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  startEdit(task: Task): void {
    this.editingTask = { ...task }; // copy to avoid mutation
  }

  saveTask(): void {
    if (!this.editingTask || this.editingTask.id === undefined) return;

    this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe(updated => {
      const idx = this.tasks.findIndex(t => t.id === updated.id);
      if (idx > -1) {
        this.tasks[idx] = updated;
      }
      this.editingTask = null;
    });
  }

  cancelEdit(): void {
    this.editingTask = null;
  }
}
