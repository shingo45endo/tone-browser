import {html, render} from 'https://unpkg.com/lit-html?module';

const templateBody = (lists) => html`
	<!-- Navbar -->
	<nav class="navbar navbar-light bg-light sticky-top">
		<div class="container align-items-start">
			<h1 class="h5 mt-1 mb-0"><a href="./" class="navbar-brand">tone-browser</a></h1>
			<a href="#" class="btn btn-outline-primary py-1">Top</a>
		</div>
	</nav>

	<!-- Main screen -->
	<main class="container mt-2">
		<ul class="nav nav-tabs" role="tablist">
		${lists.map((list, i) => html`
			<li class="nav-item" role="presentation">
				<button id="my-tab-${list.id}" class="nav-item nav-link ${(i === 0) ? 'active' : ''}" role="tab" data-bs-toggle="tab" data-bs-target="#my-pane-${list.id}">${list.label}</button>
			</li>
		`)}
		</ul>
		<div class="tab-content mt-2">
		${lists.map((list, i) => html`
			<div id="my-pane-${list.id}" class="tab-pane fade ${(i === 0) ? 'show active' : ''}" role="tabpanel"></div>
		`)}
		</div>
	</main>

	<!-- Information modal -->
	<div id="my-modal" class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-dialog-scrollable modal-xl my-modal-fluid" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h2 id="my-modal-title" class="modal-title h6 text-black-50"></h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<div id="my-modal-content" class="container-fluid">
					</div>
				</div>
			</div>
		</div>
	</div>
`;

export function makeDomLoadedHandler(prop, bsGetOrCreateInstance) {
	console.assert(prop && Array.isArray(prop.lists) && prop.lists.every((e) => e.id && e.label && e.renderer));
	console.assert(prop && prop.details);
	console.assert(bsGetOrCreateInstance);

	return async () => {
		// Renders the body.
		document.body.innerHTML = '';
		render(templateBody(prop.lists), document.body);

		// Prepares for the modal.
		const elemModal = document.getElementById('my-modal');
		const elemModalTitle = document.getElementById('my-modal-title');
		const elemModalContent = document.getElementById('my-modal-content');
		const bsModal = bsGetOrCreateInstance(elemModal);

		// Shows the modal.
		bsModal.show();
		if (window.location.search.startsWith('?')) {
			elemModalContent.textContent = 'Loading...';
		} else {
			elemModalTitle.textContent = 'Error';
			elemModalContent.textContent = 'Invalid URL.';
			return;
		}

		// Loads a JSON file.
		const url = window.location.search.slice(1);
		const res = await fetch(url);
		if (!res.ok) {
			elemModalTitle.textContent = 'Error';
			elemModalContent.textContent = `"${url}" not found.`;
			return;
		}
		const json = await res.json();

		// Renders lists on each tab pane.
		for (const list of prop.lists) {
			render(list.renderer(json), document.getElementById(`my-pane-${list.id}`));
		}

		// Adds event handlers.
		window.addEventListener('hashchange', handleHashChange);
		elemModal.addEventListener('hide.bs.modal', () => {
			if (window.location.hash !== '' && window.history.length > 2) {
				window.history.back();
			} else {
				window.location.hash = '';
			}
		});

		// Moves to the initial state.
		elemModalContent.textContent = '';
		handleHashChange();

		function handleHashChange() {
			// Checks whether the current URL hash is a supported format or not.
			const m = window.location.hash.match(/^#\/(.*)\/(\d+)/u);
			if (!m) {
				bsModal.hide();
				return;
			}

			// Renders information on the modal according to the specified URL hash.
			const no = Number(m[2]);
			const id = m[1];
			if (prop.details[id]) {
				elemModalTitle.textContent = window.location.hash;
				render(prop.details[id](json[id][no], json), elemModalContent);
				bsModal.show();
			} else {
				bsModal.hide();
			}
		}
	};
}