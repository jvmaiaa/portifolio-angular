import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models';
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
        label="// Skills"
        title="Tecnologias & Ferramentas"
        description="Meu toolkit de desenvolvimento, construido ao longo de anos de experiencia em projetos reais."
      />

      <div class="marquee-container" aria-label="Lista de habilidades tecnicas">
        <div class="marquee-track">
          @for (skill of doubledSkills(); track $index) {
            <app-skill-chip [skill]="skill" />
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills-section {
      padding: 5rem 2rem;
      content-visibility: auto;
    }

    .marquee-container {
      overflow: hidden;
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
      animation: marquee var(--marquee-duration, 35s) linear infinite;
      will-change: transform;
    }

    .marquee-container:hover .marquee-track {
      animation-play-state: paused;
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
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

  readonly doubledSkills = signal<Skill[]>([]);

  ngOnInit(): void {
    this.dataService.getSkills().subscribe((data) => {
      this.doubledSkills.set([...data, ...data]);
    });
  }
}
