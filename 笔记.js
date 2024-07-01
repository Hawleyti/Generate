// 同级目录下找文件
xhr.open("GET", filter + ".html", true);

// 如果你希望 HTML 文件分别在 box1、box2、boxa 文件夹中，你可以通过稍作调整来实现：
xhr.open("GET", "box" + filter.charAt(0) + ".html", true);


// 如果你希望代码能够在当前目录和 box1、box2、boxa 文件夹中找到 HTML 文件，可以使用以下方法来动态确定路径：
xhr.open("GET", filter + ".html", true);
xhr.onerror = function() {
    // 如果在当前目录找不到文件，则尝试在 box1、box2、boxa 文件夹中查找
    xhr.open("GET", "box" + filter.charAt(0) + "/" + filter + ".html", true);
};
xhr.send();

