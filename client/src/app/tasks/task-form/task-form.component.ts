import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="title" placeholder="Task title" />
      <input formControlName="description" placeholder="Description" />
      <button type="submit" [disabled]="form.invalid">Add Task</button>
    </form>
  `
})
export class TaskFormComponent {
  form: FormGroup;
  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const newTask: Task = {
        title: this.form.value.title,
        description: this.form.value.description,
        status: 'PENDING'
      };

      this.taskService.createTask(newTask).subscribe(task => {
        this.taskCreated.emit(task);
        this.form.reset();
      });
    }
  }
}
