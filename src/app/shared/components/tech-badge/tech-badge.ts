import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tech-badge">{{ name() }}</span>
  `,
  styles: `
    .tech-badge {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      background: var(--badge-bg);
      color: var(--java-orange);
      border: 1px solid var(--badge-border);
      white-space: nowrap;
    }
  `,
})
export class TechBadge {
  readonly name = input.required<string>();
}
