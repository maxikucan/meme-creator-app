import { MappedStyles } from '@/styles/utils/mapped-styles';
import styles from './Spinner.module.scss';

type TSpinnerSize = 'small' | 'medium' | 'large';

interface SpinnerProps {
	size?: TSpinnerSize;
}

export function Spinner(props: SpinnerProps) {
	function getSpinnerSize() {
		return {
			'--spinner-size': props.size === 'small' ? '12px' : props.size === 'large' ? '48px' : '20px'
		} as MappedStyles;
	}

	return <span className={styles.loader} style={getSpinnerSize()}></span>;
}
