import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['createTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TaskService, useValue: taskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.form.get('title')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should mark form as invalid when title is missing', () => {
    component.form.setValue({ title: '', description: 'Some description' });
    expect(component.form.valid).toBeFalse();
  });

  it('should mark form as invalid when description is missing', () => {
    component.form.setValue({ title: 'Some title', description: '' });
    expect(component.form.valid).toBeFalse();
  });

  it('should mark form as valid when both fields are filled', () => {
    component.form.setValue({ title: 'Test Task', description: 'Test Description' });
    expect(component.form.valid).toBeTrue();
  });

  it('should call TaskService.createTask on submit with valid form', () => {
    const mockTask: Task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'PENDING'
    };

    component.form.setValue({ title: 'Test Task', description: 'Test Description' });
    taskService.createTask.and.returnValue(of(mockTask));

    component.submit();

    expect(taskService.createTask).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      status: 'PENDING'
    });
  });

  it('should emit taskCreated event on successful submit', (done) => {
    const mockTask: Task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'PENDING'
    };

    component.form.setValue({ title: 'Test Task', description: 'Test Description' });
    taskService.createTask.and.returnValue(of(mockTask));

    component.taskCreated.subscribe((task: Task) => {
      expect(task).toEqual(mockTask);
      done();
    });

    component.submit();
  });

  it('should reset form after successful submit', () => {
    const mockTask: Task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'PENDING'
    };

    component.form.setValue({ title: 'Test Task', description: 'Test Description' });
    taskService.createTask.and.returnValue(of(mockTask));

    component.submit();

    expect(component.form.get('title')?.value).toBeNull();
    expect(component.form.get('description')?.value).toBeNull();
  });

  it('should not call TaskService.createTask when form is invalid', () => {
    component.form.setValue({ title: '', description: '' });
    component.submit();

    expect(taskService.createTask).not.toHaveBeenCalled();
  });
});