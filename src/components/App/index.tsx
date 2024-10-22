import { useEffect, useMemo, useState } from 'react';
import { useModal, Meme, Input } from '@/components/UI/';
import { IMeme, IMemesResponse } from '@/interfaces/meme';
import { MemeCreatorModal } from './MemeCreatorModal';
import styles from './App.module.scss';
import { useFetch } from '@/hooks';

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
		if (!memes.length && !error) {
			fetchData();
		}

		if (data) {
			setMemes(data?.data.memes);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, memes.length, data]);

	return (
		<>
			<main>
				<h1 className={styles.title}>Meme Creator</h1>

				<form onSubmit={e => e.preventDefault()} className={styles.search}>
					<Input placeholder="Search for a meme template..." onChange={e => setFilterText(e.target.value)} />
				</form>

				{isLoading ? (
					<p>Loading...</p>
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

			<Modal title="Create meme">
				<MemeCreatorModal {...selectedMeme} />
			</Modal>
		</>
	);
}
