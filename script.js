(function(){
  // Hamburger menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('siteNav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu when a link is clicked (mobile UX)
    nav.addEventListener('click', function(e){
      if(e.target && e.target.tagName === 'A'){
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
    // Reset menu state when resized to desktop
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 720){
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }

  // Lightbox for gallery images
  var lb = document.getElementById('lightbox');
  var lbImg = lb ? lb.querySelector('img') : null;
  if(lb && lbImg){
    document.addEventListener('click', function(e){
      var target = e.target;
      if(target && target.matches('img[data-lightbox]')){
        lbImg.src = target.src;
        lb.classList.add('open');
        lb.setAttribute('aria-hidden','false');
      }
    });
    lb.addEventListener('click', function(){
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden','true');
      lbImg.removeAttribute('src');
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && lb.classList.contains('open')){
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden','true');
        lbImg.removeAttribute('src');
      }
    });
  }

  // Form validation (only on pages that have the form)
  var form = document.getElementById('entryForm');
  if(!form) return;

  function setError(name, msg){
    var el = document.querySelector('.error[data-for="'+name+'"]');
    if(el) el.textContent = msg || '';
  }

  function validate(){
    var valid = true;
    var name = document.getElementById('name');
    var gender = document.getElementById('gender');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var menu = document.getElementById('menu');
    var note = document.getElementById('note');

    setError('name'); setError('gender'); setError('phone'); setError('email'); setError('menu'); setError('note');

    if(!name.value.trim()){ setError('name','お名前を入力してください'); valid=false; }
    if(!gender.value){ setError('gender','性別を選択してください'); valid=false; }

    var tel = phone.value.replace(/[^0-9]/g,'');
    if(tel.length < 10){ setError('phone','有効な電話番号を入力してください'); valid=false; }

    var mail = email.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)){ setError('email','有効なメールアドレスを入力してください'); valid=false; }

    if(!menu.value){ setError('menu','希望メニューを選択してください'); valid=false; }
    if(!note.value.trim()){ setError('note','その他の欄に入力してください'); valid=false; }

    return valid;
  }

  form.addEventListener('submit', function(e){
    if(!validate()){
      e.preventDefault();
      return;
    }
    // バリデーションOK時は通常送信（FormSubmitへ）
  });
})();
