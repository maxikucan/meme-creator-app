import { Meme } from "../../UI/Meme";
import { memesMock } from "../../../mocks/memes";
import { IMeme } from "../../../interfaces/meme";
import { useState } from "react";
import { useModal } from "../../UI/Modal";
import { MemeCreatorModal } from "./MemeCreatorModal";
import styles from "./Home.module.scss";

export function Home() {
	const [memes] = useState<IMeme[]>(memesMock);
	const [selectedMeme, setSelectedMeme] = useState<IMeme | null>(null);
	const { Modal, openModal } = useModal();

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

				<section className={styles.memesListContainer}>
					{memes.map((meme) => (
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
