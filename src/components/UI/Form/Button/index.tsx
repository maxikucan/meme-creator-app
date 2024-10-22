import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: PropsWithChildren<ButtonProps>) {
	return (
		<button {...props} className={styles.button}>
			{props.children}
		</button>
	);
}
