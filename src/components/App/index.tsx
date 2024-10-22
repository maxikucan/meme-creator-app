import { useMemo, useState } from 'react';
import { memesMock } from '@/mocks/memes';
import { useModal, Meme, Input } from '@/components/UI/';
import { IMeme } from '@/interfaces/meme';
import { MemeCreatorModal } from './MemeCreatorModal';
import styles from './App.module.scss';

export function App() {
	const [memes] = useState<IMeme[]>(memesMock);
	const [filterText, setFilterText] = useState('');
	const [selectedMeme, setSelectedMeme] = useState<IMeme | null>(null);
	const { Modal, openModal } = useModal();

	const filteredMemes = useMemo(() => {
		return filterText ? memes.filter(meme => meme.name.toLowerCase().includes(filterText.toLowerCase())) : memes;
	}, [filterText]);

	/* const { data, fetchData, isLoading, error } = useFetch<IMemesResponse>("GET", "/get_memes"); */
	/* const { data, fetchData } = useFetch<any>("POST", "/caption_image", {
		template_id: "181913649",
		username: import.meta.env.VITE_API_USERNAME,
		password: import.meta.env.VITE_API_PASSWORD,
		text0: "Hello",
		text1: "World",
	}); */

	/* useEffect(() => {
		if (!memes.length && !error) {
			fetchData();
		}

		if (data) {
			setMemes(data?.data.memes);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, memes.length, data]); */

	return (
		<>
			<main>
				<h1 className={styles.title}>Meme creator</h1>

				<form onSubmit={e => e.preventDefault()} className={styles.search}>
					<Input placeholder="Search for a meme template..." onChange={e => setFilterText(e.target.value)} />
				</form>

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
			</main>

			<Modal title="Create meme">
				<MemeCreatorModal {...selectedMeme} />
			</Modal>
		</>
	);
}
