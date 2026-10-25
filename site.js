(function () {
  var sections = window.SECTIONS || [];
  var pieces = window.PIECES || [];
  var labels = {
    ar: {
      name: 'مداد',
      tagline: 'مدادٌ لما لا يُقال',
      intro: 'أبياتٌ وأقوالٌ أعودُ إليها، وأخرى أكتبُها.',
      lang: 'English',
      home: 'البداية',
      open: 'اقرأ',
      pieces: 'نصوص',
      reflection: 'مساحة للكتابة',
      back: 'العودة إلى مداد',
      copy: 'نسخ',
      copied: 'نُسخ النص',
      copyFail: 'تعذّر النسخ',
      notePrompt: 'ما الذي تركه النص فيك؟',
      notePlaceholder: 'اكتب ما تشاء، واحتفظ به لنفسك.',
      save: 'حفظ',
      clear: 'مسح',
      noteSaved: 'حُفظ الهامش في هذا المتصفح.',
      noteCleared: 'مُسح الهامش المحفوظ.',
      noteEmpty: 'اكتب شيئًا قبل الحفظ.',
      noteFail: 'تعذّر حفظ الهامش.',
      privacy: 'ما تكتبه يُحفظ في هذا المتصفح فقط، ولا يُرسل إلى أي مكان.',
      empty: 'هذا الهامش مفتوح لما يتركه النص في نفس القارئ.'
    },
    en: {
      name: 'Midad',
      tagline: 'Ink for what cannot be said',
      intro: 'Verses and sayings I return to, and others I write.',
      lang: 'العربية',
      home: 'Home',
      open: 'Read',
      pieces: 'pieces',
      reflection: 'A space to reflect',
      back: 'Back to Midad',
      copy: 'Copy',
      copied: 'Copied',
      copyFail: 'Could not copy',
      notePrompt: 'What did the words leave with you?',
      notePlaceholder: 'Write something for yourself to keep.',
      save: 'Save',
      clear: 'Clear',
      noteSaved: 'Your margin is saved in this browser.',
      noteCleared: 'The saved margin has been cleared.',
      noteEmpty: 'Write something before saving.',
      noteFail: 'Could not save your margin.',
      privacy: 'Your writing stays in this browser; it is not sent anywhere.',
      empty: 'This margin is open for whatever the words leave with the reader.'
    }
  };
  var lang = 'ar';
  try {
    var savedLanguage = localStorage.getItem('midad-lang');
    if (savedLanguage === 'ar' || savedLanguage === 'en') lang = savedLanguage;
  } catch (error) {
    // Language selection still works for this visit when storage is unavailable.
  }

  var body = document.body;
  var main = document.getElementById('main');
  var toast = document.getElementById('toast');
  var toastTimer;

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function getSection(id) {
    return sections.filter(function (section) { return section.id === id; })[0];
  }

  function buildHeader() {
    var brand = document.getElementById('brand');
    brand.textContent = labels[lang].name;
    var links = document.querySelectorAll('[data-section-link]');
    for (var i = 0; i < links.length; i++) {
      var sectionId = links[i].getAttribute('data-section-link');
      var section = getSection(sectionId);
      if (section) links[i].textContent = section[lang].title;
      if (body.getAttribute('data-section') === sectionId) {
        links[i].setAttribute('aria-current', 'page');
      } else {
        links[i].removeAttribute('aria-current');
      }
    }
    document.getElementById('langBtn').textContent = labels[lang].lang;
    var nav = document.querySelector('.nav');
    if (nav) nav.setAttribute('aria-label', lang === 'ar' ? 'الأقسام' : 'Sections');
  }

  function buildHome() {
    var copy = labels[lang];
    var hero = element('section', 'home-intro');
    var mark = element('div', 'home-mark');
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    circle.setAttribute('viewBox', '0 0 400 400');
    circle.setAttribute('aria-hidden', 'true');
    circle.classList.add('blot');
    var shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    shape.setAttribute('cx', '200');
    shape.setAttribute('cy', '200');
    shape.setAttribute('r', '190');
    shape.setAttribute('fill', 'currentColor');
    circle.appendChild(shape);
    mark.appendChild(circle);
    mark.appendChild(element('h1', 'name', copy.name));
    mark.appendChild(element('p', 'tagline', copy.tagline));
    mark.appendChild(element('p', 'intro', copy.intro));
    hero.appendChild(mark);
    main.appendChild(hero);

    var grid = element('section', 'shelf-grid');
    grid.id = 'shelves';
    grid.setAttribute('aria-label', lang === 'ar' ? 'الأقسام' : 'Sections');
    sections.forEach(function (section, index) {
      var card = element('a', 'shelf-card');
      card.href = section.id + '.html';
      card.appendChild(element('span', 'shelf-number', String(index + 1).padStart(2, '0')));
      var content = element('div', 'shelf-card-copy');
      content.appendChild(element('h2', '', section[lang].title));
      content.appendChild(element('span', 'section-translation', section[lang].subtitle));
      content.appendChild(element('p', '', section[lang].description));
      card.appendChild(content);
      var footer = element('div', 'shelf-count');
      var count = pieces.filter(function (piece) { return piece.shelf === section.id; }).length;
      var countLabel = lang === 'ar'
        ? (count === 2 ? 'نصّان' : String(count).replace(/\d/g, function (digit) { return '٠١٢٣٤٥٦٧٨٩'[digit]; }) + ' نصوص')
        : count + ' ' + copy.pieces;
      footer.appendChild(element('span', '', section.id === 'hamish' ? copy.reflection : countLabel));
      footer.appendChild(element('b', '', '↗'));
      card.appendChild(footer);
      grid.appendChild(card);
    });
    main.appendChild(grid);
    var footer = element('footer', 'home-footer');
    footer.textContent = lang === 'ar' ? 'وَمَا الكتابةُ إِلَّا أَثَرُ ما بَقِيَ' : 'Writing is only the trace of what remains.';
    main.appendChild(footer);
  }

  function buildEntry(piece) {
    var copy = piece[lang] || piece.ar;
    var article = element('article', 'entry-card');
    var text = element('div', 'entry-text');
    copy.lines.forEach(function (line) {
      if (Array.isArray(line)) {
        var bayt = element('div', 'bayt');
        line.forEach(function (half) { bayt.appendChild(element('span', 'half', half)); });
        text.appendChild(bayt);
      } else {
        text.appendChild(element('p', 'prose', line));
      }
    });
    article.appendChild(text);

    var ornament = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ornament.setAttribute('viewBox', '0 0 120 20');
    ornament.setAttribute('aria-hidden', 'true');
    ornament.classList.add('entry-orn');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M2 10 C22 10 30 3 44 3 S62 17 76 17 S98 10 118 10');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1');
    ornament.appendChild(path);
    article.appendChild(ornament);

    var byline = element('p', 'entry-byline');
    if (copy.author) byline.appendChild(element('span', '', copy.author));
    if (copy.source) byline.appendChild(element('small', '', copy.source));
    article.appendChild(byline);
    var button = element('button', 'tx copy', labels[lang].copy);
    button.type = 'button';
    button.addEventListener('click', function () { copyText(piece); });
    article.appendChild(button);
    return article;
  }

  function buildHamish(section) {
    var copy = labels[lang];
    main.appendChild(buildSectionHeading(section));

    var openMargin = element('div', 'empty-shelf');
    openMargin.appendChild(element('p', '', copy.empty));
    main.appendChild(openMargin);

    var form = element('form', 'note-form');
    var noteKey = 'midad-hamish-note';
    var label = element('label', '', copy.notePrompt);
    label.htmlFor = 'marginNote';
    var textarea = element('textarea');
    textarea.id = 'marginNote';
    textarea.name = 'note';
    textarea.placeholder = copy.notePlaceholder;
    var status = element('p', 'note-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    var buttons = element('div', 'note-actions');
    var save = element('button', 'tx', copy.save);
    save.type = 'submit';
    var clear = element('button', 'tx', copy.clear);
    clear.type = 'button';
    var privacy = element('p', 'privacy-note', copy.privacy);
    buttons.appendChild(save);
    buttons.appendChild(clear);
    form.appendChild(label);
    form.appendChild(textarea);
    form.appendChild(buttons);
    form.appendChild(status);
    form.appendChild(privacy);
    main.appendChild(form);

    try {
      textarea.value = localStorage.getItem(noteKey) || '';
    } catch (error) {
      status.textContent = copy.noteFail;
    }
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var note = textarea.value.trim();
      if (!note) {
        status.textContent = copy.noteEmpty;
        return;
      }
      try {
        localStorage.setItem(noteKey, note);
        status.textContent = copy.noteSaved;
      } catch (error) {
        status.textContent = copy.noteFail;
      }
    });
    clear.addEventListener('click', function () {
      try {
        localStorage.removeItem(noteKey);
        textarea.value = '';
        status.textContent = copy.noteCleared;
      } catch (error) {
        status.textContent = copy.noteFail;
      }
    });
  }

  function buildSectionPage() {
    var section = getSection(body.getAttribute('data-section'));
    if (!section) {
      main.appendChild(element('p', '', labels[lang].back));
      return;
    }
    document.title = section[lang].title + ' · ' + labels[lang].name;
    var sectionPieces = pieces.filter(function (piece) { return piece.shelf === section.id; });
    if (section.id === 'hamish') {
      buildHamish(section);
    } else {
      main.appendChild(buildSectionHeading(section));
      var list = element('ol', 'entries');
      sectionPieces.forEach(function (piece) {
        var item = element('li');
        item.appendChild(buildEntry(piece));
        list.appendChild(item);
      });
      main.appendChild(list);
    }

    var navigation = element('nav', 'page-nav');
    navigation.setAttribute('aria-label', lang === 'ar' ? 'التنقّل بين الأقسام' : 'Section navigation');
    navigation.appendChild(link('index.html', labels[lang].back));
    sections.forEach(function (item) {
      var itemLink = link(item.id + '.html', item[lang].title);
      if (item.id === section.id) itemLink.setAttribute('aria-current', 'page');
      navigation.appendChild(itemLink);
    });
    main.appendChild(navigation);
  }

  function buildSectionHeading(section) {
    var heading = element('header', 'section-heading');
    heading.appendChild(element('h1', '', section[lang].title));
    heading.appendChild(element('span', 'section-translation', section[lang].subtitle));
    heading.appendChild(element('p', '', section[lang].description));
    return heading;
  }

  function link(href, text) {
    var anchor = element('a', '', text);
    anchor.href = href;
    return anchor;
  }

  function render() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    buildHeader();
    main.textContent = '';
    if (body.getAttribute('data-page') === 'home') {
      document.title = labels[lang].name;
      buildHome();
    } else {
      buildSectionPage();
    }
  }

  function copyText(piece) {
    var copy = piece[lang] || piece.ar;
    var separator = lang === 'ar' ? '   ' : '  /  ';
    var text = copy.lines.map(function (line) {
      return Array.isArray(line) ? line.join(separator) : line;
    }).join('\n');
    if (copy.author) text += '\n' + copy.author;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(labels[lang].copied);
      }, function () {
        showToast(labels[lang].copyFail);
      });
      return;
    }
    var fallback = element('textarea');
    fallback.value = text;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    fallback.remove();
    showToast(labels[lang][copied ? 'copied' : 'copyFail']);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1600);
  }

  document.getElementById('langBtn').addEventListener('click', function () {
    lang = lang === 'ar' ? 'en' : 'ar';
    try {
      localStorage.setItem('midad-lang', lang);
    } catch (error) {
      // Keep the selected language for the current page even without storage.
    }
    render();
  });

  render();
})();
