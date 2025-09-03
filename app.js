/* ---------------------------------------------------------
   Interview Prep Cards — App
   - Responsive grid (2 / 3 / 5 columns)
   - Welcome section shrinks away; header title fades in
   - Flip-zoom active card with scrollable content
   - localStorage persistence for user inputs
----------------------------------------------------------*/

// Sample data (add more as needed)
const QUESTIONS = [
  {
    id: 'q1',
    q: 'Tell me about yourself.',
    tips: [
      'Keep it professional (present → past → future).',
      'Highlight relevant skills and recent achievements.',
      'Connect your story to the role you’re applying for.'
    ],
    fields: [
      { key: 'summary', label: '30–60s Summary', sample:
`I’m a [role] with [X] years in [domain]. Recently at [company], I [achievement with metric]. I enjoy [strengths] and I’m excited about [how this role/company fits].` },
      { key: 'strengths', label: '2–3 Strengths to spotlight', sample:
`Analytical problem-solving; stakeholder communication; shipping features on time.` },
      { key: 'bridge', label: 'Bridge to the role', sample:
`This role’s focus on [area] aligns with my experience in [related projects], and I’m eager to contribute to [team/mission].` }
    ]
  },
  {
    id: 'q2',
    q: 'Why do you want to work here?',
    tips: [
      'Show you’ve researched the company.',
      'Align the mission, product, or culture with your values.',
      'Tie your skills to real upcoming challenges.'
    ],
    fields: [
      { key: 'research', label: 'Company research notes', sample:
`Mission: … | Product lines: … | Recent news: … | Culture values: …` },
      { key: 'fit', label: 'Fit & motivation', sample:
`I value [X] which aligns with your [value/principle]. I’m energized by [product/mission detail], especially [recent initiative].` },
      { key: 'impact', label: 'Impact you can make', sample:
`I can help by [skills → outcome], e.g., [example of similar impact previously].` }
    ]
  },
  {
    id: 'q3',
    q: 'What are your strengths?',
    tips: [
      'Choose strengths relevant to the job.',
      'Back each strength with a brief example.',
      'Keep it concise and concrete.'
    ],
    fields: [
      { key: 'list', label: 'Top 3 strengths', sample:
`1) [Strength] — example: …\n2) [Strength] — example: …\n3) [Strength] — example: …` },
      { key: 'story', label: 'Short story to anchor', sample:
`At [company], I used [strength] to [action], which led to [result/metric].` }
    ]
  },
  {
    id: 'q4',
    q: 'What is a weakness of yours?',
    tips: [
      'Pick a real, non-critical weakness.',
      'Show mitigation steps and progress.',
      'Avoid clichés or disguised strengths.'
    ],
    fields: [
      { key: 'weak', label: 'Weakness (realistic)', sample:
`I sometimes over-index on [area], which can slow [X].` },
      { key: 'mitigation', label: 'Mitigation & progress', sample:
`I’ve been using [method/tool/feedback] to balance this. Over the last [timeframe], I …` }
    ]
  },
  {
    id: 'q5',
    q: 'Describe a challenge and how you overcame it.',
    tips: [
      'Use a clear framework (STAR: Situation, Task, Action, Result).',
      'Quantify results where possible.',
      'Emphasize what you learned.'
    ],
    fields: [
      { key: 's', label: 'Situation/Task', sample:
`Context + goal: … (team, scope, constraints)` },
      { key: 'a', label: 'Action', sample:
`Steps you took, tradeoffs, collaboration: …` },
      { key: 'r', label: 'Result', sample:
`Outcome + metrics + learning: …` }
    ]
  },
  {
    id: 'q6',
    q: 'Why should we hire you?',
    tips: [
      'Synthesize your unique mix of skills and results.',
      'Match to the job’s top 2–3 needs.',
      'End confident, not arrogant.'
    ],
    fields: [
      { key: 'match', label: 'Role match summary', sample:
`Your needs: [need1], [need2], [need3]\nMy edge: [skill/experience → impact]` },
      { key: 'proof', label: 'Proof points (metrics)', sample:
`Delivered [result] by [doing X]; improved [metric] by [Y%]; shipped [project].` }
    ]
  },
  {
    id: 'q7',
    q: 'Tell me about a time you worked on a team.',
    tips: [
      'Clarify your role, collaboration, and communication.',
      'Address conflict and resolution if relevant.',
      'Tie to outcomes.'
    ],
    fields: [
      { key: 'team', label: 'Team context', sample:
`Cross-functional team with [roles]. Objective was …` },
      { key: 'collab', label: 'Your collaboration approach', sample:
`How you aligned stakeholders, managed tradeoffs, updated timelines.` },
      { key: 'result', label: 'Result and reflection', sample:
`What happened, impact, and what you’d do again/differently.` }
    ]
  },
  {
    id: 'q8',
    q: 'What are your salary expectations?',
    tips: [
      'Reference market ranges and your research.',
      'Give a thoughtful range if pressed.',
      'Be open to total compensation, not just base.'
    ],
    fields: [
      { key: 'range', label: 'Range & rationale', sample:
`Based on market data and role scope, I’m targeting [range], open to discussing the full package.` }
    ]
  },
  {
    id: 'q9',
    q: 'Where do you see yourself in 3–5 years?',
    tips: [
      'Ambitious but realistic; aligned with the role.',
      'Emphasize learning and impact.',
      'Avoid sounding like you’ll jump immediately.'
    ],
    fields: [
      { key: 'path', label: 'Growth path', sample:
`Building depth in [domain], mentoring, leading projects that deliver [impact].` }
    ]
  },
  {
    id: 'q10',
    q: 'Do you have any questions for us?',
    tips: [
      'Ask about roadmap, measures of success, and team collaboration.',
      'Show genuine curiosity and alignment.',
      'Avoid purely compensation or vacation questions first round.'
    ],
    fields: [
      { key: 'qs', label: 'Questions to ask', sample:
`1) What will define success in the first 90 days?\n2) How does the team measure impact?\n3) How do you approach feedback and growth?` }
    ]
  }
  ,
  {
    id: 'q11',
    q: 'Describe a project you’re particularly proud of.',
    tips: [
      'Choose a project with clear scope and measurable outcomes.',
      'Highlight your role, the challenge, and the impact.',
      'Mention tools, tradeoffs, and what you learned.'
    ],
    fields: [
      { key: 'context', label: 'Project context', sample:
`Project: …\nTeam size: …\nGoal: …` },
      { key: 'role', label: 'Your role & actions', sample:
`My role: …\nWhat I did: … (decisions, technical or non-technical contributions)` },
      { key: 'impact', label: 'Outcome & metrics', sample:
`Result: … (metrics, adoption, revenue, time saved)\nWhat I learned: …` }
    ]
  },
  {
    id: 'q12',
    q: 'How do you prioritize tasks when you have multiple deadlines?',
    tips: [
      'Talk about frameworks you use (impact/effort, urgency vs importance).',
      'Mention communication with stakeholders and tradeoffs.',
      'Give a short example with concrete steps.'
    ],
    fields: [
      { key: 'framework', label: 'Prioritization framework', sample:
`I use [framework], e.g., impact × effort, RICE, or a simple urgent/important matrix.` },
      { key: 'example', label: 'Concrete example', sample:
`Example: faced A, B, C — I did X, communicated Y, and delivered Z.` },
      { key: 'communication', label: 'How you communicate', sample:
`I update stakeholders, set expectations, and re-prioritize with data.` }
    ]
  },
  {
    id: 'q13',
    q: 'Tell me about a conflict you had at work and how you resolved it.',
    tips: [
      'Use STAR: Situation, Task, Action, Result.',
      'Focus on facts, listening, and constructive resolution.',
      'Show what you learned and how you prevent recurrence.'
    ],
    fields: [
      { key: 'situation', label: 'Situation/Task', sample:
`Context: … (who, what, stakes)` },
      { key: 'action', label: 'Action you took', sample:
`I listened, identified the root cause, proposed options, and aligned on a plan.` },
      { key: 'result', label: 'Result & reflection', sample:
`Outcome: …\nKey takeaway: …` }
    ]
  },
  {
    id: 'q14',
    q: 'Describe a situation where you took initiative.',
    tips: [
      'Show initiative with clear motivation and measurable follow-through.',
      'Explain how you evaluated risk and rallied others if needed.',
      'Include impact and lessons.'
    ],
    fields: [
      { key: 'need', label: 'What needed doing', sample:
`Gap/opportunity: …` },
      { key: 'steps', label: 'Steps you took', sample:
`I proposed…, built a prototype, got buy-in, and executed.` },
      { key: 'impact', label: 'Impact & next steps', sample:
`Result: …\nWhat came next: …` }
    ]
  },
  {
    id: 'q15',
    q: 'Share an example of when you had to quickly adapt to change.',
    tips: [
      'Describe the unexpected change and constraints.',
      'Emphasize rapid decision-making and prioritization.',
      'Show the outcome and what you automated or improved afterwards.'
    ],
    fields: [
      { key: 'change', label: 'What changed', sample:
`Change: … (deadline, scope, team, tech)` },
      { key: 'response', label: 'Your response', sample:
`Actions: triage, replan, communicate, deliver minimum viable outcome.` },
      { key: 'followup', label: 'Follow-up improvements', sample:
`Afterwards I introduced … to reduce friction next time.` }
    ]
  },
  {
    id: 'q16',
    q: 'How do you handle feedback or criticism?',
    tips: [
      'Show you welcome feedback and act on it.',
      'Give an example where feedback changed your approach.',
      'Mention how you separate intent from delivery and follow up.'
    ],
    fields: [
      { key: 'approach', label: 'Your approach', sample:
`I listen carefully, ask clarifying questions, and restate to confirm understanding.` },
      { key: 'example', label: 'Example of change', sample:
`Feedback: …\nI changed: …\nOutcome: …` }
    ]
  },
  {
    id: 'q17',
    q: 'What do you hope to learn in this role?',
    tips: [
      'Tie your learning goals to the company’s mission and the role’s responsibilities.',
      'Be specific about skills, domains, or leadership growth.',
      'Show eagerness to contribute while learning.'
    ],
    fields: [
      { key: 'skills', label: 'Skills or domains', sample:
`I want to deepen expertise in [domain], learn [tech/process], and improve [skill].` },
      { key: 'impact', label: 'How you’ll apply learning', sample:
`I’ll apply learning by [example: improving process, mentoring, shipping features].` }
    ]
  }
];

// ---------- DOM helpers ----------
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));


const appbar     = $('#appbar');
const titleEl    = $('#title');
const cardsWrap  = $('#cards');
const overlay    = $('#overlay');
const backdrop   = $('#backdrop');
const activeCard = $('#activeCard');
const welcome    = $('#welcome');
const gridWrap   = $('#gridWrap');
const arrowNext  = $('#arrowNext');

const STORAGE_PREFIX = 'ipcard_v1_';
let _savedScrollY = 0;

// touchmove handler reference so we can remove it later
let _overlayTouchHandler = null;

// ---------- Build grid cards ----------
function buildGrid() {
  const frag = document.createDocumentFragment();
  QUESTIONS.forEach(item => {
    const card = document.createElement('button');
    card.className = 'card';
    card.type = 'button';
    card.setAttribute('aria-label', item.q);
    card.dataset.id = item.id;

    const q = document.createElement('div');
    q.className = 'q';
    q.textContent = item.q;

    card.appendChild(q);
    card.addEventListener('click', () => openActive(item.id));
    frag.appendChild(card);
  });
  cardsWrap.innerHTML = '';
  cardsWrap.appendChild(frag);
}

// ---------- Navigation between welcome and cards ----------
function showWelcome() {
  welcome.style.display = '';
  gridWrap.style.display = 'none';
}

function showCards() {
  welcome.style.display = 'none';
  gridWrap.style.display = '';
}

if (arrowNext) {
  arrowNext.addEventListener('click', showCards);
  arrowNext.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') showCards();
  });
}

// Make header clickable to go to welcome page
if (appbar) {
  appbar.addEventListener('click', showWelcome);
}

// ---------- localStorage helpers ----------
function storageKey(cardId) {
  return `${STORAGE_PREFIX}${cardId}`;
}
function loadCardState(cardId) {
  try {
    const raw = localStorage.getItem(storageKey(cardId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveCardState(cardId, data) {
  localStorage.setItem(storageKey(cardId), JSON.stringify(data));
}

// ---------- Open active card (overlay) ----------
function openActive(cardId) {
  const data = QUESTIONS.find(q => q.id === cardId);
  if (!data) return;

  // Load saved or seed with samples
  const saved = loadCardState(cardId) || {};
  // Build DOM
  activeCard.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'head';

  const h3 = document.createElement('h3');
  h3.textContent = data.q;

  head.appendChild(h3);

  const body = document.createElement('div');
  body.className = 'body';

  // Meta tips
  const meta = document.createElement('div');
  meta.className = 'meta';
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.innerHTML = `<strong>Suggestions:</strong><br>${data.tips.map(t => `• ${escapeHtml(t)}`).join('<br>')}`;
  meta.appendChild(tip);
  body.appendChild(meta);

  // Guided fields
  const fieldValues = {};
  data.fields.forEach(f => {
    const group = document.createElement('div');
    group.className = 'group';

    const label = document.createElement('label');
    label.setAttribute('for', `${data.id}_${f.key}`);
    label.textContent = f.label;

    // Decide textarea vs input (most are textarea)
    const el = document.createElement('textarea');
    el.id = `${data.id}_${f.key}`;
    el.name = f.key;

    // Prefill: if user has saved content, use it; otherwise show sample as a placeholder
    const hasSaved = saved && typeof saved[f.key] === 'string' && saved[f.key].trim().length > 0;
    if (hasSaved) {
      el.value = saved[f.key];
    } else {
      el.value = '';
      el.placeholder = f.sample;
    }

    // Update tracked value only when user types
    el.addEventListener('input', () => {
      fieldValues[f.key] = el.value;
    });

    group.appendChild(label);
    group.appendChild(el);
    body.appendChild(group);

    // Initialize tracking value
    fieldValues[f.key] = el.value;
  });

  const foot = document.createElement('div');
  foot.className = 'foot';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn primary';
  saveBtn.type = 'button';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
    // Merge with any existing saved values (so partial updates persist)
    const prior = loadCardState(cardId) || {};
    const toSave = { ...prior, ...fieldValues };
    saveCardState(cardId, toSave);
    // Subtle confirmation
    saveBtn.textContent = 'Saved';
    setTimeout(() => (saveBtn.textContent = 'Save'), 1000);
  });

  const closeBtn2 = document.createElement('button');
  closeBtn2.className = 'btn';
  closeBtn2.type = 'button';
  closeBtn2.textContent = 'Close';
  closeBtn2.addEventListener('click', closeActive);

  foot.appendChild(saveBtn);
  foot.appendChild(closeBtn2);

  activeCard.appendChild(head);
  activeCard.appendChild(body);
  activeCard.appendChild(foot);

  // Show overlay
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');

  // Lock background scrolling: fix body in place and preserve scroll position
  _savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_savedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';

  // Prevent touchmove from scrolling the background on touch devices when touching outside the active card
  _overlayTouchHandler = function (e) {
    if (!activeCard.contains(e.target)) {
      e.preventDefault();
    }
  };
  overlay.addEventListener('touchmove', _overlayTouchHandler, { passive: false });

  // Flip-zoom animation: force reflow and re-apply animation
  activeCard.style.animation = 'none';
  // Force reflow
  void activeCard.offsetWidth;
  activeCard.style.animation = '';

  // Close when clicking backdrop (but not card)
  backdrop.addEventListener('click', closeActive, { once: true });

  // Escape key closes
  window.addEventListener('keydown', escListener, { once: true });
}

function closeActive() {
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');

  // Restore body scroll position and remove touch handler
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  window.scrollTo(0, _savedScrollY || 0);
  if (_overlayTouchHandler) {
    overlay.removeEventListener('touchmove', _overlayTouchHandler, { passive: false });
    _overlayTouchHandler = null;
  }
}

function escListener(e) {
  if (e.key === 'Escape') closeActive();
}

// ---------- Utilities ----------
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// ---------- Init ----------
buildGrid();
showWelcome();
