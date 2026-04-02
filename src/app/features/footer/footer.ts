import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="footer" class="footer">
      <div class="footer-content">
        <div class="footer-top">
          <div class="footer-brand">
            <span class="footer-logo">
                <span class="logo-bracket">{{ '{' }}</span>
                <span class="logo-text">Joao.</span><span class="logo-methodName">Maia</span><span class="logo-parenthesis">()</span>
                <span class="logo-bracket">{{ '}' }}</span>
            </span>
            <p class="footer-tagline">
              Desenvolvedor Java Back-End focado em solucoes escalaveis e codigo limpo.
            </p>
          </div>

          <div class="footer-nav">
            <h4 class="footer-heading">Navegação</h4>
            <ul class="footer-links">
              <li><a href="#hero" aria-label="Ir para secao Sobre">Sobre</a></li>
              <li><a href="#skills" aria-label="Ir para secao Skills">Skills</a></li>
              <li><a href="#projects" aria-label="Ir para secao Projetos">Projetos</a></li>
              <li><a href="#articles" aria-label="Ir para secao Artigos">Artigos</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h4 class="footer-heading">Contato</h4>
            <div class="footer-social">
              <a
                href="https://www.linkedin.com/in/joao-victor-maia-soares/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Joao Victor"
                class="social-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/jvmaiaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Joao Victor"
                class="social-link"
              >
                GitHub
              </a>
              <a
                href="mailto:joaovictormaia482&#64;gmail.com"
                aria-label="Email de Joao Victor"
                class="social-link"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ currentYear }} João Victor. Todos os direitos reservados.
          </p>
          <p class="built-with">
            Built with Angular + Java &#9749;
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      background: var(--surface-2);
      border-top: 1px solid var(--border-color);
      padding: 4rem 2rem 2rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .footer-logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.2rem;
      display: block;
      margin-bottom: 1rem;
    }

    .logo-bracket { color: var(--java-orange); }
    .logo-text { color: var(--text-primary); font-weight: 600; }
    .logo-methodName { color: var(--spring-blue); }
    .logo-parenthesis { color: var(--spring-green); }

    .footer-tagline {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 300px;
      margin: 0;
    }

    .footer-heading {
      font-family: 'Sora', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 0.5rem;
    }

    .footer-links a {
      font-size: 0.9rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: var(--java-orange);
    }

    .footer-social {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .social-link {
      font-size: 0.9rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .social-link:hover {
      color: var(--java-orange);
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }

    .copyright {
      font-size: 0.8rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    .built-with {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    @media (max-width: 768px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .footer-tagline {
        max-width: none;
      }

      .footer-social {
        align-items: center;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `,
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
}
