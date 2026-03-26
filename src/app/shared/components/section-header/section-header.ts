import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-header">
      <span class="section-label">{{ label() }}</span>
      <h2 class="section-title">{{ title() }}</h2>
      @if (description()) {
        <p class="section-description">{{ description() }}</p>
      }
    </div>
  `,
  styles: `
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: var(--java-orange);
      text-transform: uppercase;
      letter-spacing: 2px;
      display: block;
      margin-bottom: 0.75rem;
    }

    .section-title {
      font-family: 'Sora', sans-serif;
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1rem;
      line-height: 1.2;
    }

    .section-description {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  `,
})
export class SectionHeader {
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
