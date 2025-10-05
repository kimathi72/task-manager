import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTask: Task = { id: 1, title: 'Test Task', description: 'Desc', status: 'PENDING', userId: 1 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a task', () => {
    service.createTask(mockTask).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });

  it('should fetch all tasks', () => {
    const tasks = [mockTask];
    service.getTasks().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res).toEqual(tasks);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(tasks);
  });

  it('should fetch a task by ID', () => {
    service.getTaskById(1).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('/api/tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should update a task', () => {
    const updatedTask = { ...mockTask, title: 'Updated' };
    service.updateTask(1, updatedTask).subscribe(task => {
      expect(task.title).toBe('Updated');
    });

    const req = httpMock.expectOne('/api/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('/api/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
