import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [HeaderComponent,TasksComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {}
