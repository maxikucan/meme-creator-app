import { ChangeEvent } from 'react';
import { Input } from '@/components/UI';
import styles from './Header.module.scss';

interface HeaderProps {
	onSearchBarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: HeaderProps) {
	return (
		<header className={styles.headerContainer}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
				<img src="/troll-transparent.png" style={{ width: '70px' }} />

				<h1>Meme Creator</h1>
			</div>

			<Input placeholder="Search for a meme template..." onChange={props.onSearchBarChange} className={styles.input} />
		</header>
	);
}
