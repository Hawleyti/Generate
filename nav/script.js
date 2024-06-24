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

