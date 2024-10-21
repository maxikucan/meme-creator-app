export interface IMemesResponse {
	success: boolean;
	data: {
		memes: IMeme[];
	};
}

export interface IMeme {
	id: string;
	name: string;
	url: string;
	width: number;
	height: number;
	box_count: number;
}
