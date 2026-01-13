function setScreen() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/* 높이 */
window.addEventListener('load', setScreen);
window.addEventListener('resize', setScreen);
window.addEventListener('orientationchange', setScreen);

/* 모달 열기 */
function openModal(modalSelector, popSelector) {
	const modal = document.querySelector(modalSelector);
	if (!modal) return;

	const pop = modal.querySelector(popSelector);
	if (!pop) return;

	pop.removeAttribute('style');
	modal.style.display = 'block';

	requestAnimationFrame(() => {
		modal.classList.add('active');
		pop.classList.add('active');
	});
}

document.querySelector('.q_btn') ?.addEventListener('click', () => {
	openModal('.modal_wrap', '.pop');
});

document.getElementById('checkbox2') ?.addEventListener('change', e => {
	if (e.target.checked) {
		openModal('.modal_wrap2', '.pop2');
	}
});

/* 드래그 모달 닫기 */
const POP_SELECTOR = '.pop, .pop2, .pop3';
const CLOSE_DISTANCE = 100;
const TRANSITION_TIME = 100;

document.querySelectorAll(POP_SELECTOR).forEach(pop => {
	let startY = 0;
	let currentY = 0;
	let isDragging = false;

	const modal = pop.closest('[class^="modal_wrap"]');

	function getClientY(e) {
		return e.touches ? e.touches[0].clientY : e.clientY;
	}

	function onMove(e) {
		if (!isDragging) return;

		currentY = getClientY(e);
		const deltaY = currentY - startY;

		if (deltaY > 0) {
			pop.style.transform = `translate(-50%, ${deltaY}px)`;
		}
	}

	function onEnd() {
		if (!isDragging) return;
		isDragging = false;

		const deltaY = currentY - startY;

		if (deltaY > CLOSE_DISTANCE) {
			modal ?.classList.remove('active');
			pop.classList.remove('active');

			setTimeout(() => {
				modal.style.display = 'none';
				pop.removeAttribute('style');
			}, TRANSITION_TIME);
		} else {
			pop.removeAttribute('style');
		}

		document.removeEventListener('mousemove', onMove);
		document.removeEventListener('mouseup', onEnd);
		document.removeEventListener('touchmove', onMove);
		document.removeEventListener('touchend', onEnd);
	}

	pop.addEventListener('mousedown', e => {
		isDragging = true;
		startY = getClientY(e);
		currentY = startY;

		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', onEnd);
	});

	pop.addEventListener('touchstart', e => {
		isDragging = true;
		startY = getClientY(e);
		currentY = startY;

		document.addEventListener('touchmove', onMove);
		document.addEventListener('touchend', onEnd);
	});
});

/* 클릭 닫기 */
document.querySelectorAll('.close_btn').forEach(btn => {
	btn.addEventListener('click', e => {
		const pop = e.target.closest('.pop, .pop2, .pop3');
		if (!pop) return;

		const modal = pop.closest('[class^="modal_wrap"]');
		if (!modal) return;

		modal.classList.remove('active');
		pop.classList.remove('active');

		setTimeout(() => {
			modal.style.display = 'none';
			pop.removeAttribute('style');
		}, TRANSITION_TIME);
	});
});

/* 딤 클릭 닫기 */
document.querySelectorAll('[class^="modal_wrap"]').forEach(modal => {
	modal.addEventListener('click', e => {

		if (e.target !== e.currentTarget) return;
		const pop = modal.querySelector('.pop.active, .pop2.active');
		if (!pop) return;

		modal.classList.remove('active');
		pop.classList.remove('active');

		setTimeout(() => {
			modal.style.display = 'none';
			pop.removeAttribute('style');
		}, TRANSITION_TIME);
	});
});

document.querySelectorAll('.pop, .pop2').forEach(pop => {
	pop.addEventListener('click', e => {
		e.stopPropagation();
	});
});

/* 파일 업로드 이름 표시 */
const userFile = document.getElementById('user_file');
const fileNameInput = document.querySelector('.file_name');

userFile?.addEventListener('change', function () {
  fileNameInput.value = this.files[0]?.name || '';
});

/* 테스트용 페이지 이동 */
document.querySelectorAll('.fish_group li').forEach(li => {
	li.addEventListener('click', e => {
		e.preventDefault();
		location.href = '../html/pufferfish_game2.html';
	});
});

document.querySelector('.next_btn') ?.addEventListener('click', e => {
	e.preventDefault();
	location.href = '../html/pufferfish_game1_1.html';
});

document.querySelector('.giveaway_btn') ?.addEventListener('click', e => {
	e.preventDefault();
	location.href = '../html/pufferfish_game_form.html';
});

/* 복어 클릭 게임 */
const fishBtn = document.querySelector('.fish_click');
const fishImg = document.querySelector('.fish_click img');
const tools = document.querySelectorAll('.tool');

if (fishBtn && fishImg) {
	const fishImages = [
		'../img/step-01-2@3x.png',
		'../img/step-02-2@3x.png',
		'../img/step-03-2@3x.png',
		'../img/step-04-2@3x.png',
		'../img/step-05-2@3x.png',
		'../img/step-06-2@3x.png',
		'../img/step-07-2@3x.png',
		'../img/step-08-2@3x.png',
		'../img/step-09-2@3x.png',
		'../img/step-10-2@3x.png',
		'../img/step-11-2@3x.png'
	];

	let step = 0;
	let isFinalReached = false;
	let isTransitioning = false;

	fishBtn.addEventListener('click', () => {
		/* 마지막 복어 클릭 */
		if (isFinalReached && !isTransitioning) {
			isTransitioning = true;

			tools.forEach(tool => tool.classList.add('hide'));

			fishImg.offsetWidth;
			fishImg.classList.add('zoom-out');
			fishBtn.style.pointerEvents = 'none';

			setTimeout(() => {
				location.href = './pufferfish_game3_2.html';
			}, 300);

			return;
		}

		/* 일반 단계 */
		if (step < fishImages.length - 1) {
			step++;
			fishImg.src = fishImages[step];

			fishImg.classList.remove('grow', 'zoom-out');
			fishImg.offsetWidth;
			fishImg.classList.add('grow');

			const toolIndex = Math.min(Math.floor(step / 3), tools.length - 1);
			tools.forEach(tool => tool.classList.remove('active'));
			tools[toolIndex] ?.classList.add('active');

			if (step === fishImages.length - 1) {
				isFinalReached = true;
			}
		}
	});
}