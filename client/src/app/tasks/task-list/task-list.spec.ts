
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    { id: 1, title: 'One', description: 'Desc', status: 'PENDING' },
    { id: 2, title: 'Two', description: 'Desc2', status: 'COMPLETED' }
  ];

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask', 'updateTask']);
    taskService.getTasks.and.returnValue(of(mockTasks));
    taskService.deleteTask.and.returnValue(of());
    taskService.updateTask.and.returnValue(of(mockTasks[0]));

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: taskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load tasks on init', () => {
    expect(component.tasks.length).toBe(2);
  });

  it('should delete a task', (done) => {
    component.tasks = [...mockTasks];
    taskService.deleteTask.and.returnValue(of(void 0));

    component.deleteTask(1);

    // wait for async subscription
    setTimeout(() => {
      expect(taskService.deleteTask).toHaveBeenCalledWith(1);
      expect(component.tasks.length).toBe(1);
      expect(component.tasks.find(t => t.id === 1)).toBeUndefined();
      done();
    });
  });

  it('should enter edit mode and save task', (done) => {
    component.startEdit(mockTasks[0]);
    expect(component.editingTask?.id).toBe(1);

    component.saveTask();

    // wait for async subscription
    setTimeout(() => {
      expect(component.editingTask).toBeNull();
      done();
    });
  });
});

