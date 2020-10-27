
var $avatarUrl = document.querySelector('.avatarUrl');
var $pfpPreview = document.querySelector('.pfp');

$avatarUrl.addEventListener('input', function (e) {
  $pfpPreview.setAttribute('src', e.target.value);
});
