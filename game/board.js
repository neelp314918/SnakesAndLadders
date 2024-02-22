const gridContainer = document.getElementById("grid-container");
for (let i = 7; i > 0; i--) {
	const RowDiv = document.createElement("div");
	RowDiv.classList.add(`row`);
	RowDiv.classList.add(`row-${i}`);
	gridContainer.appendChild(RowDiv);
	for (let j = 7; j > 0; j--) {
		const gridItem = document.createElement("div");
		gridItem.classList.add("grid-item");
		gridItem.classList.add(`cell-${i * 7 - (7 - j)}`);
		gridItem.textContent = `${i * 7 - (7 - j)}`;
		RowDiv.appendChild(gridItem);
	}
}
