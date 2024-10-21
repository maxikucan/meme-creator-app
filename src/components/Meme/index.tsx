import { IMeme } from "../../interfaces/meme";
import styles from "./Meme.module.scss";

interface MemeProps extends IMeme {}

export function Meme(props: MemeProps) {
	return (
		<div className={styles.memeContainer} key={props.id}>
			<img src={props.url} alt={props.name} style={{ maxWidth: "250px", border: "solid 1px #000", borderRadius: "8px" }} />

			<h3 className={styles.title}>{props.name}</h3>
		</div>
	);
}
