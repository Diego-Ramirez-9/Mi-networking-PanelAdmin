import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss'],
})
export class DashboardChartsComponent {}
