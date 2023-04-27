'use strict'

//Variables: Modal
const modal = document.querySelector('#modal');
const blocker = document.querySelector('#blocker');
const exit = document.querySelector('#close');
const error = document.querySelector('#error');
const $login = document.forms['signin'];
const $username = document.forms['signin']['username'];
const $password = document.forms['signin']['password'];
const $send = document.forms['signin']['send'];

//Variables: Header
const signin = document.querySelector('#signin');
const translate = document.querySelector('#translate');
const videos = document.querySelector('#videos');
const account = document.querySelector('#account');
let loggedIn = false;
let isEnglish = true;

//Old username and password - referencing Transformers G1
// const user = 'spikewitwicky';
// const pass = 'morethanmeetstheeye';

//Variables: Search
const searchbar = document.querySelector('#search-bar');
const bing = document.getElementById('bing');
const google = document.getElementById('google');


//Modal: Activating and deactivating
blocker.addEventListener('click', function() {
	modal.classList.remove('visible');
});
exit.addEventListener('click', function() {
	modal.classList.remove('visible');
});

signin.addEventListener('click', function() {
	modal.classList.add('visible');
});

//Modal: Login
$send.addEventListener('click', function() {
	let valid = true;
	let username = $username.value.trim();
	let password = $password.value.trim();
	let issues = 'The following issues must be corrected:\n';
	let issueCount = 0;
	//Checking if username and/or password are empty
	if (username === '') {
		valid = false;
		issues += 'Empty username field\n';
		issueCount++;
		$username.classList.add('invalid');
	} else {
		let testUserName = localStorage.getItem(username);

		if (username != testUserName) {
			valid = false;
			issues += 'Invalid username\n';
			issueCount++;
			$username.classList.add('invalid');
		} else {
			if ($username.classList.contains('invalid'))
				$username.classList.remove('invalid');
		}
	}
	
	if (password === '') {
		valid = false;
		issues += 'Empty password field';
		issueCount++;
		$password.classList.add('invalid');
	} else {
		let testPassWord = localStorage.getItem(`${username}Password`)

		if (password != testPassWord) {
			valid = false;
			issues += 'Incorrect password';
			issueCount++;
			$password.classList.add('invalid');
		} else {
			if ($password.classList.contains('invalid'))
				$password.classList.remove('invalid');
		}
	}

	if(!valid && issueCount === 2) {
		error.innerText = 'Please fill out both fields correctly.'
	} else if (!valid && issueCount < 2) {
		error.innerText = issues;
	} else {
		bing.disabled = false;
		google.disabled = false;
		$username.value = '';
		$password.value = '';
		signin.innerHTML = `${localStorage.getItem(`${username}Name`)} <i class="far fa-user" id="user"></i>`;
		loggedIn = true;
		modal.classList.remove('visible');
	}
	
});

//Search

google.addEventListener('click', function() {
	let search = searchbar.value.trim();
	let searchQuery = 'https://google.com/search?q=' + search;
	if (search != '') {
		searchbar.value = '';
		window.location.assign(searchQuery);
	}
});

bing.addEventListener('click', function() {
	let search = searchbar.value.trim();
	let searchQuery = 'https://bing.com/search?q=' + search;
	if (search != '') {
		searchbar.value = '';
		window.location.assign(searchQuery);
	}
});

//Translating the page for authenticity
translate.addEventListener('click', function() {
	isEnglish = !isEnglish;
	if (isEnglish) {
		if (!loggedIn)
			signin.innerHTML = 'Sign In <i class="far fa-user" id="user"></i>';
		account.innerText = 'Create Account';
		videos.innerText = 'Videos';
		translate.innerText = 'Français';
		google.value = 'Search Google';
		bing.value = 'Search Bing';	
		searchbar.placeholder = 'Search';
	} else {
		if (!loggedIn)
			signin.innerHTML = 'Connexion <i class="far fa-user" id="user"></i>';
		account.innerText = 'Créer un compte';
		videos.innerText = 'Vidéos';
		translate.innerText = 'English';
		google.value = 'Recherche Google';
		bing.value = 'Recherche Bing';
		searchbar.placeholder = 'Recherche';	
	}
});