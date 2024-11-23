interface DataObject {
	[key: string]: string;
}

export const createFormData = (data: DataObject) => {
	const formData = new FormData();

	for (const key in data) {
		formData.append(key, data[key]);
	}

	return formData;
};
