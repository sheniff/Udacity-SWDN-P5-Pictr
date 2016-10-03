import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'imgur'
})
@Injectable()
export class ImgurResize {
  /*
    Takes a Imgur image and edits the URL to fetch a different size of it.
   */
  transform(value: string, args: any[]) {
    let res = value.split('.');

    if (res[res.length - 1] !== 'gif') {
      res[res.length - 2] += args[0];
    }

    return res.join('.');
  }
}
