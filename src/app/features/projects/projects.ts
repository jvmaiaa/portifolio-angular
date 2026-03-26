import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project } from '../../core/models';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionHeader, TechBadge, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="projects-section" appScrollReveal>
      <app-section-header
        label="// Projetos"
        title="Projetos em Destaque"
        description="Solucoes que demonstram minha experiencia com arquitetura, back-end e boas praticas."
      />

      <div class="filter-bar">
        <button
          class="filter-btn"
          [class.active]="activeFilter() === 'Todos'"
          (click)="setFilter('Todos')"
        >
          Todos
        </button>
        @for (tag of allTags(); track tag) {
          <button
            class="filter-btn"
            [class.active]="activeFilter() === tag"
            (click)="setFilter(tag)"
          >
            {{ tag }}
          </button>
        }
      </div>

      <div class="projects-grid">
        @for (project of filteredProjects(); track project.id) {
          <article class="project-card">
            <div class="project-image">
              <div class="project-placeholder">
                <span class="project-emoji">{{ getProjectEmoji(project.id) }}</span>
              </div>
              <div class="project-overlay">
                <a
                  [href]="project.projectUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="overlay-btn"
                  [attr.aria-label]="'Ver projeto ' + project.title"
                >
                  Ver Projeto &rarr;
                </a>
              </div>
            </div>
            <div class="project-body">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                @for (tag of project.tags; track tag) {
                  <app-tech-badge [name]="tag" />
                }
              </div>
              <div class="project-links">
                <a
                  [href]="project.projectUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  [attr.aria-label]="'Ver projeto ' + project.title"
                >
                  Demo &rarr;
                </a>
                @if (project.githubUrl) {
                  <a
                    [href]="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    [attr.aria-label]="'Codigo fonte de ' + project.title"
                  >
                    GitHub &rarr;
                  </a>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .projects-section {
      padding: 5rem 2rem;
      content-visibility: auto;
    }

    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 2.5rem;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    .filter-btn {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      padding: 0.4rem 1rem;
      border-radius: 999px;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-btn:hover,
    .filter-btn.active {
      background: var(--java-orange);
      color: #fff;
      border-color: var(--java-orange);
    }

    .projects-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: var(--surface-2);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      border-color: var(--java-orange);
      box-shadow: 0 8px 30px var(--card-shadow);
    }

    .project-image {
      position: relative;
      height: 180px;
      overflow: hidden;
    }

    .project-placeholder {
      width: 100%;
      height: 100%;
      background: var(--surface-3);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .project-emoji {
      font-size: 3.5rem;
    }

    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
      opacity: 1;
    }

    .overlay-btn {
      font-family: 'Sora', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: #fff;
      background: var(--java-orange);
      padding: 0.6rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      transition: transform 0.2s ease;
    }

    .overlay-btn:hover {
      transform: scale(1.05);
    }

    .project-body {
      padding: 1.25rem;
    }

    .project-title {
      font-family: 'Sora', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem;
    }

    .project-description {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0 0 1rem;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .project-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--java-orange);
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .project-link:hover {
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Projects implements OnInit {
  private readonly dataService = inject(PortfolioDataService);
  private readonly projects = signal<Project[]>([]);
  readonly activeFilter = signal('Todos');

  readonly allTags = computed(() => {
    const tags = new Set<string>();
    this.projects().forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  });

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'Todos') return this.projects();
    return this.projects().filter((p) => p.tags.includes(filter));
  });

  ngOnInit(): void {
    this.dataService.getProjects().subscribe((data) => {
      this.projects.set(data);
    });
  }

  setFilter(tag: string): void {
    this.activeFilter.set(tag);
  }

  getProjectEmoji(id: string): string {
    const emojiMap: Record<string, string> = {
      'ecommerce-api': '\uD83D\uDED2',
      'task-manager': '\u2705',
      'microservices-arch': '\uD83C\uDFD7\uFE0F',
      'realtime-chat': '\uD83D\uDCAC',
    };
    return emojiMap[id] ?? '\uD83D\uDCBB';
  }
}
