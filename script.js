(function(){
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
