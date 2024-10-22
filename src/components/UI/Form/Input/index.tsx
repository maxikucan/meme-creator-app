import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

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

			<input {...htmlProps} className={styles.input} />
		</div>
	);
}
