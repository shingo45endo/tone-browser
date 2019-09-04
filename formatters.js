function sint7offset6(value) {
	const v = Number(value) - 64;
	return `${'-±+'[Math.sign(v) + 1]}${Math.abs(v)}`;
}

function mask7(value) {
	return value & 0x7f;
}

function sint8(value) {
	const bytes = new Uint8Array([value & 0xff]);
	const view = new DataView(bytes.buffer);
	return view.getInt8();
}

function panpot(value) {
	return sint7offset6(value).replace(/^-/u, 'L').replace(/^\+/u, 'R');
}

function panpotR(value) {
	return (value !== 0) ? panpot(value) : 'RND';
}

function noteName(value) {
	const octave = Math.trunc(value / 12) - 1;
	const name = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][value % 12];
	return `${name}${octave}`;
}

function noteNameR(value) {
	return noteName(value);
}

function noteNameY(value) {
	return noteName(value - 12);
}

function onOff(value) {
	return (value) ? 'On' : 'Off';
}

export const formatters = {
	sint7offset6, mask7, sint8, panpot, panpotR, noteNameR, noteNameY, onOff,
};
Object.freeze(formatters);
