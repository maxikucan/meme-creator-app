import { useEffect, useMemo, useState } from 'react';
import { useModal, Meme, Spinner } from '@/components/UI/';
import { IMeme, IMemesResponse } from '@/interfaces/meme';
import { useFetch } from '@/hooks';
import { Header } from './Header';
import { MemeCreatorModal } from './MemeCreatorModal';
import styles from './App.module.scss';

export function App() {
	const [memes, setMemes] = useState<IMeme[]>([]);
	const [filterText, setFilterText] = useState('');
	const [selectedMeme, setSelectedMeme] = useState<IMeme | null>(null);
	const { Modal, openModal } = useModal();

	const filteredMemes = useMemo(() => {
		return filterText ? memes.filter(meme => meme.name.toLowerCase().includes(filterText.toLowerCase())) : memes;
	}, [filterText, memes]);

	const { data, fetchData, isLoading, error } = useFetch<IMemesResponse>('GET', '/get_memes');

	useEffect(() => {
		const abortController = new AbortController();

		if (!data) {
			/* This API requires the data with this specific fetch config */
			fetchData({
				fetchConfigOverride: {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					signal: abortController.signal
				}
			});
		}

		if (data) {
			setMemes(data?.data.memes);
		}

		return () => abortController.abort();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, memes.length, data]);

	return (
		<>
			<Header onSearchBarChange={e => setFilterText(e.target.value)} />

			<main>
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Spinner />
					</div>
				) : !!error || (!isLoading && !data) ? (
					<p style={{ textAlign: 'center', color: 'red' }}>Something went wrong, please refresh your browser or try again later.</p>
				) : (
					<section className={styles.memesListContainer}>
						{filteredMemes.map(meme => (
							<Meme
								key={meme.id}
								{...meme}
								memes={memes}
								selectedMeme={selectedMeme}
								setSelectedMeme={setSelectedMeme}
								onClick={() => {
									openModal();
								}}
							/>
						))}
					</section>
				)}
			</main>

			<Modal title="Create meme" scrollable>
				<MemeCreatorModal {...selectedMeme} />
			</Modal>
		</>
	);
}
