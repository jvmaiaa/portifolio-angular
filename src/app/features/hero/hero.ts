import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hero" class="hero" appScrollReveal>
      <div class="hero-content">
        <div class="hero-text">
          <!-- <div class="availability-badge">
            <span class="pulse-dot"></span>
            Disponivel para oportunidades
          </div> -->

          <h1 class="hero-name">
            <span class="name-typewriter">Joao Victor</span>
          </h1>

          <p class="hero-title">
            <span class="title-highlight">Backend Developer</span> &mdash; Java, Spring Boot, Microserviços &amp; Cloud
          </p>

          <p class="hero-description">
            Especialista no ecossistema Java/Spring com mais de 3 anos de experiência, e foco no setor financeiro. Expertise na construção de microsserviços escaláveis, arquiteturas orientadas a eventos (Kafka/RabbitMQ) e soluções resilientes em nuvem (AWS). Comprometido com boas práticas de: SOLID, KISS, Clean Code, POO, TDD. Além disso busco garantir uma alta cobertura de testes e performance em sistemas de larga escala.
          </p>

          <div class="hero-cta">
            <a href="#projects" class="btn btn-primary" (click)="scrollTo($event, 'projects')">
              Ver Projetos
            </a>
            <a href="#footer" class="btn btn-outline" (click)="scrollTo($event, 'footer')">
              Entrar em Contato
            </a>
          </div>

          <div class="social-links">
            <a
              href="https://www.linkedin.com/in/joao-victor-maia-soares/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Joao Victor"
              class="social-icon social-icon-linkedin"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/jvmaiaa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Joao Victor"
              class="social-icon social-icon-github"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a
              href="mailto:joaovictormaia482@gmail.com"
              aria-label="Email de Joao Victor"
              class="social-icon social-icon-gmail"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="hero-avatar">
          <div class="avatar-wrapper">
            <div class="avatar-placeholder">
              <img src="https://github.com/jvmaiaa.png" alt="Avatar de Joao Victor" class="avatar-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      /* padding: 2rem 2rem; */
      position: relative;
      overflow: hidden;
    }

    .hero-grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(var(--java-orange-ghost) 1px, transparent 1px),
        linear-gradient(90deg, var(--java-orange-ghost) 1px, transparent 1px);
      background-size: 60px 60px;
      opacity: 0.4;
      pointer-events: none;
    }

    .hero-content {
      max-width: 1200px;
      width: 100%;
      /* margin: 0 auto; */
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    /* .availability-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--spring-green);
      background: var(--badge-success-bg);
      border: 1px solid var(--spring-green);
      border-radius: 999px;
      padding: 0.4rem 1rem;
      margin-bottom: 1.5rem;
    } */

    /* .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--spring-green);
      animation: pulse 2s ease-in-out infinite;
    } */

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.3); }
    }

    /* .hero-name {
      margin: 0 0 1rem;
    } */

    /* .greeting {
      display: block;
      font-family: 'Sora', sans-serif;
      font-size: 1.1rem;
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    } */

    .name-typewriter {
      display: inline-block;
      font-family: 'Sora', sans-serif;
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--text-primary);
      border-right: 3px solid var(--java-orange);
      padding-right: 4px;
      animation: typewriter-cursor 1s step-end infinite;
    }

    @keyframes typewriter-cursor {
      50% { border-color: transparent; }
    }

    .hero-title {
      font-family: 'Sora', sans-serif;
      font-size: 1.3rem;
      color: var(--text-secondary);
      margin: 0 0 1.5rem;
    }

    .title-highlight {
      color: var(--java-orange);
      font-weight: 600;
    }

    .hero-description {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 550px;
      margin: 0 0 2rem;
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.75rem;
      border-radius: 8px;
      font-family: 'Sora', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-primary {
      background: var(--java-orange);
      color: #fff;
      border: none;
    }

    .btn-primary:hover {
      box-shadow: 0 4px 20px rgba(248, 152, 32, 0.4);
    }

    .btn-outline {
      background: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }

    .btn-outline:hover {
      border-color: var(--java-orange);
      color: var(--java-orange);
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
      text-decoration: none;
    }

    .social-icon:hover {
      transform: translateY(-3px);
    }

    .social-icon-linkedin:hover {
      color: var(--linkedin-blue);
    }

    .social-icon-github:hover {
      color: var(--text-primary);
    }

    .social-icon-gmail:hover {
      color: var(--java-red);
    }

    .hero-avatar {
      display: flex;
      justify-content: center;
    }

    .avatar-wrapper {
      width: 280px;
      height: 280px;
      border-radius: 50%;
      padding: 4px;
      background: conic-gradient(var(--java-orange), var(--java-red), var(--java-orange));
      animation: avatar-spin 6s linear infinite;
    }

    /* @keyframes avatar-spin {
      100% { rotate: 360deg; }
    } */

    .avatar-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-initials {
      font-family: 'Sora', sans-serif;
      font-size: 4rem;
      font-weight: 800;
      color: var(--java-orange);
      opacity: 0.7;
    }

    .avatar-image {
      border-radius: 50%;
    }

    @media (max-width: 768px) {
      .hero { padding: 5rem 1rem 3rem; }

      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-avatar { order: -1; }

      .avatar-wrapper {
        width: 180px;
        height: 180px;
      }

      .name-typewriter { font-size: 2.5rem; }

      .hero-description { margin: 0 auto 2rem; }

      .hero-cta { justify-content: center; }

      .social-links { justify-content: center; }
    }
  `,
})
export class Hero {
  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
