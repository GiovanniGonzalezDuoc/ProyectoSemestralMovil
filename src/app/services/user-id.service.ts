import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIDService {
  private userId!: number;
  private userName: string | null = null;
  private userLastName: string | null = null;

  constructor() {
    // Cargar los datos desde almacenamiento local al iniciar (opcional)
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedUserLastName = localStorage.getItem('userLastName');

    if (storedUserId) {
      this.userId = Number(storedUserId);
    }
    if (storedUserName) {
      this.userName = storedUserName;
    }
    if (storedUserLastName) {
      this.userLastName = storedUserLastName;
    }
  }

  setUserId(id: number) {
    this.userId = id;
    localStorage.setItem('userId', id.toString()); // Guardar en almacenamiento local (opcional)
  }

  getUserId(): number {
    if (this.userId === undefined) {
      throw new Error('El ID del usuario no ha sido establecido.'); // Validación adicional
    }
    return this.userId;
  }

  setUserName(name: string) {
    this.userName = name;
    localStorage.setItem('userName', name); // Guardar en almacenamiento local (opcional)
  }

  getUserName(): string | null {
    return this.userName;
  }

  setUserLastName(lastName: string) {
    this.userLastName = lastName;
    localStorage.setItem('userLastName', lastName); // Guardar en almacenamiento local (opcional)
  }

  getUserLastName(): string | null {
    return this.userLastName;
  }

  // Opción para limpiar los datos del usuario, útil en logout
  clearUserData() {
    this.userId = undefined!;
    this.userName = null;
    this.userLastName = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastName');
  }
}
