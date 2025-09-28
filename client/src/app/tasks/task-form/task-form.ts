// src/app/tasks/task-form/task-form.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task-model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="title" placeholder="Task title" />
      <input formControlName="description" placeholder="Description" />
      <button type="submit" [disabled]="form.invalid">Add Task</button>
    </form>
  `,
})
export class TaskForm {
  form! : FormGroup
  @Output() taskCreated = new EventEmitter<Task>();

  

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });
  }

  submit() {
    if (this.form.valid) {
      const newTask: Task = {
        id: 0, // backend will assign
        title: this.form.value.title!,
        description: this.form.value.description!,
        status: 'PENDING',
        userId: 1, // FIXME: later replace with real logged-in userId
      };

      this.taskService.createTask(newTask).subscribe((task) => {
        this.taskCreated.emit(task);
        this.form.reset();
      });
    }
  }
}
