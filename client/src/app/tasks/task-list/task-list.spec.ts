import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskList } from './task-list';
import { TaskService } from '../services/task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../../models/task-model';

describe('TaskList', () => {
  let fixture: ComponentFixture<TaskList>;
  let component: TaskList;
  let httpMock: HttpTestingController;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task A', description: 'Desc A', status: 'PENDING', userId: 1 },
    { id: 2, title: 'Task B', description: 'Desc B', status: 'PENDING', userId: 1 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskList, HttpClientTestingModule],
      providers: [TaskService],
    });

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/tasks');
    req.flush([]); // respond with empty task list

    expect(component).toBeTruthy();
  });

  it('should call backend and update a task', () => {
    fixture.detectChanges();

    // initial GET
    const getReq = httpMock.expectOne('/api/tasks');
    getReq.flush(mockTasks);

    // edit + save
    component.editTask(mockTasks[0]);
    component.editingTask!.title = 'Updated Task A';
    component.saveTask();

    const putReq = httpMock.expectOne(`/api/tasks/1`);
    expect(putReq.request.method).toBe('PUT');
    expect(putReq.request.body.title).toBe('Updated Task A');

    putReq.flush({ ...mockTasks[0], title: 'Updated Task A' });
  });

  it('should call backend and delete a task', () => {
    fixture.detectChanges();

    // initial GET
    const getReq = httpMock.expectOne('/api/tasks');
    getReq.flush(mockTasks);

    component.deleteTask(1);

    const deleteReq = httpMock.expectOne(`/api/tasks/1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});
  });
});
