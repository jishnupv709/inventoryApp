import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmationDialogData } from './confirmation.service';

@Component({
  selector: 'app-confirmation-pop',
  templateUrl: './confirmation-pop.component.html',
  styleUrls: ['./confirmation-pop.component.css'],
})
export class ConfirmationPopComponent implements OnInit {
  isVisible = false;
  dialogData: ConfirmationDialogData | null = null;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.confirmationService.getVisibility().subscribe((visible) => {
      this.isVisible = visible;
    });

    this.confirmationService.getDialogData().subscribe((data) => {
      this.dialogData = data;
    });
  }

  onConfirm(): void {
    this.confirmationService.confirm();
  }

  onCancel(): void {
    this.confirmationService.cancel();
  }
}
