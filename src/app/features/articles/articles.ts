import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Article } from '../../core/models';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ArticleModal } from './article-modal';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [SectionHeader, TechBadge, ScrollRevealDirective, ArticleModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="articles" class="articles-section" appScrollReveal>
      <app-section-header
        title="Artigos & Publicações"
      />

      <div class="articles-grid">
        @for (article of articles(); track article.id) {
          <article class="article-card" (click)="openArticle(article)">
            <div class="article-meta">
              <span class="article-date">{{ formatDate(article.date) }}</span>
              <span class="article-read-time">{{ article.readTimeMinutes }} min de leitura</span>
            </div>
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-tags">
              @for (tag of article.tags; track tag) {
                <app-tech-badge [name]="tag" />
              }
            </div>
            <span class="article-cta">Ler Artigo &rarr;</span>
          </article>
        }
      </div>
    </section>

    @if (selectedArticle()) {
      <app-article-modal
        [article]="selectedArticle()!"
        (closeModal)="closeArticle()"
      />
    }
  `,
  styles: `
    .articles-section {
      padding: 2rem 2rem;
      content-visibility: auto;
    }

    .articles-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .article-card {
      background: var(--surface-2);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .article-card:hover {
      transform: translateY(-4px);
      border-color: var(--java-orange);
      box-shadow: 0 8px 30px var(--card-shadow);
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-tertiary);
    }

    .article-title {
      font-family: 'Sora', sans-serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.4;
    }

    .article-summary {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
      flex: 1;
    }

    .article-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .article-cta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--java-orange);
      transition: opacity 0.3s ease;
    }

    .article-card:hover .article-cta {
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .articles-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Articles implements OnInit {
  private readonly dataService = inject(PortfolioDataService);
  readonly articles = signal<Article[]>([]);
  readonly selectedArticle = signal<Article | null>(null);

  ngOnInit(): void {
    this.dataService.getArticles().subscribe((data) => {
      this.articles.set(data);
    });
  }

  openArticle(article: Article): void {
    this.selectedArticle.set(article);
    document.body.style.overflow = 'hidden';
  }

  closeArticle(): void {
    this.selectedArticle.set(null);
    document.body.style.overflow = '';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
