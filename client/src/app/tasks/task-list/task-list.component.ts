import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: `./task-list.html`,
  styleUrls: ['./task-list.scss']
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
