import { useState } from 'react';
import { Button, Input } from '@/components/UI';
import { useFetch } from '@/hooks';
import { IMeme, IMemeCreatedResponse, IMemePayload } from '@/interfaces/meme';
import styles from './MemeCreatorModal.module.scss';

interface MemeCreatorModalProps extends Partial<IMeme> {}

export function MemeCreatorModal(props: MemeCreatorModalProps) {
	const [textData, setTextData] = useState<{ [key: string]: string }>({});
	const [error, setError] = useState<any>(null);

	const { data, fetchData, error: fetchError, isLoading } = useFetch<IMemeCreatedResponse, IMemePayload>('POST', '/caption_image');

	async function handleSubmit() {
		if (Object.keys(textData).length < props.box_count!) {
			setError('Please complete all the texts before continue.');
		}

		const payload: IMemePayload = {
			username: import.meta.env.VITE_API_USERNAME,
			password: import.meta.env.VITE_API_PASSWORD,
			template_id: props.id as string,
			max_font_size: 40,
			boxes: Object.values(textData).map(text => ({ text: text.toUpperCase() }))
		};

		/* This API requires the data with this specific fetch config */
		const formBody = Object.keys(payload)
			.map(key => {
				if (key === 'boxes') {
					return payload[key]!.map((box, index) => {
						return Object.keys(box)
							.map(boxKey => `boxes[${index}][${boxKey}]=${encodeURIComponent((box as any)[boxKey])}`)
							.join('&');
					}).join('&');
				}
				return `${encodeURIComponent(key)}=${encodeURIComponent((payload as any)[key])}`;
			})
			.join('&');

		await fetchData({
			fetchConfigOverride: {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: formBody
			}
		});

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
