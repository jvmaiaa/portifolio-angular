import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readTime',
  standalone: true,
})
export class ReadTimePipe implements PipeTransform {
  transform(content: string): number {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }
}
