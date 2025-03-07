import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ConfirmationDialogData {
  confType: 'success' | 'warn' | 'info';
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
  
  // We'll create a new Subject for each confirmation call.
  private confirmationResponse!: Subject<boolean>;

  // Call this method to open the confirmation dialog.
  showConfirmation(dialogData: ConfirmationDialogData): Observable<boolean> {
    // Create a new subject for this confirmation
    this.confirmationResponse = new Subject<boolean>();
    this.confirmationData.next(dialogData);
    this.isVisible.next(true);
    return this.confirmationResponse.asObservable();
  }

  confirm(): void {
    this.confirmationResponse.next(true);
    this.confirmationResponse.complete();
    this.close();
  }

  cancel(): void {
    this.confirmationResponse.next(false);
    this.confirmationResponse.complete();
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
