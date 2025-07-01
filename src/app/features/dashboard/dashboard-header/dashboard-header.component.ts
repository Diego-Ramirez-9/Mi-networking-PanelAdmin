import { Component } from "@angular/core"
import { ButtonModule } from "primeng/button"
import { SidebarService } from "../../../services/sidebar.service"

@Component({
  selector: "app-dashboard-header",
  standalone: true,
  imports: [ButtonModule],
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["./dashboard-header.component.scss"],
})
export class DashboardHeaderComponent {
  constructor(public sidebarService: SidebarService) {}
  toggleSidebar() {
    this.sidebarService.toggle()
  }
}
