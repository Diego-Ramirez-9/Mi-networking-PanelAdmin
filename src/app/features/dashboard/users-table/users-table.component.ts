import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  UserService,
  type User,
  type BackendUser
} from '../../../services/user.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import type { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersTableComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private searchTerm$ = new Subject<string>();
  private subs = new Subscription();

  // Modal de Add/Edit User
  displayAddDialog = false;
  userForm: FormGroup;
  isLoading = false;
  isEdit = false;
  selectedUserId: string | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      name: [
        '',
        Validators.required
      ],
      lastName: [
        '',
        Validators.required
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
        ]
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
      jobTitle: [''],
      firebase_uid: ['', Validators.required]
    });
  }

  /** Para usar f['campo'] en la plantilla */
  public get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    // Carga inicial y búsqueda al vuelo
    this.subs.add(
      this.userService
        .getUsers()
        .subscribe(u => (this.users = u))
    );
    this.subs.add(
      this.searchTerm$
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(term => this.userService.getUsers(term))
        )
        .subscribe(u => (this.users = u))
    );
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term);
  }

  /** Modo Crear */
  openNewUser(): void {
    this.isEdit = false;
    this.selectedUserId = null;
    this.userForm.reset();
    this.displayAddDialog = true;
  }

  /** Modo Editar, precarga desde `users` */
  openEditUser(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      lastName: user.lastname,
      email: user.email,
      phoneNumber: user.phone,
      jobTitle: user.jobTitle,
      firebase_uid: user.firebase_uid
    });
    this.isEdit = true;
    this.selectedUserId = user.id;
    this.displayAddDialog = true;
  }

  hideDialog(): void {
    this.displayAddDialog = false;
    this.isLoading = false;
    this.isEdit = false;
    this.selectedUserId = null;
  }

  /** Crea o actualiza según `isEdit` */
  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.showErrorToast('Campos incompletos', 'Llena todos los campos obligatorios.');
      return;
    }
    this.isLoading = true;
    const payload: Partial<BackendUser> = this.userForm.value;

    if (this.isEdit && this.selectedUserId) {
      // actualizar
      this.userService.updateUser(this.selectedUserId, payload).subscribe({
        next: () => {
          this.reloadList();
          this.hideDialog();
          this.showSuccessToast('Usuario actualizado', 'Los cambios se guardaron correctamente.');
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.showErrorToast('Error al actualizar', err.error?.error || err.message);
        }
      });
    } else {
      // crear
      this.userService.createUser(payload).subscribe({
        next: () => {
          this.reloadList();
          this.hideDialog();
          this.showSuccessToast('Usuario creado', 'El nuevo usuario fue agregado con éxito.');
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          const dup = err.status === 400 && err.error?.details?.includes('duplicate key');
          this.showErrorToast(
            dup ? 'Duplicado' : 'Error al crear',
            dup ? 'El correo o UID ya existe.' : (err.error?.error || err.message)
          );
        }
      });
    }
  }

  /** Elimina de la lista local tras llamada exitosa */
  deleteUser(user: User): void {
    if (!confirm(`¿Eliminar a ${user.name}?`)) return;
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.showSuccessToast('Usuario eliminado', 'Se borró correctamente.');
      },
      error: () => this.showErrorToast('Error al eliminar', 'No se pudo eliminar al usuario.')
    });
  }

  /** Métodos del menú */
  updateUser(user: User): void { this.openEditUser(user); }
  viewSheet(user: User): void { /* … */ }
  deactivateSheet(user: User): void { /* … */ }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private reloadList(): void {
    this.userService.getUsers().subscribe(u => (this.users = u));
  }

  // — Toast helpers —
  private showSuccessToast(summary: string, detail: string): void {
    this.messageService.add({ severity: 'success', summary, detail, life: 5000 });
  }
  private showErrorToast(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'error', summary, detail, life: 6000 });
  }
  private showInfoToast(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'info', summary, detail, life: 4000 });
  }
  private showWarnToast(summary: string, detail?: string): void {
    this.messageService.add({ severity: 'warn', summary, detail, life: 5000 });
  }
}
