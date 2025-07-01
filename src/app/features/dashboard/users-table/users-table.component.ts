import { Component, ViewEncapsulation } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AvatarModule } from "primeng/avatar"
import { ButtonModule } from "primeng/button"
import { OverlayPanelModule } from "primeng/overlaypanel"

interface User {
  id: string
  name: string
  email: string
  phone: string
  lastModification: string
  status: string
  registrationDate: string
  avatar: string
}

@Component({
  selector: "app-users-table",
  standalone: true,
  imports: [CommonModule, AvatarModule, ButtonModule, OverlayPanelModule],
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"],
  encapsulation: ViewEncapsulation.None, // Para los estilos del overlay panel
})
export class UsersTableComponent {
  users: User[] = [
    {
      id: "#10001",
      name: "Mario Hernández",
      email: "mario.hernandez.admin@ejemplo.com",
      phone: "9982120595",
      lastModification: "04/06/2025",
      status: "Active",
      registrationDate: "04/06/2025",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: "#10002",
      name: "Ana García",
      email: "ana.garcia@ejemplo.com",
      phone: "9981234567",
      lastModification: "03/06/2025",
      status: "Inactive",
      registrationDate: "02/06/2025",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: "#10003",
      name: "Carlos López",
      email: "carlos.lopez@ejemplo.com",
      phone: "9987654321",
      lastModification: "05/06/2025",
      status: "Active",
      registrationDate: "01/06/2025",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: "#10004",
      name: "Laura Martínez",
      email: "laura.martinez@ejemplo.com",
      phone: "9983456789",
      lastModification: "04/06/2025",
      status: "Pending",
      registrationDate: "03/06/2025",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
  ]

  // Métodos para las acciones del menú
  updateUser(user: User) {
    console.log("Actualizar usuario:", user.name)
  }

  deleteUser(user: User) {
    console.log("Eliminar usuario:", user.name)
  }

  viewSheet(user: User) {
    console.log("Ver hoja de usuario:", user.name)
  }

  deactivateSheet(user: User) {
    console.log("Desactivar hoja de usuario:", user.name)
  }
}
