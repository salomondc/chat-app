"use client";
import { chatData } from "../../chat/[slug]/chatData";
import { ChatResponse } from "./ChatResponse";
import { ChatQuestion } from "./ChatQuestion";
import { Icons } from "..";
import { IconButton } from "@mui/material";
import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";

export const ChatMessages: React.FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className="flex flex-col gap-2 m-5 w-full">
			{chatData[Number(slug) as keyof typeof chatData].messages.map(
				(message) => {
					switch (message.author) {
						case "user":
							return (
								<ChatQuestion
									key={message.text}
									text={message.text}
									time={message.time}
								/>
							);
						case "bot":
							return (
								<ChatResponse
									key={message.text}
									text={message.text}
									time={message.time}
								/>
							);
					}
				}
			)}
			<div className="flex flex-col ml-auto gap-1">
				<div className="bg-gray-100 px-3 py-2 rounded-xl max-w-3xl flex items-center gap-2">
					<AudioRecording />
				</div>
				<div className="ml-auto text-sm text-dark-secondary">23:59</div>
			</div>
		</div>
	);
};

const AudioRecording = () => {
	const [wavesurfer, setWavesurfer] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);

	const onReady = (ws: unknown) => {
		setWavesurfer(ws);
		setIsPlaying(false);
	};

	const onPlayPause = () => {
		wavesurfer && wavesurfer.playPause();
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
