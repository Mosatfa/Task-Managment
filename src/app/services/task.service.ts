import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // 'https://todo-eosin-alpha-70.vercel.app/task' // server error deploy on vercel
  baseUrl: string = 'http://localhost:5000/task' //send server side (githublink)

  constructor(private _HttpClient: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this._HttpClient.get<ITask[]>(`${this.baseUrl}/`)
  }

  getTaskById(id:string): Observable<any> {
    return this._HttpClient.get<ITask>(`${this.baseUrl}/${id}`)
  }

  createTask(formData: object): Observable<any> {
    return this._HttpClient.post<ITask>(`${this.baseUrl}/`, formData)
  }

  updateTask(id: string, updateData: object): Observable<any> {
    return this._HttpClient.patch<ITask>(`${this.baseUrl}/${id}/update`, updateData)
  }

  // Mark Completed
  updateStatusTask(id: string): Observable<any> {
    return this._HttpClient.patch<ITask>(`${this.baseUrl}/${id}/mark`,{})
  }
  
  deleteTask(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${id}/delete`)
  }

}

