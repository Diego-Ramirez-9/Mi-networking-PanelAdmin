import type { Routes } from '@angular/router';

export const appRoutes: Routes = [
  // Redirige raíz a dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Ruta de Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      )
  },
  // {
  //   path: 'statistics',
  //   loadComponent: () =>
  //     import('./features/statistics/statistics.component').then(
  //       (m) => m.StatisticsComponent
  //     )
  // },
  // {
  //   path: 'users',
  //   loadComponent: () =>
  //     import('./features/users-table/users-table.component').then(
  //       (m) => m.UsersTableComponent
  //     )
  // },
  // {
  //   path: 'analytics',
  //   loadComponent: () =>
  //     import('./features/analytics/analytics.component').then(
  //       (m) => m.AnalyticsComponent
  //     )
  // },

  // Wildcard
  { path: '**', redirectTo: '/dashboard' }
];
