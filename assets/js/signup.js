'use strict';

const $form = document.forms['registration'];
const $fullName = document.querySelector('#full-name');
const $age = document.querySelector('#age');
const $email = document.querySelector('#email');
const $username = document.querySelector('#username');
const $password = document.querySelector('#password');
const $send = document.querySelector('#send');
const error = document.querySelector('#error');

const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
$send.addEventListener('click', function() {
	let fullName = $fullName.value.trim();
	let age = $age.value.trim();
	let email = $email.value.trim();
	let username = $username.value.trim();
	let password = $password.value.trim();
	let issueCount = 0;

	let issues = 'The following issues must be corrected:\n';
	let valid = true;

	if (fullName === '') {
		issues += 'Your full name is required\n';
		valid = false;
		issueCount++;
		$fullName.classList.add('invalid');
	} else {
		if ($fullName.classList.contains('invalid'))
			$fullName.classList.remove('invalid');
	}

	if (age === '') {
		issues += 'Age field is empty\n';
		valid = false;
		issueCount++;
		$age.classList.add('invalid');
	} else {
		let ageInt = parseInt(age);
		if (isNaN(age) || ageInt < 13) {
			issues += 'Invalid age\n';
			valid = false;
			issueCount++;
			$age.classList.add('invalid');
		} else {
			if ($age.classList.contains('invalid'))
				$age.classList.remove('invalid');
		}
	}

	if (email === '') {
		issues += 'Email field is empty\n';
		valid = false;
		issueCount++;
		$email.classList.add('invalid');
	} else {
		if (!emailRegex.test(email)) {
			issues += 'Email is invalid\n';
			valid = false;
			issueCount++;
			$email.classList.add('invalid');
		} else {
			if ($email.classList.contains('invalid'))
				$email.classList.remove('invalid');
		}
	}
	
	if (username === '') {
		issues += 'Username field is empty\n';
		valid = false;
		issueCount++;
		$username.classList.add('invalid');
	} else {
		if ($username.classList.contains('invalid'))
			$username.classList.remove('invalid');
	}

	if (password.length < 10) {
		issues += 'Password must be at least 10 characters';
		valid = false;
		issueCount++;
		$password.classList.add('invalid');
	} else {
		if ($password.classList.contains('invalid'))
			$password.classList.remove('invalid');
	}

	if (!valid && issueCount > 4) {
		error.innerText = 'Please fill out all the fields.'
	} else if (!valid && issueCount <= 4) {
		error.innerText = issues;
	} else {
		localStorage.setItem(`${username}Name`, fullName);
		localStorage.setItem(username, username);
		localStorage.setItem(`${username}Password`, password);

		$fullName.value = '';
		$age.value = '';
		$email.value = '';
		$username.value = '';
		$password.value = '';
		error.innerText = 'Success! Redirecting...';

		setTimeout(() => window.location.assign('/Search-Engine-Website/index.html'), 1000);
	}
});
