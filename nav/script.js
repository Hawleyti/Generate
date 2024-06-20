document.addEventListener("DOMContentLoaded", function() {
	// 加载默认的图片内容
	loadImages("all");

	// 点击按钮时加载对应的图片内容
	var btns = document.getElementsByClassName("btn");
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function() {
			var filter = this.getAttribute("data-filter");
			loadImages(filter);
		});
	}
});

function loadImages(filter) {
	// 清空图片容器
	var imageContainer = document.getElementById("imageContainer");
	imageContainer.innerHTML = "";

	// 加载对应的图片内容
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			imageContainer.innerHTML = this.responseText;
		}
	};
	xhr.open("GET", filter + ".html", true);
	xhr.send();
}

function showModal(event) {
	// 显示模态框
	// ...
}

function closeModal() {
	// 关闭模态框
	// ...
}

