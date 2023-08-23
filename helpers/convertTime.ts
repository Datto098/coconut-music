export const covertTimeFormat = (totalTime: number) => {
	let minutes = Math.floor(totalTime / 60);
	let seconds = Math.floor(totalTime % 60);
	if (seconds < 10) {
		return minutes + ':0' + seconds;
	}
	return minutes + ':' + seconds;
};
