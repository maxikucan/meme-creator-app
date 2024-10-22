import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { className } from '@/helpers/className';
import styles from './Button.module.scss';
import { Spinner } from '../../Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
	const { isLoading, ...htmlProps } = props;

	return (
		<button {...htmlProps} {...className(props.className, styles.button)}>
			{isLoading ? <Spinner /> : props.children}
		</button>
	);
}
