import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Skill } from '../../../core/models';
import { ThemeService } from '../../../core/services/theme.service';

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
        [style.filter]="getIconFilter()"
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
  private readonly themeService = inject(ThemeService);

  // Ícones que precisam de inversão de cor no tema dark
  private readonly iconsNeedingInversion = ['apachekafka', 'amazonwebservices'];

  // Variantes de ícones
  private readonly iconVariants: Record<string, string> = {
    amazonwebservices: 'amazonwebservices-original-wordmark',
    rabbitmq: 'rabbitmq-original',
    kubernetes: 'kubernetes-plain',
    apachekafka: 'apachekafka-original',
    gradle: 'gradle-original',
    intellij: 'intellij-original',
    bitbucket: 'bitbucket-original',
    gitlab: 'gitlab-original',
  };

  readonly iconUrl = computed(() => {
    const icon = this.skill().icon;
    const variant = this.iconVariants[icon] ?? `${icon}-original`;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${variant}.svg`;
  });

  getIconFilter(): string {
    const icon = this.skill().icon;
    const isDarkTheme = this.themeService.isDark();

    // Se está no tema dark E o ícone precisa de inversão, inverte para branco
    if (isDarkTheme && this.iconsNeedingInversion.includes(icon)) {
      return 'invert(1)';
    }
    return 'none';
  }
}
