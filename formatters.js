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
	const name = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][(value + 12) % 12];
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

function lfoWaveMU(value) {
	return {0: 'SAW', 1: 'TRI', 2: 'S&H'}[value] ?? '-';
}

function lfoWaveTG(value) {
	return {0: 'SAW+', 1: 'TRI+', 2: 'SQU+', 3: 'SAW-', 4: 'TRI-', 5: 'SQU-', 6: 'S&H'}[value] ?? '-';
}

function pitchScalingRateMU(value) {
	return `${{0: 100, 1: 50, 2: 20, 3: 10, 4: 5, 5: 0}[value] ?? '-'}%`;
}

function pitchEGDepthMU(value) {
	return {0: '1/2', 1: '1', 2: '2', 3: '4'}[value] ?? '-';
}

function tonePanMU(value) {
	return {0: 'L7', 1: 'L6', 2: 'L5', 3: 'L4', 4: 'L3', 5: 'L2', 6: 'L1', 7: '±0', 8: 'R1', 9: 'R2', 10: 'R3', 11: 'R4', 12: 'R5', 13: 'R6', 14: 'R7', 15: 'scaling'}[value] ?? '-';
}

export const formatters = {
	sint7offset6, mask7, sint8, panpot, panpotR, noteNameR, noteNameY, onOff,
	lfoWaveMU, lfoWaveTG, pitchScalingRateMU, pitchEGDepthMU, tonePanMU,
};
Object.freeze(formatters);
