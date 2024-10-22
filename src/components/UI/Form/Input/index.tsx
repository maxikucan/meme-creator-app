import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import { className } from '@/helpers/className';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export function Input(props: InputProps) {
	const { label, ...htmlProps } = props;

	return (
		<div className={styles.inputContainer}>
			{!!label && (
				<label htmlFor={htmlProps.id} className={styles.label}>
					{label}
				</label>
			)}

			<input {...htmlProps} {...className(props.className, styles.input)} />
		</div>
	);
}
