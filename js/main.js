
var $avatarUrl = document.querySelector('.avatarUrl');
var $pfpPreview = document.querySelector('.pfp');

$avatarUrl.addEventListener('input', function (e) {
  $pfpPreview.setAttribute('src', e.target.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.username = $form.elements.username.value;
  data.profile.fullName = $form.elements.fullname.value;
  data.profile.location = $form.elements.location.value;
  data.profile.bio = $form.elements.bio.value;
  console.log('username: ', data.profile.username);
  console.log('full name: ', data.profile.fullName);
  console.log('location: ', data.profile.location);
  console.log('bio: ', data.profile.bio);

  $form.elements.avatarUrl.value = '';
  $form.elements.username.value = '';
  $form.elements.fullname.value = '';
  $form.elements.location.value = '';
  $form.elements.bio.value = '';
  $pfpPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
});
