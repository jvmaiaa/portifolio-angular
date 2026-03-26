import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Article } from '../../core/models';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article-modal',
  standalone: true,
  imports: [TechBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-container" role="dialog" aria-modal="true" [attr.aria-label]="article().title">
        <div class="modal-header">
          <div class="modal-meta">
            <span class="modal-date">{{ formatDate(article().date) }}</span>
            <span class="modal-separator">&bull;</span>
            <span class="modal-read-time">{{ article().readTimeMinutes }} min de leitura</span>
          </div>
          <button
            class="modal-close"
            (click)="closeModal.emit()"
            aria-label="Fechar artigo"
          >
            &times;
          </button>
        </div>

        <h2 class="modal-title">{{ article().title }}</h2>

        <div class="modal-tags">
          @for (tag of article().tags; track tag) {
            <app-tech-badge [name]="tag" />
          }
        </div>

        <div class="modal-content" [innerHTML]="renderedContent"></div>
      </div>
    </div>
  `,
  styles: `
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-container {
      background: var(--surface-1);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      max-width: 720px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 2.5rem;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .modal-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--text-tertiary);
    }

    .modal-close {
      background: none;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 1.4rem;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s ease, color 0.3s ease;
      line-height: 1;
    }

    .modal-close:hover {
      border-color: var(--java-orange);
      color: var(--java-orange);
    }

    .modal-title {
      font-family: 'Sora', sans-serif;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1rem;
      line-height: 1.3;
    }

    .modal-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 2rem;
    }

    .modal-content {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    :host ::ng-deep .modal-content {
      h1, h2, h3 {
        color: var(--text-primary);
        font-family: 'Sora', sans-serif;
        margin-top: 2rem;
        margin-bottom: 0.75rem;
      }

      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.3rem; }
      h3 { font-size: 1.1rem; }

      p {
        margin-bottom: 1rem;
      }

      code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        background: var(--surface-3);
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        color: var(--java-orange);
      }

      pre {
        background: var(--surface-3);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1.25rem;
        overflow-x: auto;
        margin-bottom: 1.5rem;
      }

      pre code {
        background: none;
        padding: 0;
        color: var(--text-primary);
      }

      ul, ol {
        padding-left: 1.5rem;
        margin-bottom: 1rem;
      }

      li { margin-bottom: 0.4rem; }

      strong {
        color: var(--text-primary);
        font-weight: 600;
      }
    }

    @media (max-width: 768px) {
      .modal-overlay { padding: 1rem; }
      .modal-container { padding: 1.5rem; }
      .modal-title { font-size: 1.35rem; }
    }
  `,
})
export class ArticleModal implements OnInit, OnDestroy {
  readonly article = input.required<Article>();
  readonly closeModal = output<void>();

  private readonly sanitizer = inject(DomSanitizer);
  private readonly platformId = inject(PLATFORM_ID);

  renderedContent: SafeHtml = '';

  ngOnInit(): void {
    const rawHtml = marked.parse(this.article().content) as string;
    this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal.emit();
    }
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
