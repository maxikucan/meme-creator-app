export interface IMemesResponse {
	success: boolean;
	data: {
		memes: IMeme[];
	};
}

export interface IMemeCreatedResponse {
	success: boolean;
	data: {
		url: string;
		page_url: string;
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

export interface IMemePayload {
	template_id: string;
	username: string;
	password: string;
	text0: string;
	text1: string;
	text2?: string;
	text3?: string;
	text4?: string;
	font?: string;
	max_font_size?: number;
	boxes?: Box[];
}

export interface Box {
	text: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	outline_color: string;
}
