// 添加和移除类
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }
  
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }
  
  // 处理按钮点击事件，添加 active 类，并加载对应的图片内容
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded");
    loadImages("all");
  
    var btnContainer = document.getElementById("myBtnContainer");
    btnContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("btn")) {
        var filter = event.target.getAttribute("data-filter");
        console.log("Filter selected: " + filter);
  
        // 移除所有按钮的 selected 类
        var btns = btnContainer.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
          btns[i].classList.remove("selected");
          btns[i].style.backgroundColor = ""; // 恢复默认背景色
        }
  
        // 添加 selected 类到点击的按钮
        event.target.classList.add("selected");
        event.target.style.backgroundColor = "lightgreen"; // 设置点击按钮的背景色
  
        loadImages(filter);
      }
    });
  });
  
  // 加载导航栏
  fetch('./nav/nav.html')
    .then(res => res.text())
    .then(text => {
      let oldelem = document.querySelector("script#replace_with_navbar");
      let newelem = document.createElement("div");
      newelem.innerHTML = text;
      oldelem.parentNode.replaceChild(newelem, oldelem);
    });
  
  // 滚动时隐藏和显示导航栏
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-90px";
    }
    prevScrollpos = currentScrollPos;
  }
  
  // 加载图片
  function loadImages(filter) {
    var imageContainer = document.getElementById("imageContainer");
    imageContainer.classList.remove("show");
    requestAnimationFrame(() => {
      imageContainer.innerHTML = "";
  
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Images loaded for filter: " + filter);
          imageContainer.innerHTML = this.responseText;
          requestAnimationFrame(() => {
            imageContainer.classList.add("show");
            document.querySelectorAll('.row .column .content img').forEach(img => {
              img.classList.add('loaded');
            });
          });
        }
      };
      xhr.open("GET", filter + ".html", true);
      xhr.send();
    });
  }
  
  // 显示模态框
  function showModal(event) {
    const contentDiv = event.target.closest('.content');
    if (contentDiv) {
      const imgSrc = contentDiv.querySelector('img').src;
      const describeText = contentDiv.querySelector('.describe').innerText;
  
      document.getElementById('modalImg').src = imgSrc;
      document.getElementById('modalText').innerText = describeText;
  
      document.getElementById('myModal').style.display = "flex";
      document.body.classList.add('modal-open');
      document.querySelector('#navbar').classList.add('hidden');
    }
  }
  
  // 关闭模态框
  function closeModal() {
    document.getElementById('myModal').style.display = "none";
    document.body.classList.remove('modal-open');
    document.querySelector('#navbar').classList.remove('hidden');
  }
  
  // 点击模态框外部关闭模态框
  window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
      closeModal();
    }
  }



  