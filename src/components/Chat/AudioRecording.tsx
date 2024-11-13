"use client";
import { Icons } from "..";
import { IconButton } from "@mui/material";
import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";

export const AudioRecording = () => {
	const [wavesurfer, setWavesurfer] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);

	const onReady = (ws: unknown) => {
		setWavesurfer(ws);
		setIsPlaying(false);
	};

	const onPlayPause = () => {
		if (wavesurfer) {
			wavesurfer.playPause();
		}
	};

	const duration = wavesurfer?.media.duration;

	const getTimeText = (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};
	return (
		<>
			<IconButton
				onClick={onPlayPause}
				aria-label="play"
				className={`p-0 transition-opacity duration-500 ${
					!wavesurfer ? "opacity-0" : ""
				}`}>
				{isPlaying ? <Icons.PauseCircle /> : <Icons.PlayCircle />}
			</IconButton>

			{!wavesurfer ? (
				<div className="w-[100px] flex justify-center">
					<Icons.Loading className="text-dark-secondary" />
				</div>
			) : null}
			<div
				className={`transition-opacity duration-500 ${
					!wavesurfer ? "opacity-0 absolute" : ""
				}`}>
				<WavesurferPlayer
					dragToSeek
					onAudioprocess={() =>
						setCurrentTime(Math.floor(wavesurfer.media.currentTime))
					}
					width={100}
					height={30}
					waveColor="#d1d5db"
					progressColor={"#007BFF"}
					barWidth={4}
					barRadius={999}
					barGap={4}
					url="/la-cucaracha.mp3"
					onReady={onReady}
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
				/>
			</div>

			<span
				className={`text-sm font-medium flex w-[25px] transition-opacity duration-500 ${
					!wavesurfer ? "opacity-0" : ""
				}`}>
				{isPlaying ? getTimeText(currentTime) : getTimeText(duration)}
			</span>
		</>
	);
};
