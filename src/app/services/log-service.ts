
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  connections: string[] = [];

  constructor() {}

  addConnectionLog(user: string): void {
    const timestamp = new Date().toLocaleString();
    const logMessage = `${user} inició sesión (${timestamp})`;
    this.connections.push(logMessage);
  }

  getConnections(): string[] {
    return this.connections;
  }
}
