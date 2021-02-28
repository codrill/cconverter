import { from, Observable } from 'rxjs'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request$ = (url: string): Observable<any> => {
  return from(fetch(url).then((data) => data.json()))
}
