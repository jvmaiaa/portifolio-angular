import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Skill } from '../../../core/models';

@Component({
  selector: 'app-skill-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skill-chip">
      <img
        [src]="iconUrl()"
        [alt]="skill().name + ' icon'"
        class="skill-icon"
        width="24"
        height="24"
        loading="lazy"
      />
      <span class="skill-name">{{ skill().name }}</span>
    </div>
  `,
  styles: `
    .skill-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      border-radius: 999px;
      background: var(--surface-2);
      border: 1px solid var(--border-color);
      white-space: nowrap;
      transition: border-color 0.3s ease, transform 0.3s ease;
    }

    .skill-chip:hover {
      border-color: var(--java-orange);
      transform: translateY(-2px);
    }

    .skill-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    .skill-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: var(--text-primary);
    }
  `,
})
export class SkillChip {
  readonly skill = input.required<Skill>();

  // Ícones que não existem como "-original" no Devicons
  private readonly iconVariants: Record<string, string> = {
    amazonwebservices: 'amazonwebservices-original-wordmark',
    rabbitmq: 'rabbitmq-original',
    kubernetes: 'kubernetes-plain',
    css3: 'css3-plain',
    html5: 'html5-plain',
  };

  readonly iconUrl = computed(() => {
    const icon = this.skill().icon;
    const variant = this.iconVariants[icon] ?? `${icon}-original`;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${variant}.svg`;
  });
}
