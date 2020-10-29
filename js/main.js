
var $avatarUrl = document.querySelector('.avatarUrl');
var $pfpPreview = document.querySelector('.pfp');

$avatarUrl.addEventListener('input', function (e) {
  $pfpPreview.setAttribute('src', e.target.value);
});

var $form = document.querySelector('form');
var previousEntries = localStorage.getItem('code-journal-local-storage');

if (previousEntries) {
  data = JSON.parse(previousEntries);
}

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.username = $form.elements.username.value.trim();
  data.profile.fullName = $form.elements.fullname.value;
  data.profile.location = $form.elements.location.value;
  data.profile.bio = $form.elements.bio.value;

  $form.reset();
  viewSwapping('profile');
});

window.addEventListener('beforeunload', function (e) {
  var stringData = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', stringData);
  // localStorage.clear();
});

document.addEventListener('DOMContentLoaded', function (e) {

  if (data.profile.username === '') {
    viewSwapping('edit-profile');
  } else {
    viewSwapping('profile');
  }
});

document.addEventListener('click', function (e) {
  // console.log('click: ', e.target);
  if (!e.target.hasAttribute('href')) {
    // console.log('you did not clicked a link');
    return;
  }

  viewSwapping(e.target.getAttribute('data-view'));

});

function profilePage(profileData) {
  var divRoot = document.createElement('div');
  divRoot.setAttribute('class', 'container');
  divRoot.setAttribute('id', 'user-page');

  var row1 = document.createElement('div');
  row1.setAttribute('class', 'row header-text-page');

  var row1Column1 = document.createElement('div');
  row1Column1.setAttribute('class', 'column-half');

  var r1c1P = document.createElement('p');
  r1c1P.setAttribute('class', 'profile-name');
  r1c1P.textContent = profileData.fullName;

  row1Column1.appendChild(r1c1P);
  row1.appendChild(row1Column1);
  divRoot.appendChild(row1);

  var row2 = document.createElement('div');
  row2.setAttribute('class', 'row');

  var row2Column1 = document.createElement('div');
  row2Column1.setAttribute('class', 'column-half');

  var pfpDiv = document.createElement('div');
  pfpDiv.setAttribute('class', 'pfp-preview');

  var pfpImage = document.createElement('img');
  pfpImage.setAttribute('src', profileData.avatarUrl);
  pfpImage.setAttribute('class', 'pfp');

  pfpDiv.appendChild(pfpImage);
  row2Column1.appendChild(pfpDiv);
  row2.appendChild(row2Column1);

  var row2Column2 = document.createElement('div');
  row2Column2.setAttribute('class', 'info column-half');

  var noClassDiv = document.createElement('div');

  var userNameInfo = document.createElement('div');
  userNameInfo.setAttribute('class', 'user-profile-info');

  var genericUserIcon = document.createElement('img');
  genericUserIcon.setAttribute('src', 'images/person-icon.png');
  genericUserIcon.setAttribute('class', 'icons');

  var userName = document.createElement('p');
  userName.textContent = profileData.username;

  var userLocationInfo = document.createElement('div');
  userLocationInfo.setAttribute('class', 'user-profile-info');

  var genericLocationIcon = document.createElement('img');
  genericLocationIcon.setAttribute('src', 'images/location-icon.png');
  genericLocationIcon.setAttribute('class', 'icons');

  var userLocation = document.createElement('p');
  userLocation.textContent = profileData.location;

  var userBiosInfo = document.createElement('div');
  var biosP = document.createElement('p');
  biosP.textContent = profileData.bio;

  userNameInfo.appendChild(genericUserIcon);
  userNameInfo.appendChild(userName);

  userLocationInfo.appendChild(genericLocationIcon);
  userLocationInfo.appendChild(userLocation);

  userBiosInfo.appendChild(biosP);

  noClassDiv.appendChild(userNameInfo);
  noClassDiv.appendChild(userLocationInfo);
  noClassDiv.appendChild(userBiosInfo);

  row2Column2.appendChild(noClassDiv);
  row2.appendChild(row2Column2);

  divRoot.appendChild(row2);

  var row3 = document.createElement('div');
  row3.setAttribute('class', 'button-placement');

  var row3Column1 = document.createElement('div');
  row3Column1.setAttribute('class', 'column-half');

  var linkButton = document.createElement('a');
  linkButton.setAttribute('class', 'edit-profile-link');
  linkButton.setAttribute('href', '#');
  linkButton.setAttribute('data-view', 'edit-profile');
  linkButton.textContent = 'EDIT';

  row3Column1.appendChild(linkButton);
  row3.appendChild(row3Column1);

  divRoot.appendChild(row3);
  return divRoot;
}

var allDataView = document.querySelectorAll('[data-view]');

function viewSwapping(dataView) {
  for (var i = 0; i < allDataView.length; i++) {
    if (allDataView[i].getAttribute('data-view') !== dataView) {
      allDataView[i].className = 'hide';
    } else {
      allDataView[i].className = 'show';

      if (allDataView[i].getAttribute('data-view') === 'profile') {
        if (allDataView[i].hasChildNodes()) {
          var previousUserEntryPage = document.querySelector('#user-page');

          allDataView[i].removeChild(previousUserEntryPage);
        }

        allDataView[i].appendChild(profilePage(data.profile));

      } else {
        $form.elements.avatarUrl.value = data.profile.avatarUrl;
        $form.elements.username.value = data.profile.username;
        $form.elements.fullname.value = data.profile.fullName;
        $form.elements.location.value = data.profile.location;
        $form.elements.bio.value = data.profile.bio;
      }
    }
  }
}
