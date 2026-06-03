// ── 날짜 ──
document.getElementById('today-date').textContent =
  new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });

// ── 인삿말 ──
function getGreeting() {
  const h = new Date().getHours();
  const day = new Date().getDay();
  if (day === 0 || day === 6) return '좋은 주말이에요!';
  if (h >= 5 && h < 9)   return '좋은 아침이에요!';
  if (h >= 9 && h < 12)  return '오전도 힘차게!';
  if (h >= 12 && h < 14) return '점심 맛있게 드셨나요?';
  if (h >= 14 && h < 18) return '오후도 화이팅!';
  if (h >= 18 && h < 21) return '하루를 마무리해봐요!';
  if (h >= 21 && h < 24) return '좋은 저녁이에요!';
  return '늦게까지 고생이에요!';
}
document.querySelector('.greeting-sub').textContent = getGreeting();

// ── 페이지 전환 ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  const el = document.getElementById(id);
  el.classList.add('active');
  // 애니메이션 리셋
  el.querySelectorAll(':scope > *').forEach(child => {
    child.style.animation = 'none';
    child.offsetHeight;
    child.style.animation = '';
  });
  const tabBtn = document.querySelector(`.tab-item[data-page="${id}"]`);
  if (tabBtn) tabBtn.classList.add('active');
  document.getElementById('pages').scrollTop = 0;
}

// ── 모달 ──
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.add('hidden'); });
});

// ── 테마 ──
function toggleTheme() {
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('theme-toggle').classList.toggle('on', !dark);
}

// ── 세그먼트 버튼 ──
function setSeg(btn) {
  btn.closest('.seg-control').querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── 시간 드롭다운 생성 (8:00~23:00) ──
function buildTimeOptions(selectId) {
  const sel = document.getElementById(selectId);
  for (let h = 8; h <= 23; h++) {
    const opt = document.createElement('option');
    opt.value = `${h}:00`;
    opt.textContent = `${h}:00`;
    sel.appendChild(opt);
  }
}
buildTimeOptions('out-start-time');
buildTimeOptions('out-end-time');

// ── 필수 입력 체크 → 버튼 활성화 ──
function checkOutingForm() {
  const vals = ['out-start-date','out-start-time','out-end-date','out-end-time','out-reason'];
  const ok = vals.every(id => document.getElementById(id).value.trim() !== '');
  document.getElementById('outing-submit').disabled = !ok;
}
function checkStudyForm() {
  const vals = ['study-date','study-time','study-teacher','study-place','study-reason'];
  const ok = vals.every(id => document.getElementById(id).value.trim() !== '');
  document.getElementById('study-submit').disabled = !ok;
}
function checkYoyangForm() {
  const ok = ['yoyang-date','yoyang-time'].every(id => document.getElementById(id).value.trim() !== '');
  document.getElementById('yoyang-submit').disabled = !ok;
}
['out-start-date','out-start-time','out-end-date','out-end-time','out-reason'].forEach(id => {
  document.getElementById(id).addEventListener('input', checkOutingForm);
  document.getElementById(id).addEventListener('change', checkOutingForm);
});
['study-date','study-time','study-teacher','study-place','study-reason'].forEach(id => {
  document.getElementById(id).addEventListener('input', checkStudyForm);
  document.getElementById(id).addEventListener('change', checkStudyForm);
});
['yoyang-date','yoyang-time'].forEach(id => {
  document.getElementById(id).addEventListener('input', checkYoyangForm);
  document.getElementById(id).addEventListener('change', checkYoyangForm);
});
// 초기 비활성화
document.getElementById('outing-submit').disabled = true;
document.getElementById('study-submit').disabled = true;
document.getElementById('yoyang-submit').disabled = true;

// ── 학습 모달 타입 전환 ──
function switchStudyType(type) {
  const isBonkwan = type === 'bonkwan';
  document.getElementById('bonkwan-form').classList.toggle('hidden', !isBonkwan);
  document.getElementById('yoyang-form').classList.toggle('hidden', isBonkwan);
  document.querySelectorAll('#study-type-seg .seg-btn').forEach((btn, i) => {
    btn.classList.toggle('active', isBonkwan ? i === 0 : i === 1);
  });
}

// ── 신청 처리 ──
function submitOuting() {
  alert('외출·외박 신청이 완료되었습니다.');
  closeModal('outing-modal');
}
function submitStudy() {
  alert('본관신청이 완료되었습니다.');
  closeModal('study-modal');
}
function submitYoyang() {
  alert('요양신청이 완료되었습니다.');
  closeModal('study-modal');
}

// ── 공지사항 필터 ──
function filterNotice(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.notice-item').forEach(item => {
    if (type === 'all') item.style.display = '';
    else if (type === 'pinned') item.style.display = item.classList.contains('pinned') ? '' : 'none';
    else item.style.display = item.classList.contains('pinned') ? 'none' : '';
  });
}

// ── 상벌점 필터 ──
function setView(type, btn) {
  document.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.points-item').forEach(item => {
    if (type === 'all') item.classList.remove('hidden');
    else item.classList.toggle('hidden', item.dataset.type !== type);
  });
}

// ── OS 감지 → 모바일이면 폰 프레임 제거 ──
const ua = navigator.userAgent;
const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
if (isMobile) {
  document.body.style.background = 'var(--bg)';
  document.getElementById('pc-left').style.display = 'none';
}