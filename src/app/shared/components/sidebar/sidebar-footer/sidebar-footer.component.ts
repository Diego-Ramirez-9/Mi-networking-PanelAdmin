import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SidebarFooterComponent {
  logout() {
    console.log('Logging out...');
  }
}
