
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.project-card,.skill-card,.edu-card,.timeline-item,.extra-card').forEach((el,i) => {
  el.style.transitionDelay = (i % 3) * 55 + 'ms';
});

// Projects are shown in separate pages; each page reveals only its own three cards.
const projectCards = Array.from(document.querySelectorAll('[data-project-card]'));
const projectsPrev = document.getElementById('projects-prev');
const projectsNext = document.getElementById('projects-next');
const projectsPageLabel = document.getElementById('projects-page-label');
const projectsPerPage = 3;
let projectsPage = 0;
const projectsPageCount = Math.ceil(projectCards.length / projectsPerPage);

function renderProjectPage() {
  const start = projectsPage * projectsPerPage;
  const end = Math.min(start + projectsPerPage, projectCards.length);
  projectCards.forEach((card, index) => {
    card.hidden = index < start || index >= end;
    card.style.transitionDelay = '0ms';
  });
  if (projectsPageLabel) projectsPageLabel.textContent = `${start + 1}–${end} of ${projectCards.length}`;
  if (projectsPrev) projectsPrev.disabled = projectsPage === 0;
  if (projectsNext) projectsNext.disabled = projectsPage >= projectsPageCount - 1;
}
projectsPrev?.addEventListener('click', () => {
  if (projectsPage > 0) { projectsPage--; renderProjectPage(); }
});
projectsNext?.addEventListener('click', () => {
  if (projectsPage < projectsPageCount - 1) { projectsPage++; renderProjectPage(); }
});
renderProjectPage();


// Certificates use the same three-card paging behavior as the Projects section.
const certificateCards = Array.from(document.querySelectorAll('[data-certificate-card]'));
const certificatesPrev = document.getElementById('certificates-prev');
const certificatesNext = document.getElementById('certificates-next');
const certificatesPageLabel = document.getElementById('certificates-page-label');
const certificatesPerPage = 3;
let certificatesPage = 0;
const certificatesPageCount = Math.ceil(certificateCards.length / certificatesPerPage);

function renderCertificatesPage() {
  const start = certificatesPage * certificatesPerPage;
  const end = Math.min(start + certificatesPerPage, certificateCards.length);
  certificateCards.forEach((card, index) => {
    card.hidden = index < start || index >= end;
    card.style.transitionDelay = '0ms';
  });
  if (certificatesPageLabel) certificatesPageLabel.textContent = `${start + 1}–${end} of ${certificateCards.length}`;
  if (certificatesPrev) certificatesPrev.disabled = certificatesPage === 0;
  if (certificatesNext) certificatesNext.disabled = certificatesPage >= certificatesPageCount - 1;
}
certificatesPrev?.addEventListener('click', () => {
  if (certificatesPage > 0) { certificatesPage--; renderCertificatesPage(); }
});
certificatesNext?.addEventListener('click', () => {
  if (certificatesPage < certificatesPageCount - 1) { certificatesPage++; renderCertificatesPage(); }
});
renderCertificatesPage();
