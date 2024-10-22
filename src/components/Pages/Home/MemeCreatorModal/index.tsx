import { useState } from "react";
import { useFetch } from "../../../../hooks";
import { IMeme, IMemeCreatedResponse, IMemePayload } from "../../../../interfaces/meme";
import { Button, Input } from "../../../UI";
import styles from "./MemeCreatorModal.module.scss";

interface MemeCreatorModalProps extends Partial<IMeme> {}

export function MemeCreatorModal(props: MemeCreatorModalProps) {
	const [textData, setTextData] = useState<{ [key: string]: string }>({});
	const { data, fetchData /* error, isLoading */ } = useFetch<IMemeCreatedResponse, IMemePayload>("POST", "/caption_image", {
		username: import.meta.env.VITE_API_USERNAME,
		password: import.meta.env.VITE_API_PASSWORD,
		template_id: props.id as string,
		text0: textData[0],
		text1: textData[1],
		text2: textData[2],
		text3: textData[3],
		text4: textData[4],
	});

	async function handleSubmit() {
		try {
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<form
				className={styles.formContainer}
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				{!data ? (
					<>
						{" "}
						<div className={styles.templateSection}>
							<label htmlFor="template" className={styles.label}>
								Template
							</label>

							<img src={props.url} alt={props.name} className={styles.img} />
						</div>
						{[...Array(props.box_count)].map((_, i) => (
							<div key={`input-box-key-${i}`} className={styles.inputSection}>
								<Input
									label={`Text ${i + 1}`}
									placeholder="Type something..."
									onChange={(e) => setTextData((prev) => ({ ...prev, [i]: e.target.value }))}
								/>
							</div>
						))}
						<Button type="submit">Create</Button>{" "}
					</>
				) : (
					<img src={data.data.url} alt={props.name} className={styles.imgResult} />
				)}
			</form>
		</>
	);
}
