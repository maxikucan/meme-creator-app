import { useEffect, useState } from "react";
import { useFetch } from "../../hooks";
import { IMeme, IMemesResponse } from "../../interfaces/meme";
import { Meme } from "../Meme";
import styles from "./App.module.scss";

export function App() {
	const [memes, setMemes] = useState<IMeme[]>([]);
	const { data, fetchData } = useFetch<IMemesResponse>("GET", "/get_memes");

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!memes.length && data) {
			setMemes(data?.data.memes);
		}
	}, [data, memes.length]);

	return (
		<main>
			<h1>Meme creator</h1>

			<section className={styles.memesListContainer}>
				{memes.map((meme) => (
					<Meme key={meme.id} {...meme} />
				))}
			</section>
		</main>
	);
}
