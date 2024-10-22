import { useRef, useState } from 'react';
import styles from './Modal.module.scss';

interface BaseModalProps {
	title?: string;
	dontCloseClickingOutside?: boolean;
}

interface ModalProps extends BaseModalProps {
	close: () => void;
}

interface useModalPayload {
	openModal: () => void;
	closeModal: () => void;
	Modal: (props: React.PropsWithChildren<BaseModalProps>) => JSX.Element;
}

/**
 * The modal component
 */
export function Modal(props: React.PropsWithChildren<ModalProps>): JSX.Element {
	const contentRef = useRef<HTMLDivElement>(null);

	function handleClickOutsideContent(e: React.MouseEvent<HTMLElement>): void {
		if (!props.dontCloseClickingOutside) {
			if (!contentRef.current?.contains(e.target as HTMLElement)) {
				props.close();
			}
		}
	}

	return (
		<section className={styles.modal} onPointerDown={handleClickOutsideContent}>
			<div ref={contentRef} className={styles.wrapper}>
				<header className={styles.header}>
					<p>{props.title}</p>

					<button className={styles.closeBtn} onClick={() => props.close()}>
						<span>X</span>
					</button>
				</header>

				{props.children}
			</div>
		</section>
	);
}

/**
 * A hook to expose Modal configuration
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useModal(): useModalPayload {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return {
		openModal: () => setIsModalOpen(true),
		closeModal: () => setIsModalOpen(false),
		Modal: props =>
			isModalOpen ? (
				<Modal {...props} close={() => setIsModalOpen(false)}>
					{props.children}
				</Modal>
			) : (
				<></>
			)
	};
}
