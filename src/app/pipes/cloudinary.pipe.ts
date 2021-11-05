import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cloudinaryPipe',
})
export class CloudinaryPipe implements PipeTransform {
  transform(originalUrl: string, kind: string): string {
    if (originalUrl && originalUrl.includes('cloudinary')) {
      switch (kind) {
        case 'thumbnail':
          return originalUrl.replace('upload/', 'upload/c_scale,w_100/');
        case 'w720':
          return originalUrl.replace('upload/', 'upload/c_scale,w_720/');
        case 'w480':
          return originalUrl.replace('upload/', 'upload/c_scale,w_480/');
        case 'pad300':
          return originalUrl.replace('upload/', 'upload/c_pad,w_100,h_100/');
        case 'custom':
          return originalUrl.replace(
            'upload/',
            'upload/t_swapi_blackandwhite_w300/',
          );
        default:
          return originalUrl;
      }
    } else {
      return originalUrl;
    }
  }
}
