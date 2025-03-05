import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ConfirmationDialogData {
  confType: 'success' | 'warn' | "info";
  confHeader: string;
  confBody: string;
  confCancel: string;
  confSubmit: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private isVisible = new BehaviorSubject<boolean>(false);
  private confirmationData = new BehaviorSubject<ConfirmationDialogData | null>(null);
  private confirmationResponse = new BehaviorSubject<boolean | null>(null);

  showConfirmation(dialogData: ConfirmationDialogData): Observable<boolean | null> {
    this.confirmationData.next(dialogData);
    this.isVisible.next(true);
    return this.confirmationResponse.asObservable();
  }

  confirm(): void {
    this.confirmationResponse.next(true);
    this.close();
  }

  cancel(): void {
    this.confirmationResponse.next(false);
    this.close();
  }

  close(): void {
    this.isVisible.next(false);
    this.confirmationData.next(null);
  }

  getVisibility(): Observable<boolean> {
    return this.isVisible.asObservable();
  }

  getDialogData(): Observable<ConfirmationDialogData | null> {
    return this.confirmationData.asObservable();
  }
}
