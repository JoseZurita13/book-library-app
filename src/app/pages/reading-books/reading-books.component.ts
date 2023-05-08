import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BookDetailsComponent } from './components/book-details/book-details.component'
import { Book } from 'src/app/models/book';
import { BOOKS, BOOK_NOT_FOUND } from 'src/app/constants/constants';

@Component({
  selector: 'app-reading-books',
  templateUrl: './reading-books.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class ReadingBooksComponent implements OnInit {
  myControl = new FormControl();

  options: Book[] = BOOKS;

  filteredOptions!: Observable<any[]>;

  books: Book[] = BOOKS;
  selectedBook: Book = BOOK_NOT_FOUND

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filter(title) : this.options.slice())
      );
  }

  private _filter(value: string) {
    return this.options.filter(option => option.title.toLowerCase().includes(value.toLowerCase()));
  }

  displayFn(selectedOption: any) {
    if (selectedOption) {
      this.selectedBook = selectedOption
      return selectedOption.title
    }
    this.selectedBook = BOOK_NOT_FOUND
    return undefined
  }

  update() {
    this.books = [this.myControl.value]
    this.selectedBook = this.myControl.value
  }

  drop(event: CdkDragDrop<Book[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      minWidth: '300px',
      maxWidth: '80%',
      data: {
        book: this.selectedBook,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  setFullList() {
    this.books = BOOKS
  }

  setSelectedBook(book: Book) {
    this.selectedBook = book
  }

}
