import { Component } from "@angular/core"
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header.component"
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component"
import { SidebarFooterComponent } from "./sidebar-footer/sidebar-footer.component"
import { SidebarService } from "../../../services/sidebar.service"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarMenuComponent, SidebarFooterComponent],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  constructor(public sidebarService: SidebarService) {}
}
