import { useState } from 'react';
import { Button, Input } from '@/components/UI';
import { useFetch } from '@/hooks';
import { IMeme, IMemeCreatedResponse, IMemePayload } from '@/interfaces/meme';
import styles from './MemeCreatorModal.module.scss';

interface MemeCreatorModalProps extends Partial<IMeme> {}

export function MemeCreatorModal(props: MemeCreatorModalProps) {
	const [textData, setTextData] = useState<{ [key: string]: string }>({});
	const [error, setError] = useState<any>(null);
	const {
		data,
		fetchData,
		error: fetchError,
		isLoading
	} = useFetch<IMemeCreatedResponse, IMemePayload>('POST', '/caption_image', {
		username: import.meta.env.VITE_API_USERNAME,
		password: import.meta.env.VITE_API_PASSWORD,
		template_id: props.id as string,
		text0: textData[0],
		text1: textData[1],
		text2: textData[2],
		text3: textData[3],
		text4: textData[4]
	});

	async function handleSubmit() {
		if (!Object.keys(textData).length) {
			setError('Please complete all the texts before continue.');
			return;
		}

		await fetchData();

		if (fetchError) {
			setError(fetchError);
		}
	}

	return (
		<>
			<form
				className={styles.formContainer}
				onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}>
				{!data ? (
					<>
						<div className={styles.formDataSection}>
							<div className={styles.templateSection}>
								<label htmlFor="template" className={styles.label}>
									Template
								</label>

								<img src={props.url} alt={props.name} className={styles.img} />
							</div>

							<div className={styles.inputSection}>
								{[...Array(props.box_count)].map((_, i) => (
									<Input
										key={`input-box-key-${i}`}
										label={`Text ${i + 1}`}
										placeholder="Type something..."
										onChange={e => setTextData(prev => ({ ...prev, [i]: e.target.value }))}
									/>
								))}
							</div>
						</div>

						{error && <p style={{ color: 'red' }}>{error}</p>}

						<Button type="submit" isLoading={isLoading}>
							Create
						</Button>
					</>
				) : (
					<img src={data.data.url} alt={props.name} className={styles.imgResult} />
				)}
			</form>
		</>
	);
}
