import { Dispatch, SetStateAction } from 'react';
import { IMeme } from '../../../interfaces/meme';
import styles from './Meme.module.scss';

interface MemeProps extends IMeme {
	memes: IMeme[];
	selectedMeme: IMeme | null;
	setSelectedMeme: Dispatch<SetStateAction<IMeme | null>>;
	onClick?: () => void;
}

export function Meme(props: MemeProps) {
	return (
		<div
			className={styles.memeContainer}
			key={props.id}
			onClick={() => {
				props.setSelectedMeme(props);
				props.onClick?.();
			}}>
			<img src={props.url} alt={props.name} style={{ maxWidth: '250px', border: 'solid 1px #000', borderRadius: '8px' }} />

			<h3 className={styles.title}>{props.name}</h3>
		</div>
	);
}
