import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Certification } from '../../core/models';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [SectionHeader, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications" class="certifications-section" appScrollReveal>
      <app-section-header
        title="Certificações"
      />

      <div class="cert-grid">
        @for (cert of certifications(); track cert.id) {
          <div class="cert-card">
            <div class="cert-image-wrapper">
              <img
                [src]="cert.imageUrl"
                [alt]="cert.name"
                class="cert-image"
                loading="lazy"
                width="80"
                height="80"
              />
            </div>
            <div class="cert-info">
              <h3 class="cert-name">{{ cert.name }}</h3>
              <p class="cert-issuer">{{ cert.issuer }}</p>
              <span class="cert-year">{{ cert.year }}</span>
            </div>
            @if (cert.verifyUrl) {
              <a
                [href]="cert.verifyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="cert-verify"
                [attr.aria-label]="'Verificar certificacao ' + cert.name"
              >
                Verificar &rarr;
              </a>
            }
          </div>
        }

        <div class="cert-card cert-placeholder">
          <div class="placeholder-icon">+</div>
          <p class="placeholder-text">Proxima certificacao em andamento...</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .certifications-section {
      padding: 2rem 2rem;
      content-visibility: auto;
    }

    .cert-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }

    .cert-card {
      background: var(--surface-2);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .cert-card:hover {
      transform: translateY(-4px);
      border-color: var(--java-orange);
      box-shadow: 0 8px 30px var(--card-shadow);
    }

    .cert-image-wrapper {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cert-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .cert-info {
      flex: 1;
    }

    .cert-name {
      font-family: 'Sora', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem;
    }

    .cert-issuer {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin: 0 0 0.25rem;
    }

    .cert-year {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--java-orange);
    }

    .cert-verify {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--java-orange);
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .cert-verify:hover {
      opacity: 0.8;
    }

    .cert-placeholder {
      border-style: dashed;
      border-color: var(--border-color);
      opacity: 0.6;
      justify-content: center;
    }

    .placeholder-icon {
      font-size: 2rem;
      color: var(--text-secondary);
    }

    .placeholder-text {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin: 0;
    }
  `,
})
export class Certifications implements OnInit {
  private readonly dataService = inject(PortfolioDataService);
  readonly certifications = signal<Certification[]>([]);

  ngOnInit(): void {
    this.dataService.getCertifications().subscribe((data) => {
      this.certifications.set(data);
    });
  }
}
