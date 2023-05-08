import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Book } from '../../../../models/book'

interface InputData {
  book: Book;
}

interface OutputData {
  rta: boolean
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent {
  book: Book;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.book = data.book
  }

  close() {
    this.dialogRef.close();
  }

}
