import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Skill } from '../../core/models';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { SkillChip } from '../../shared/components/skill-chip/skill-chip';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeader, SkillChip, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="skills-section" appScrollReveal>
      <app-section-header
        title="Tecnologias & Ferramentas"
      />

      <div class="marquee-wrapper">
        <div class="marquee-container" aria-label="Lista de habilidades tecnicas - linha 1">
          <div class="marquee-track row-one">
            @for (skill of rowOne(); track $index) {
              <app-skill-chip [skill]="skill" />
            }
            @for (skill of rowOne(); track $index) {
              <app-skill-chip [skill]="skill" />
            }
          </div>
        </div>

        <div class="marquee-container" aria-label="Lista de habilidades tecnicas - linha 2">
          <div class="marquee-track row-two">
            @for (skill of rowTwo(); track $index) {
              <app-skill-chip [skill]="skill" />
            }
            @for (skill of rowTwo(); track $index) {
              <app-skill-chip [skill]="skill" />
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills-section {
      padding: 2rem 2rem;
      content-visibility: auto;
    }

    .marquee-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .marquee-container {
      overflow: hidden;
      padding-top: 0.5rem;
      mask-image: linear-gradient(
        90deg,
        transparent 0%,
        #000 10%,
        #000 90%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent 0%,
        #000 10%,
        #000 90%,
        transparent 100%
      );
    }

    .marquee-track {
      display: flex;
      gap: 1rem;
      width: max-content;
      will-change: transform;
    }

    .row-one {
      animation: marquee-left var(--marquee-duration, 35s) linear infinite;
    }

    .row-two {
      animation: marquee-right var(--marquee-duration, 35s) linear infinite;
    }

    .marquee-container:hover .marquee-track {
      animation-play-state: paused;
      cursor: pointer;
    }

    @keyframes marquee-left {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes marquee-right {
      0%   { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee-track {
        animation: none;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `,
})
export class Skills implements OnInit {
  private readonly dataService = inject(PortfolioDataService);

  readonly rowOne = signal<Skill[]>([]);
  readonly rowTwo = signal<Skill[]>([]);

  ngOnInit(): void {
    this.dataService.getSkills().subscribe((data) => {
      const half = Math.ceil(data.length / 2);
      const firstHalf = data.slice(0, half);
      const secondHalf = data.slice(half);

      this.rowOne.set(firstHalf);
      this.rowTwo.set(secondHalf);
    });
  }
}
