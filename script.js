
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

// Investor form -> mailto fallback
const form = document.getElementById('investor-form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
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
    const mailto = `mailto:contact@codexone.io?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}
