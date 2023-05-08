import { PublishedDate } from './published-date'
import { Oid } from './oid'

export interface Book {
  _id: number | Oid,
  title: string,
  isbn?: string,
  pageCount: number,
  publishedDate?: PublishedDate,
  thumbnailUrl?: string,
  shortDescription?: string,
  longDescription?: string,
  status: string,
  authors: string[],
  categories: string[],
}
