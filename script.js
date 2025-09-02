
// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      window.scrollTo({top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior:'smooth'});
      const navToggle = document.getElementById('nav-toggle');
      if(navToggle) navToggle.checked = false;
    }
  });
});

// ------ Honeypot + mailto submit ------
const form = document.getElementById('investor-form');
if (form) {
  // set start time
  const startedAt = Date.now();
  const ts = document.getElementById('form_started_at');
  if (ts) ts.value = String(startedAt);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);

    // Honeypot field (bots will often fill this)
    const hp = (data.get('company_website') || '').toString().trim();

    // Human-speed threshold (ms). < 2500ms is suspicious.
    const elapsed = Date.now() - startedAt;
    const tooFast = elapsed < 2500;

    if (hp !== '' || tooFast) {
      // Trap triggered: pretend success, do nothing.
      form.reset();
      // Optional UX: show a neutral message
      // document.getElementById('form-status')?.innerText = 'Thanks! We’ll be in touch.';
      return;
    }

    // Build mailto only for legitimate submissions
    const name = (data.get('name')||'').toString().trim();
    const firm = (data.get('firm')||'').toString().trim();
    const role = (data.get('role')||'').toString().trim();
    const email = (data.get('email')||'').toString().trim();
    const notes = (data.get('notes')||'').toString().trim();

    const subject = encodeURIComponent('Teaser request — Investor Intro');
    const body = encodeURIComponent(
`Hi CodexOne,

Name: ${name}
Firm: ${firm}
Role: ${role}
Email: ${email}

Notes:
${notes}

— via codexone.io`
    );
    window.location.href = `mailto:contact@codexone.io?subject=${subject}&body=${body}`;
  });
}