import { Component } from "@angular/core"
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component"
import { KpiCardsComponent } from "./kpi-cards/kpi-cards.component"
import { DashboardChartsComponent } from "./dashboard-charts/dashboard-charts.component"
import { UsersTableComponent } from "./users-table/users-table.component"
import { SidebarService } from "../../services/sidebar.service"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [DashboardHeaderComponent, KpiCardsComponent, DashboardChartsComponent, UsersTableComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  constructor(public sidebarService: SidebarService) {}
}
