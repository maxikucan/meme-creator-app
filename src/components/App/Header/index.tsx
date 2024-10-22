import { ChangeEvent } from 'react';
import { Input } from '@/components/UI';
import styles from './Header.module.scss';

interface HeaderProps {
	onSearchBarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: HeaderProps) {
	return (
		<header className={styles.headerContainer}>
			<h1>Meme Creator</h1>

			<Input placeholder="Search for a meme template..." onChange={props.onSearchBarChange} className={styles.input} />
		</header>
	);
}
