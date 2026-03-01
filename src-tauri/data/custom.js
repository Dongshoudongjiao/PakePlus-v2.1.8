window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=yes, viewport-fit=cover">
  <title>俄语助手 · 手机版</title>
  <!-- Tailwind + Font Awesome 6 -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    /* 沉浸式极光背景 - 手机全屏无白边 */
    body {
      background: radial-gradient(circle at 30% 30%, #b8e1ff, #a0d0ff, #7bb3ff);
      background-attachment: fixed;
      margin: 0;
      padding: 0;
      font-family: 'Nunito', 'Segoe UI', Roboto, system-ui, sans-serif;
    }
    .dark body {
      background: radial-gradient(circle at 30% 30%, #1a2639, #0f172a, #0b0f1a);
    }
    /* 毛玻璃卡片 - 手机用略小圆角 */
    .glass-nin {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 2rem;
      box-shadow: 0 20px 35px -10px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2) inset;
    }
    .dark .glass-nin {
      background: rgba(15, 23, 42, 0.75);
      border-color: rgba(255,255,255,0.08);
    }
    /* 卡片悬浮弹跳 (手机上去掉悬停，保留按压) */
    .card-nin {
      transition: all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }
    .card-nin:active {
      transform: scale(0.98);
    }
    /* 按钮按压反馈 */
    .btn-nin {
      transition: transform 0.08s, box-shadow 0.2s;
    }
    .btn-nin:active {
      transform: scale(0.96);
      box-shadow: 0 5px 10px -5px rgba(0,0,0,0.2);
    }
    /* 自定义模态框 - 毛玻璃弹窗 */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.2);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .modal-content {
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(20px);
      border-radius: 48px;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      border: 2px solid white;
      box-shadow: 0 30px 50px -20px rgba(0,0,0,0.3);
      transform: scale(0.9);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .modal-overlay.active .modal-content {
      transform: scale(1);
    }
    /* 北极熊眨眼动画 */
    @keyframes blink {
      0%, 90%, 100% { transform: scaleY(1); }
      95% { transform: scaleY(0.1); }
    }
    .polar-bear-eye {
      animation: blink 4s infinite;
    }
    /* 耳抖动 (手机触摸反馈) */
    .bear-ear:active {
      animation: earWiggle 0.3s;
    }
    @keyframes earWiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-8deg); }
      75% { transform: rotate(4deg); }
    }
    /* 动态噪点背景 */
    .noise-bg::after {
      content: "";
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: url('data:image/svg+xml,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.04"/></svg>');
      pointer-events: none;
      z-index: 9998;
    }
    /* 翻转卡片 - 手机版适当压缩高度 */
    .flip-container { perspective: 1000px; width: 100%; min-height: 200px; cursor: pointer; }
    .flip-card {
      width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d;
    }
    .flip-card.flipped { transform: rotateY(180deg); }
    .flip-front, .flip-back {
      width: 100%; min-height: 200px; backface-visibility: hidden;
      display: flex; align-items: center; justify-content: center; flex-direction: column;
      border-radius: 1.8rem; padding: 1.2rem; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
    .dark .flip-front, .dark .flip-back { background: #1e293b; color: #f1f5f9; }
    .flip-back { transform: rotateY(180deg); background: #eef6ff; }
    .dark .flip-back { background: #1a2e4a; }
    .star-filled { color: #facc15; }
    .star-empty { color: #cbd5e1; }
    /* 手机按钮大点，更好点 */
    .big-tap { min-height: 48px; }
  </style>
</head>
<body class="antialiased noise-bg">
  <!-- 自定义模态框（全局单例） -->
  <div id="customModal" class="modal-overlay">
    <div class="modal-content">
      <div id="modalIcon" class="text-5xl text-center mb-4">🐻❄️</div>
      <h3 id="modalTitle" class="text-2xl font-bold text-center mb-2">提示</h3>
      <p id="modalMessage" class="text-center text-slate-700 dark:text-slate-200 mb-6 whitespace-pre-line"></p>
      <div class="flex gap-3 justify-center">
        <button id="modalConfirmBtn" class="btn-nin px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl">确定</button>
        <button id="modalCancelBtn" class="btn-nin px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-bold">取消</button>
      </div>
    </div>
  </div>

  <div id="app" class="relative min-h-screen">
    <!-- 🎯 导航栏 - 不再固定，随页面滚动，无遮挡 -->
    <nav class="glass-nin mx-4 mt-4 mb-2 px-5 py-3 flex justify-between items-center">
      <h1 class="text-2xl font-black bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent drop-shadow-md">
        <i class="fas fa-language mr-2 text-blue-500"></i>俄语助手
      </h1>
      <div class="flex items-center gap-2">
        <!-- 北极熊吉祥物 -->
        <div id="polarBear" class="relative flex items-center cursor-pointer group" onclick="app.bearSay()">
          <div class="relative w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-white/80">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" fill="white" stroke="#D9D0C0" stroke-width="1.5"/>
              <circle cx="12" cy="12" r="7" fill="white" stroke="#D9D0C0" stroke-width="1.5" class="bear-ear"/>
              <circle cx="12" cy="12" r="4" fill="#E5DCCF"/>
              <circle cx="36" cy="12" r="7" fill="white" stroke="#D9D0C0" stroke-width="1.5" class="bear-ear"/>
              <circle cx="36" cy="12" r="4" fill="#E5DCCF"/>
              <circle cx="16" cy="22" r="3" fill="#1E3A5F" class="polar-bear-eye"/>
              <circle cx="32" cy="22" r="3" fill="#1E3A5F" class="polar-bear-eye"/>
              <ellipse cx="24" cy="28" rx="4" ry="3" fill="#4A5C6E"/>
              <path d="M18 34 Q24 40, 30 34" stroke="#4A5C6E" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div id="bearBubble" class="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-blue-800 px-4 py-2 rounded-full shadow-lg text-sm font-bold whitespace-nowrap opacity-0 transition-opacity pointer-events-none">
            Привет!
          </div>
        </div>
        <!-- 导航按钮 - 手机上调小间距 -->
        <button onclick="app.switchPage('home')" class="nav-btn text-lg p-2 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50 transition"><i class="fas fa-home"></i></button>
        <button onclick="app.switchPage('add')" class="nav-btn text-lg p-2 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50"><i class="fas fa-plus-circle"></i></button>
        <button onclick="app.switchPage('list')" class="nav-btn text-lg p-2 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50"><i class="fas fa-book"></i></button>
        <button onclick="app.switchPage('stats')" class="nav-btn text-lg p-2 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50"><i class="fas fa-chart-simple"></i></button>
        <button onclick="app.switchPage('quiz')" class="nav-btn text-lg p-2 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50"><i class="fas fa-puzzle-piece"></i></button>
        <button onclick="app.toggleDarkMode()" class="text-lg p-2 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/50">
          <i id="darkIcon" class="fas fa-moon"></i>
        </button>
      </div>
    </nav>

    <!-- 主页面容器 - 移除顶部留白，自然滚动 -->
    <div id="page-container" class="px-4 pb-6 max-w-7xl mx-auto"></div>
  </div>

  <script>
    (function(){
      "use strict";

      /********** 震动反馈（保留，音效已彻底移除） **********/
      function vibrate(pattern = 20) {
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(pattern);
        }
      }

      /********** 数据模型 **********/
      const STORAGE_KEY = 'russian_polarbear_mobile';
      let words = [];
      let settings = { darkMode: false, dailyGoal: 15 };
      let studyQueue = [], studyIndex = 0;
      let quizQuestions = [], quizScore = 0;
      let charts = {};

      // 加载数据
      function loadData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try { const d = JSON.parse(stored); words = d.words || []; settings = { ...settings, ...d.settings }; } catch(e){}
        }
        if (!words.length) {
          words = [
            { id: Date.now()+1, ru: 'Привет', zh: '你好', pos: '名词', proficiency: 3, reviewCount: 5, lastReview: null, added: new Date().toISOString(), example: 'Привет, как дела?', note: '' },
            { id: Date.now()+2, ru: 'Спасибо', zh: '谢谢', pos: '名词', proficiency: 4, reviewCount: 4, lastReview: null, added: new Date().toISOString(), example: 'Большое спасибо!', note: '' },
            { id: Date.now()+3, ru: 'Как дела', zh: '你好吗', pos: '短语', proficiency: 2, reviewCount: 2, lastReview: null, added: new Date().toISOString(), example: 'Привет, как дела?', note: '' },
            { id: Date.now()+4, ru: 'До свидания', zh: '再见', pos: '短语', proficiency: 3, reviewCount: 3, lastReview: null, added: new Date().toISOString(), example: 'До свидания!', note: '' },
            { id: Date.now()+5, ru: 'пожалуйста', zh: '请/不客气', pos: '副词', proficiency: 2, reviewCount: 2, lastReview: null, added: new Date().toISOString(), example: 'Спасибо! — Пожалуйста.', note: '' },
          ];
        }
        words.forEach(w => { w.proficiency ??= 0; w.reviewCount ??= 0; w.example ??= ''; w.note ??= ''; });
        applyDarkMode(settings.darkMode);
      }
      function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ words, settings }));
        updateStreak();
      }

      // 连续打卡
      function updateStreak() {
        const today = new Date().toISOString().split('T')[0];
        let last = localStorage.getItem('lastStudyDate') || '';
        let streak = parseInt(localStorage.getItem('studyStreak') || '0');
        if (last !== today) {
          if (last) {
            const lastDate = new Date(last);
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
            streak = (lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) ? streak+1 : 1;
          } else streak = 1;
          localStorage.setItem('lastStudyDate', today);
          localStorage.setItem('studyStreak', streak);
          if (streak > parseInt(localStorage.getItem('maxStreak')||'0')) localStorage.setItem('maxStreak', streak);
        }
        return streak;
      }

      // 暗黑模式
      function applyDarkMode(isDark) {
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        const icon = document.getElementById('darkIcon');
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }
      function toggleDarkMode() { settings.darkMode = !settings.darkMode; applyDarkMode(settings.darkMode); saveData(); }

      /********** 模态框系统（无原生弹窗） **********/
      const modal = {
        el: document.getElementById('customModal'),
        titleEl: document.getElementById('modalTitle'),
        msgEl: document.getElementById('modalMessage'),
        iconEl: document.getElementById('modalIcon'),
        confirmBtn: document.getElementById('modalConfirmBtn'),
        cancelBtn: document.getElementById('modalCancelBtn'),
        resolve: null,
        show({ title = '提示', message = '', icon = '🐻❄️', confirmText = '确定', cancelText = null, onConfirm, onCancel }) {
          this.titleEl.innerText = title;
          this.msgEl.innerText = message;
          this.iconEl.innerText = icon;
          this.confirmBtn.innerText = confirmText;
          this.cancelBtn.style.display = cancelText ? 'block' : 'none';
          if (cancelText) this.cancelBtn.innerText = cancelText;
          this.el.classList.add('active');
          return new Promise((resolve) => {
            this.resolve = resolve;
            const confirmHandler = () => { this.hide(); resolve(true); onConfirm?.(); vibrate(20); };
            const cancelHandler = () => { this.hide(); resolve(false); onCancel?.(); };
            this.confirmBtn.onclick = confirmHandler;
            this.cancelBtn.onclick = cancelHandler;
            this.el.onclick = (e) => { if (e.target === this.el) { this.hide(); resolve(false); } };
          });
        },
        hide() { this.el.classList.remove('active'); }
      };

      /********** 北极熊互动（无音效，仅震动） **********/
      function bearSay() {
        const bubble = document.getElementById('bearBubble');
        bubble.style.opacity = '1';
        vibrate(20);
        setTimeout(() => { bubble.style.opacity = '0'; }, 2000);
      }

      /********** 页面调度 **********/
      const container = document.getElementById('page-container');
      function switchPage(page) {
        let html = '';
        if (page === 'home') html = renderHome();
        else if (page === 'add') html = renderAdd();
        else if (page === 'list') html = renderList();
        else if (page === 'stats') html = renderStats();
        else if (page === 'study') html = renderStudy();
        else if (page === 'quiz') html = renderQuiz();
        container.innerHTML = html;
        if (page === 'stats') setTimeout(initChart, 50);
        if (page === 'study') initStudy();
        if (page === 'quiz') initQuiz();
        if (page === 'list') initListEvents();
        if (page === 'add') initAddForm();
      }

      /********** 首页 **********/
      function renderHome() {
        const toReview = words.filter(w => needReview(w)).length;
        const todayNew = words.filter(w => w.added?.split('T')[0] === new Date().toISOString().split('T')[0]).length;
        const mastered = words.filter(w => w.proficiency >= 4).length;
        const masterRate = words.length ? ((mastered/words.length)*100).toFixed(0) : 0;
        const streak = updateStreak();
        const weak = words.filter(w => w.proficiency <= 1).slice(0,5);
        return `
          <div class="space-y-4">
            <div class="grid md:grid-cols-3 gap-4">
              <div class="glass-nin p-5 card-nin">
                <div class="flex items-center gap-3">
                  <div class="p-3 bg-blue-200/50 rounded-2xl"><i class="fas fa-calendar-check text-2xl text-blue-700"></i></div>
                  <div><p class="text-xs opacity-70">今日复习</p><p class="text-3xl font-black">${toReview}</p></div>
                </div>
                <div class="mt-2 flex justify-between text-xs"><span>今日新增: <span class="font-bold">${todayNew}</span></span><span>目标: ${settings.dailyGoal}</span></div>
                <button onclick="app.startStudy()" class="btn-nin mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 text-base"><i class="fas fa-play"></i>开始背诵</button>
              </div>
              <div class="glass-nin p-5 card-nin">
                <div class="flex items-center gap-3">
                  <div class="p-3 bg-green-200/50 rounded-2xl"><i class="fas fa-chart-line text-2xl text-green-700"></i></div>
                  <div><p class="text-xs opacity-70">掌握率</p><p class="text-3xl font-black">${masterRate}%</p></div>
                </div>
                <div class="mt-2 w-full h-2 bg-slate-300 rounded-full overflow-hidden"><div class="bg-green-500 h-2 rounded-full" style="width:${masterRate}%"></div></div>
                <p class="mt-3 text-xs">总词汇: <span class="font-bold">${words.length}</span> · 熟练: ${mastered}</p>
              </div>
              <div class="glass-nin p-5 card-nin">
                <div class="flex items-center gap-3">
                  <div class="p-3 bg-amber-200/50 rounded-2xl"><i class="fas fa-fire text-2xl text-amber-700"></i></div>
                  <div><p class="text-xs opacity-70">连续打卡</p><p class="text-3xl font-black">${streak}天</p></div>
                </div>
                <div class="mt-2 flex justify-between text-xs"><span>🔥 最高: ${localStorage.getItem('maxStreak')||streak}</span><span><i class="fas fa-medal text-amber-500"></i> ${streak>=7?'周勇士':streak>=30?'月传奇':'坚持'}</span></div>
              </div>
            </div>
            <div class="glass-nin p-5">
              <h3 class="text-lg font-bold flex items-center gap-2 mb-3"><i class="fas fa-exclamation-triangle text-red-500"></i>需要加强</h3>
              ${weak.length ? weak.map(w => `<div class="flex justify-between items-center py-2 border-b border-white/20 last:border-0 text-sm"><span><span class="font-bold">${w.ru}</span> <span class="text-xs opacity-70">${w.zh}</span></span><span class="px-3 py-1 bg-red-200/60 rounded-full text-xs">熟练度 ${w.proficiency}</span></div>`).join('') : '<p class="text-center py-3 opacity-70 text-sm">暂无薄弱词🎉</p>'}
            </div>
          </div>
        `;
      }

      // 艾宾浩斯复习判定
      function needReview(w) {
        if (w.proficiency >= 5) return false;
        if (!w.lastReview) return true;
        const diff = Math.floor((new Date() - new Date(w.lastReview)) / (1000*60*60*24));
        if (w.proficiency <=1) return diff>=1;
        if (w.proficiency ===2) return diff>=2;
        if (w.proficiency ===3) return diff>=4;
        if (w.proficiency ===4) return diff>=7;
        return false;
      }

      /********** 添加单词 **********/
      function renderAdd() {
        return `
          <div class="glass-nin p-6 max-w-2xl mx-auto">
            <h2 class="text-2xl font-black mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"><i class="fas fa-plus-circle mr-2"></i>添加单词</h2>
            <form id="wordForm" class="space-y-4">
              <input type="hidden" id="editId">
              <div><label class="block font-medium mb-1 text-sm">俄语 <span class="text-red-500">*</span></label><input type="text" id="ru" required placeholder="Привет" class="w-full px-4 py-3 rounded-2xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:ring-4 focus:ring-blue-300 outline-none text-base"></div>
              <div><label class="block font-medium mb-1 text-sm">中文 <span class="text-red-500">*</span></label><input type="text" id="zh" required placeholder="你好" class="w-full px-4 py-3 rounded-2xl border-0 bg-white/70 dark:bg-slate-800/70 focus:ring-4 focus:ring-blue-300 text-base"></div>
              <div class="grid grid-cols-2 gap-3">
                <div><label class="block font-medium mb-1 text-sm">词性</label><input type="text" id="pos" placeholder="名词" class="w-full px-4 py-3 rounded-2xl border-0 bg-white/70 dark:bg-slate-800/70 text-base"></div>
                <div><label class="block font-medium mb-1 text-sm">熟练度</label><select id="proficiency" class="w-full px-4 py-3 rounded-2xl border-0 bg-white/70 dark:bg-slate-800/70 text-base"><option value="0">0 - 不认识</option><option value="1">1 - 眼熟</option><option value="2">2 - 模糊</option><option value="3">3 - 记得</option><option value="4">4 - 熟练</option><option value="5">5 - 掌握</option></select></div>
              </div>
              <div><label class="block font-medium mb-1 text-sm">例句</label><textarea id="example" rows="2" class="w-full px-4 py-3 rounded-2xl border-0 bg-white/70 dark:bg-slate-800/70 text-base"></textarea></div>
              <div><label class="block font-medium mb-1 text-sm">备注</label><input type="text" id="note" class="w-full px-4 py-3 rounded-2xl border-0 bg-white/70 dark:bg-slate-800/70 text-base"></div>
              <div class="flex gap-3 pt-3"><button type="submit" class="btn-nin flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl font-bold text-base"><i class="fas fa-save"></i> 保存单词</button><button type="button" onclick="app.switchPage('list')" class="btn-nin flex-1 bg-slate-200 dark:bg-slate-700 py-3 rounded-2xl font-bold text-base">取消</button></div>
            </form>
            <p id="formMsg" class="mt-3 text-center text-sm text-green-600"></p>
          </div>
        `;
      }
      function initAddForm() {
        const form = document.getElementById('wordForm');
        if (!form) return;
        const editId = document.getElementById('editId')?.value;
        if (editId) {
          const w = words.find(w=>w.id==editId);
          if(w) {
            document.getElementById('ru').value = w.ru;
            document.getElementById('zh').value = w.zh;
            document.getElementById('pos').value = w.pos||'';
            document.getElementById('proficiency').value = w.proficiency||0;
            document.getElementById('example').value = w.example||'';
            document.getElementById('note').value = w.note||'';
          }
        }
        form.onsubmit = (e) => {
          e.preventDefault();
          const ru = document.getElementById('ru').value.trim();
          const zh = document.getElementById('zh').value.trim();
          if (!ru || !zh) return;
          const editId = document.getElementById('editId').value;
          if (editId) {
            const idx = words.findIndex(w=>w.id==editId);
            if (idx!==-1) words[idx] = {...words[idx], ru, zh, pos: document.getElementById('pos').value, proficiency: parseInt(document.getElementById('proficiency').value), example: document.getElementById('example').value, note: document.getElementById('note').value};
            vibrate(20);
          } else {
            words.push({ id: Date.now(), ru, zh, pos: document.getElementById('pos').value||'其他', proficiency: parseInt(document.getElementById('proficiency').value)||0, reviewCount:0, lastReview:null, added: new Date().toISOString(), example: document.getElementById('example').value, note: document.getElementById('note').value });
            vibrate(20);
          }
          saveData();
          document.getElementById('formMsg').innerText = '✅ 保存成功！';
          form.reset(); document.getElementById('editId').value = '';
          setTimeout(()=>{ document.getElementById('formMsg').innerText = ''; switchPage('list'); }, 1000);
        };
      }

      /********** 单词列表 **********/
      function renderList() {
        return `
          <div class="glass-nin p-5">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 class="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"><i class="fas fa-book-open mr-2"></i>词库</h2>
              <div class="flex gap-2">
                <button onclick="app.exportWords()" class="btn-nin px-4 py-2 bg-green-200/60 rounded-full text-xs flex items-center gap-1"><i class="fas fa-download"></i>导出</button>
                <button onclick="document.getElementById('importFile').click()" class="btn-nin px-4 py-2 bg-blue-200/60 rounded-full text-xs flex items-center gap-1"><i class="fas fa-upload"></i>导入</button>
                <input type="file" id="importFile" accept=".json" style="display:none" onchange="app.importWords(event)">
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="relative flex-1"><i class="fas fa-search absolute left-4 top-3.5 text-slate-400 text-sm"></i><input type="text" id="searchInput" placeholder="搜索俄语/中文..." class="w-full pl-10 pr-4 py-3 rounded-full border-0 bg-white/70 dark:bg-slate-800/70 focus:ring-4 focus:ring-blue-300 text-sm"></div>
              <select id="filterProficiency" class="px-4 py-3 rounded-full border-0 bg-white/70 dark:bg-slate-800/70 text-sm"><option value="all">全部熟练度</option><option value="0-1">薄弱</option><option value="2-3">待加强</option><option value="4-5">掌握</option></select>
              <select id="filterPos" class="px-4 py-3 rounded-full border-0 bg-white/70 dark:bg-slate-800/70 text-sm"><option value="all">词性</option><option value="名词">名词</option><option value="动词">动词</option><option value="形容词">形容词</option><option value="短语">短语</option></select>
              <button onclick="app.resetFilters()" class="px-4 py-3 bg-slate-200/70 rounded-full text-sm"><i class="fas fa-undo-alt"></i></button>
            </div>
            <div id="listView" class="space-y-2 max-h-[400px] overflow-y-auto pr-1"></div>
          </div>
        `;
      }
      function renderListView() {
        const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const profFilter = document.getElementById('filterProficiency')?.value || 'all';
        const posFilter = document.getElementById('filterPos')?.value || 'all';
        let filtered = words.filter(w => {
          if (search && !w.ru.toLowerCase().includes(search) && !w.zh.toLowerCase().includes(search)) return false;
          if (profFilter !== 'all') {
            if (profFilter === '0-1' && w.proficiency > 1) return false;
            if (profFilter === '2-3' && (w.proficiency<2 || w.proficiency>3)) return false;
            if (profFilter === '4-5' && w.proficiency<4) return false;
          }
          if (posFilter !== 'all' && w.pos !== posFilter) return false;
          return true;
        });
        const listDiv = document.getElementById('listView');
        if (!filtered.length) { listDiv.innerHTML = '<p class="text-center py-6 opacity-70 text-sm">没有匹配的单词</p>'; return; }
        listDiv.innerHTML = filtered.map(w => `
          <div class="flex flex-wrap items-center justify-between bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-4 rounded-2xl border border-white/30 card-nin">
            <div class="flex-1">
              <div class="flex items-center gap-2"><span class="font-bold text-base">${w.ru}</span><button onclick="app.speak('${w.ru}')" class="text-blue-600 text-sm"><i class="fas fa-volume-up"></i></button><span class="text-xs px-2 py-1 bg-slate-200/70 rounded-full">${w.pos||'无'}</span></div>
              <p class="text-slate-700 dark:text-slate-300 text-sm">${w.zh}</p>
              ${w.example?`<p class="text-xs italic opacity-70">📘 ${w.example}</p>`:''}
            </div>
            <div class="flex items-center gap-2 mt-1 sm:mt-0">
              <div class="flex text-xs">${renderStars(w.proficiency)}</div>
              <button onclick="app.editWord(${w.id})" class="text-slate-500 hover:text-blue-600 text-base p-1"><i class="fas fa-pen"></i></button>
              <button onclick="app.deleteWord(${w.id})" class="text-slate-500 hover:text-red-600 text-base p-1"><i class="fas fa-trash"></i></button>
              <button onclick="app.showWordDetail(${w.id})" class="text-slate-500 hover:text-indigo-600 text-base p-1"><i class="fas fa-info-circle"></i></button>
            </div>
          </div>
        `).join('');
      }
      function renderStars(p) { let s=''; for(let i=0;i<5;i++) s+=`<i class="fas fa-star ${i<p?'star-filled text-yellow-400':'star-empty text-slate-300'} text-xs"></i>`; return s; }

      // 删除、编辑、详情（模态框）
      function deleteWord(id) {
        modal.show({ title: '🐻❄️ 确认删除', message: '确定要删除这个单词吗？', icon: '🗑️', confirmText: '删除', cancelText: '保留' }).then(confirm => {
          if (confirm) { 
            words = words.filter(w => w.id !== id); 
            saveData(); 
            renderListView(); 
            vibrate(30); 
          }
        });
      }
      function editWord(id) {
        const w = words.find(w=>w.id===id);
        if (w) { document.getElementById('editId').value = w.id; switchPage('add'); setTimeout(() => initAddForm(), 50); }
      }
      function showWordDetail(id) {
        const w = words.find(w=>w.id===id);
        if (!w) return;
        modal.show({ title: w.ru, message: `${w.zh}\n词性: ${w.pos||'无'}\n熟练度: ${w.proficiency}/5\n复习: ${w.reviewCount||0}次\n例句: ${w.example||'无'}\n备注: ${w.note||'无'}`, icon: '📘', confirmText: '知道了', cancelText: null }).then(()=>{});
      }

      // 导出/导入
      function exportWords() {
        const dataStr = JSON.stringify(words, null, 2);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `俄语词库_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        vibrate(20);
      }
      function importWords(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const imported = JSON.parse(ev.target.result);
            if (Array.isArray(imported)) {
              words = imported;
              saveData();
              modal.show({ title: '导入成功', message: `已导入 ${words.length} 个单词`, icon: '📚', confirmText: '好的', cancelText: null });
              switchPage('list');
            }
          } catch(ex) { modal.show({ title: '错误', message: '文件格式不正确', icon: '❌', confirmText: '确定', cancelText: null }); }
        };
        reader.readAsText(file);
      }

      // 语音
      function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        window.speechSynthesis.speak(utterance);
        vibrate(20);
      }

      /********** 统计图表 **********/
      function renderStats() {
        return `
          <div class="space-y-5">
            <div class="glass-nin p-5">
              <h2 class="text-2xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"><i class="fas fa-chart-pie mr-2"></i>学习洞察</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl"><canvas id="proficiencyChart" width="150" height="150"></canvas></div>
                <div class="bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl"><canvas id="posChart" width="150" height="150"></canvas></div>
              </div>
            </div>
            <div class="glass-nin p-5">
              <h3 class="text-lg font-bold mb-3 flex items-center gap-2"><i class="fas fa-medal text-yellow-500"></i>成就墙</h3>
              <div class="grid grid-cols-4 gap-2">${renderAchievements()}</div>
            </div>
            <div class="glass-nin p-5">
              <div class="flex justify-between items-center"><h3 class="text-lg font-bold">每日目标</h3><button onclick="app.setDailyGoal()" class="text-xs text-blue-600"><i class="fas fa-edit"></i> 修改</button></div>
              <div class="mt-2 flex items-center gap-3"><span class="text-2xl font-bold text-blue-600">${settings.dailyGoal}</span><span class="text-sm">个/天</span><div class="flex-1 h-2 bg-slate-200 rounded-full"><div class="bg-blue-500 h-2 rounded-full" style="width:${Math.min(100, (words.filter(w=>w.reviewCount>0).length/settings.dailyGoal)*100)}%"></div></div></div>
            </div>
          </div>
        `;
      }
      function renderAchievements() {
        const streak = parseInt(localStorage.getItem('studyStreak') || '0');
        const mastered = words.filter(w => w.proficiency >= 4).length;
        const total = words.length;
        let badges = [];
        if (streak >= 3) badges.push({icon:'🔥', name:'3日'});
        if (streak >= 7) badges.push({icon:'🌞', name:'周常'});
        if (streak >= 30) badges.push({icon:'🏆', name:'月神'});
        if (mastered >= 5) badges.push({icon:'⭐', name:'初阶'});
        if (mastered >= 20) badges.push({icon:'🌟🌟', name:'进阶'});
        if (total >= 30) badges.push({icon:'📚', name:'藏书'});
        if (badges.length === 0) badges.push({icon:'🌱', name:'新芽'});
        return badges.map(b => `<div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 p-2 rounded-xl text-center"><div class="text-2xl">${b.icon}</div><p class="text-[10px] font-bold mt-0.5">${b.name}</p></div>`).join('');
      }
      function initChart() {
        const profDist = [0,0,0,0,0,0];
        words.forEach(w => { profDist[w.proficiency] = (profDist[w.proficiency] || 0) + 1; });
        const ctx1 = document.getElementById('proficiencyChart')?.getContext('2d');
        if (ctx1) {
          if (charts.prof) charts.prof.destroy();
          charts.prof = new Chart(ctx1, { type: 'doughnut', data: { labels: ['0','1','2','3','4','5'], datasets: [{ data: profDist.slice(0,6), backgroundColor: ['#f87171','#fb923c','#facc15','#4ade80','#38bdf8','#a78bfa'] }] }, options: { responsive: true, maintainAspectRatio: true } });
        }
        const posMap = {};
        words.forEach(w => { posMap[w.pos] = (posMap[w.pos]||0)+1; });
        const ctx2 = document.getElementById('posChart')?.getContext('2d');
        if (ctx2) {
          if (charts.pos) charts.pos.destroy();
          charts.pos = new Chart(ctx2, { type: 'pie', data: { labels: Object.keys(posMap), datasets: [{ data: Object.values(posMap), backgroundColor: ['#60a5fa','#34d399','#fbbf24','#f472b6','#c084fc'] }] }, options: { responsive: true, maintainAspectRatio: true } });
        }
      }

      /********** 学习卡片 - 手机优化：按钮上移，无需滚动 **********/
      function startStudy() {
        studyQueue = words.filter(w => needReview(w));
        if (studyQueue.length === 0) studyQueue = words.filter(w => w.proficiency < 5);
        if (studyQueue.length === 0) studyQueue = words.slice(0,5);
        studyIndex = 0;
        switchPage('study');
      }
      function renderStudy() {
        if (!studyQueue || studyQueue.length === 0) {
          studyQueue = words.filter(w => needReview(w));
          if (studyQueue.length === 0) studyQueue = words.filter(w => w.proficiency < 5);
          if (studyQueue.length === 0) studyQueue = words.slice(0,5);
          studyIndex = 0;
        }
        const word = studyQueue[studyIndex];
        if (!word) {
          return `<div class="glass-nin p-6 text-center">学习完成！<button onclick="app.switchPage('home')" class="text-blue-500 block mt-3">返回首页</button></div>`;
        }
        return `
          <div class="glass-nin p-5 max-w-2xl mx-auto">
            <div class="flex justify-between items-center mb-3">
              <h2 class="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"><i class="fas fa-brain mr-2"></i>记忆训练</h2>
              <button onclick="app.switchPage('home')" class="text-slate-500 hover:text-slate-700 text-xl"><i class="fas fa-times-circle"></i></button>
            </div>
            <!-- 卡片区域 - 手机版高度压缩，确保按钮上移 -->
            <div id="studyFlip" class="flip-container" onclick="app.toggleFlip()">
              <div id="flipCard" class="flip-card">
                <div class="flip-front">
                  <p class="text-4xl font-bold mb-1">${word.ru}</p>
                  <button onclick="event.stopPropagation(); app.speak('${word.ru}')" class="text-blue-500 text-lg p-1"><i class="fas fa-volume-up"></i> 发音</button>
                  <p class="text-xs text-slate-400 mt-2">👆 点击翻转</p>
                </div>
                <div class="flip-back">
                  <p class="text-3xl font-bold mb-1">${word.zh}</p>
                  ${word.pos?`<span class="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs mb-1">${word.pos}</span>`:''}
                  ${word.example?`<p class="mt-1 text-xs italic">“${word.example}”</p>`:''}
                  ${word.note?`<p class="mt-0.5 text-[10px] text-slate-500">📌 ${word.note}</p>`:''}
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-2 text-xl">${renderStars(word.proficiency)}</div>
            <div class="mt-3 flex items-center gap-2">
              <span class="text-xs">${studyIndex+1}/${studyQueue.length}</span>
              <div class="flex-1 h-2 bg-slate-200 rounded-full">
                <div class="bg-blue-500 h-2 rounded-full" style="width:${((studyIndex+1)/studyQueue.length)*100}%"></div>
              </div>
            </div>
            <!-- 按钮上移，减少边距，手机一屏可见 -->
            <div class="flex gap-3 mt-4">
              <button onclick="app.answerStudy(false)" class="btn-nin flex-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 py-4 rounded-2xl font-bold border border-red-200 hover:bg-red-200 flex items-center justify-center gap-2 text-base">
                <i class="fas fa-thumbs-down"></i> 不认识
              </button>
              <button onclick="app.answerStudy(true)" class="btn-nin flex-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 py-4 rounded-2xl font-bold border border-green-200 hover:bg-green-200 flex items-center justify-center gap-2 text-base">
                <i class="fas fa-thumbs-up"></i> 认识
              </button>
            </div>
            <p id="studyMsg" class="text-center mt-3 text-sm"></p>
          </div>
        `;
      }
      function initStudy() {
        const flipCard = document.getElementById('flipCard');
        if (flipCard) flipCard.classList.remove('flipped');
      }
      function toggleFlip() {
        document.getElementById('flipCard')?.classList.toggle('flipped');
      }

      // 🎯 核心修复：answerStudy 刷新页面
      function answerStudy(isKnow) {
        const word = studyQueue[studyIndex];
        if (!word) {
          startStudy();
          return;
        }
        if (isKnow) {
          word.proficiency = Math.min(5, word.proficiency + 1);
        } else {
          word.proficiency = Math.max(0, word.proficiency - 1);
        }
        word.reviewCount++;
        word.lastReview = new Date().toISOString();
        saveData();
        vibrate(isKnow ? 15 : 20);

        studyIndex++;
        if (studyIndex >= studyQueue.length) {
          document.getElementById('studyMsg').innerText = '🎉 本轮完成！';
          vibrate([30,30,30]);
          setTimeout(() => switchPage('home'), 1500);
        } else {
          switchPage('study');
        }
      }

      /********** 测验 **********/
      function renderQuiz() {
        if (words.length < 4) return '<div class="glass-nin p-6 text-center">单词不足4个，无法测试</div>';
        quizQuestions = generateQuiz(5);
        quizScore = 0;
        return `
          <div class="glass-nin p-5 max-w-3xl mx-auto">
            <h2 class="text-2xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"><i class="fas fa-puzzle-piece mr-2"></i>单词测验</h2>
            <div id="quizArea" class="space-y-4"></div>
          </div>
        `;
      }
      function generateQuiz(count=5) {
        const shuffled = [...words].sort(()=>0.5-Math.random());
        const selected = shuffled.slice(0, count);
        return selected.map(w => {
          let options = [w.zh];
          const others = words.filter(x => x.id !== w.id).map(x => x.zh).filter((v,i,a)=>a.indexOf(v)===i);
          while (options.length < 4 && others.length) {
            const rand = others[Math.floor(Math.random() * others.length)];
            if (!options.includes(rand)) options.push(rand);
          }
          while (options.length < 4) options.push('???');
          options = options.sort(()=>0.5-Math.random());
          return { word: w, question: w.ru, correct: w.zh, options };
        });
      }
      function initQuiz() {
        if (!quizQuestions.length) return;
        const area = document.getElementById('quizArea');
        area.innerHTML = quizQuestions.map((q, idx) => `
          <div class="bg-white/70 dark:bg-slate-800/70 p-4 rounded-2xl quiz-item" data-correct="${q.correct}">
            <p class="text-base font-bold mb-2">${idx+1}. ${q.question}</p>
            <div class="grid grid-cols-2 gap-2">
              ${q.options.map(opt => `<button class="quiz-opt w-full py-3 px-2 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-blue-100 transition text-sm" data-opt="${opt}">${opt}</button>`).join('')}
            </div>
            <p class="quiz-feedback text-xs mt-2"></p>
          </div>
        `).join('');
        document.querySelectorAll('.quiz-opt').forEach(btn => {
          btn.addEventListener('click', function(e) {
            const item = this.closest('.quiz-item');
            const correct = item.dataset.correct;
            const selected = this.dataset.opt;
            const feedback = item.querySelector('.quiz-feedback');
            if (item.classList.contains('answered')) return;
            item.classList.add('answered');
            if (selected === correct) {
              feedback.innerHTML = '✅ 正确！'; feedback.classList.add('text-green-600');
              quizScore++; vibrate(15);
            } else {
              feedback.innerHTML = `❌ 错误，正确答案：${correct}`; feedback.classList.add('text-red-600');
              vibrate(20);
            }
            let scoreEl = document.getElementById('quizScore');
            if (!scoreEl) { scoreEl = document.createElement('div'); scoreEl.id = 'quizScore'; scoreEl.className = 'mt-4 text-center text-lg font-bold'; area.parentNode.appendChild(scoreEl); }
            scoreEl.innerText = `得分: ${quizScore}/${quizQuestions.length}`;
          });
        });
      }

      // 设置每日目标
      function setDailyGoal() {
        const newGoal = prompt('请输入每日学习目标（单词数）', settings.dailyGoal);
        if (newGoal && !isNaN(newGoal) && newGoal > 0) {
          settings.dailyGoal = parseInt(newGoal);
          saveData();
          vibrate(20);
          switchPage('stats');
        }
      }

      function resetFilters() {
        const si = document.getElementById('searchInput'); if(si) si.value = '';
        const fp = document.getElementById('filterProficiency'); if(fp) fp.value = 'all';
        const fpos = document.getElementById('filterPos'); if(fpos) fpos.value = 'all';
        renderListView();
      }

      // 暴露全局API
      window.app = {
        switchPage, toggleDarkMode, startStudy, speak, exportWords, importWords,
        deleteWord, editWord, showWordDetail, bearSay, setDailyGoal, resetFilters,
        renderListView, toggleFlip, answerStudy
      };

      // 启动
      loadData();
      switchPage('home');
    })();
  </script>
</body>
</html>