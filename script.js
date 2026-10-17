const STORAGE_KEYS = {
  theme: 'startpage-theme',
  bookmarks: 'startpage-bookmarks',
  memo: 'startpage-memo',
  todos: 'startpage-todos'
};

const defaultBookmarks = [
  { id: crypto.randomUUID(), name: 'Google', url: 'https://www.google.com' },
  { id: crypto.randomUUID(), name: 'YouTube', url: 'https://www.youtube.com' },
  { id: crypto.randomUUID(), name: 'Gmail', url: 'https://mail.google.com' },
  { id: crypto.randomUUID(), name: 'GitHub', url: 'https://github.com' }
];

const quotes = [
  '작은 진전도 멈춰 있는 것보다 낫다.',
  '오늘의 집중이 내일의 결과를 만든다.',
  '완벽보다 꾸준함이 더 멀리 간다.',
  '가장 중요한 일부터 시작하라.',
  '단순함은 생산성을 높이는 가장 조용한 힘이다.',
  '한 번에 한 가지에 집중하면 길이 보인다.',
  '좋은 하루는 좋은 리듬에서 시작된다.',
  '작은 습관이 큰 변화를 만든다.',
  '오늘의 한 걸음이 내일의 자신감을 만든다.',
  '복잡함을 덜어낼수록 본질이 선명해진다.'
];

const tarotDeck = [
  { name: 'The Fool', arcana: 'Major Arcana', number: '0', keywords: ['시작', '용기', '가능성'], meaning: '새로운 문이 열리는 날입니다. 완벽한 준비보다 가벼운 첫걸음이 더 멀리 데려다줄 수 있어요.' },
  { name: 'The Magician', arcana: 'Major Arcana', number: 'I', keywords: ['집중', '실행', '기술'], meaning: '당신의 손끝에는 이미 필요한 도구가 있습니다. 오늘은 생각을 행동으로 옮길 때입니다.' },
  { name: 'The High Priestess', arcana: 'Major Arcana', number: 'II', keywords: ['직관', '침착', '깊이'], meaning: '답은 서두르지 않을 때 더 또렷해집니다. 조용한 신호들을 천천히 읽어보세요.' },
  { name: 'The Empress', arcana: 'Major Arcana', number: 'III', keywords: ['풍요', '회복', '성장'], meaning: '부드럽게 돌보는 마음이 흐름을 바꿉니다. 오늘은 키우는 일에 더 어울립니다.' },
  { name: 'The Emperor', arcana: 'Major Arcana', number: 'IV', keywords: ['구조', '안정', '기준'], meaning: '흐트러진 것을 정돈할수록 힘이 생깁니다. 단단한 기준이 하루를 안정시켜줍니다.' },
  { name: 'The Star', arcana: 'Major Arcana', number: 'XVII', keywords: ['희망', '정리', '회복'], meaning: '희미하던 빛이 다시 선명해지는 날입니다. 마음속 소망 하나를 다시 믿어도 좋습니다.' },
  { name: 'Temperance', arcana: 'Major Arcana', number: 'XIV', keywords: ['균형', '조화', '절제'], meaning: '과하지도, 부족하지도 않게. 오늘은 리듬을 맞추는 감각이 가장 아름답습니다.' },
  { name: 'The World', arcana: 'Major Arcana', number: 'XXI', keywords: ['완성', '순환', '확장'], meaning: '하나의 장이 조용히 완성됩니다. 끝은 새로운 시작을 품고 있습니다.' }
];

const els = {
  clock: document.getElementById('clock'),
  date: document.getElementById('date'),
  greeting: document.getElementById('greeting'),
  themeToggle: document.getElementById('themeToggle'),
  searchForm: document.getElementById('searchForm'),
  searchInput: document.getElementById('searchInput'),
  quoteText: document.getElementById('quoteText'),
  tarotArcana: document.getElementById('tarotArcana'),
  tarotNumber: document.getElementById('tarotNumber'),
  tarotName: document.getElementById('tarotName'),
  tarotMeaning: document.getElementById('tarotMeaning'),
  tarotKeywords: document.getElementById('tarotKeywords'),
  bookmarkName: document.getElementById('bookmarkName'),
  bookmarkUrl: document.getElementById('bookmarkUrl'),
  addBookmarkBtn: document.getElementById('addBookmarkBtn'),
  bookmarkList: document.getElementById('bookmarkList'),
  bookmarkTemplate: document.getElementById('bookmarkTemplate'),
  memoInput: document.getElementById('memoInput'),
  clearMemoBtn: document.getElementById('clearMemoBtn'),
  todoForm: document.getElementById('todoForm'),
  todoInput: document.getElementById('todoInput'),
  todoList: document.getElementById('todoList'),
  weatherContent: document.getElementById('weatherContent')
};

const state = {
  bookmarks: load(STORAGE_KEYS.bookmarks, defaultBookmarks),
  todos: load(STORAGE_KEYS.todos, []),
  memo: localStorage.getItem(STORAGE_KEYS.memo) || '',
  theme: localStorage.getItem(STORAGE_KEYS.theme) || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function updateClock() {
  const now = new Date();
  els.clock.textContent = now.toLocaleTimeString('ko-KR', { hour12: false });
  els.date.textContent = now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  const hour = now.getHours();
  const label = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  els.greeting.textContent = `${label}.`;
}

function updateQuote() {
  const today = new Date();
  const index = today.getFullYear() + today.getMonth() + today.getDate();
  els.quoteText.textContent = quotes[index % quotes.length];
}

function updateTarot() {
  const today = new Date();
  const index = (today.getFullYear() * 372) + (today.getMonth() * 31) + today.getDate();
  const card = tarotDeck[index % tarotDeck.length];
  els.tarotArcana.textContent = card.arcana;
  els.tarotNumber.textContent = card.number;
  els.tarotName.textContent = card.name;
  els.tarotMeaning.textContent = card.meaning;
  els.tarotKeywords.innerHTML = '';
  card.keywords.forEach((keyword) => {
    const span = document.createElement('span');
    span.className = 'tarot__keyword';
    span.textContent = keyword;
    els.tarotKeywords.appendChild(span);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  els.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function renderBookmarks() {
  els.bookmarkList.innerHTML = '';
  state.bookmarks.forEach((bookmark) => {
    const node = els.bookmarkTemplate.content.firstElementChild.cloneNode(true);
    node.href = bookmark.url;
    node.querySelector('.bookmark__name').textContent = bookmark.name;
    node.querySelector('.bookmark__icon').textContent = bookmark.name.slice(0, 1).toUpperCase();
    node.querySelector('.bookmark__delete').addEventListener('click', (event) => {
      event.preventDefault();
      state.bookmarks = state.bookmarks.filter((item) => item.id !== bookmark.id);
      save(STORAGE_KEYS.bookmarks, state.bookmarks);
      renderBookmarks();
    });
    els.bookmarkList.appendChild(node);
  });
}

function addBookmark() {
  const name = els.bookmarkName.value.trim();
  const url = els.bookmarkUrl.value.trim();
  if (!name || !url) return;
  let normalizedUrl = url;
  if (!/^https?:\/\//i.test(normalizedUrl)) normalizedUrl = `https://${normalizedUrl}`;
  try { new URL(normalizedUrl); } catch { return; }
  state.bookmarks.unshift({ id: crypto.randomUUID(), name, url: normalizedUrl });
  save(STORAGE_KEYS.bookmarks, state.bookmarks);
  els.bookmarkName.value = '';
  els.bookmarkUrl.value = '';
  renderBookmarks();
}

function renderMemo() { els.memoInput.value = state.memo; }

function renderTodos() {
  els.todoList.innerHTML = '';
  state.todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.done ? ' done' : ''}`;
    const main = document.createElement('div');
    main.className = 'todo-main';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.setAttribute('aria-label', `${todo.text} 완료 체크`);
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      save(STORAGE_KEYS.todos, state.todos);
      renderTodos();
    });
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;
    main.append(checkbox, text);
    const del = document.createElement('button');
    del.className = 'todo-delete';
    del.type = 'button';
    del.textContent = '삭제';
    del.addEventListener('click', () => {
      state.todos = state.todos.filter((item) => item.id !== todo.id);
      save(STORAGE_KEYS.todos, state.todos);
      renderTodos();
    });
    li.append(main, del);
    els.todoList.appendChild(li);
  });
}

async function renderWeather() {
  if (!('geolocation' in navigator)) {
    els.weatherContent.innerHTML = '<p class="weather__state">이 브라우저는 위치 정보를 지원하지 않습니다.</p>';
    return;
  }
  els.weatherContent.innerHTML = '<p class="weather__state">현재 위치 기반 날씨를 확인 중입니다...</p>';
  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&timezone=auto`);
      const data = await res.json();
      const temp = data.current?.temperature_2m;
      const code = data.current?.weather_code;
      els.weatherContent.innerHTML = `<p><strong>현재 기온</strong>: ${temp ?? '-'}°C</p><p class="weather__state">날씨 코드: ${code ?? 'N/A'} / 위치 기반 정보를 표시합니다.</p>`;
    } catch {
      els.weatherContent.innerHTML = '<p class="weather__state">날씨 정보를 가져오지 못했습니다.</p>';
    }
  }, () => {
    els.weatherContent.innerHTML = '<p class="weather__state">위치 권한이 없어 기본 날씨 정보를 표시할 수 없습니다.</p>';
  }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
}

els.themeToggle.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
els.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = els.searchInput.value.trim();
  if (!query) return;
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
});
els.addBookmarkBtn.addEventListener('click', addBookmark);
els.bookmarkUrl.addEventListener('keydown', (event) => { if (event.key === 'Enter') addBookmark(); });
els.memoInput.addEventListener('input', () => { state.memo = els.memoInput.value; localStorage.setItem(STORAGE_KEYS.memo, state.memo); });
els.clearMemoBtn.addEventListener('click', () => { state.memo = ''; localStorage.removeItem(STORAGE_KEYS.memo); renderMemo(); });
els.todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = els.todoInput.value.trim();
  if (!text) return;
  state.todos.unshift({ id: crypto.randomUUID(), text, done: false });
  save(STORAGE_KEYS.todos, state.todos);
  els.todoInput.value = '';
  renderTodos();
});

applyTheme(state.theme);
updateQuote();
updateTarot();
renderMemo();
renderBookmarks();
renderTodos();
updateClock();
setInterval(updateClock, 1000);
renderWeather();