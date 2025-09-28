// task-form.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';
import { TaskService } from '../services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaskForm', () => {
  let fixture: ComponentFixture<TaskForm>;
  let component: TaskForm;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);

    TestBed.configureTestingModule({
      imports: [TaskForm, ReactiveFormsModule],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
    });

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit taskCreated on submit', () => {
    const spy = spyOn(component.taskCreated, 'emit');
    const mockTask = {
      id: 1,
      title: 'New Task',
      description: 'desc',
      status: 'PENDING' as const,
      userId: 1,
    };
    taskServiceSpy.createTask.and.returnValue(of(mockTask));

    component.form.setValue({ title: 'New Task', description: 'desc' });
    component.submit();

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'New Task' }));
  });
});
