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

// 懒加载函数
function initLazyLoad() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  console.log('Loading image:', lazyImage.dataset.src);
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
              }
          });
      });

      lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
      });
  } else {
      // Fallback for browsers that do not support IntersectionObserver
      let lazyLoad = function() {
          let active = false;

          if (active === false) {
              active = true;

              setTimeout(function() {
                  lazyImages.forEach(function(lazyImage) {
                      if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                          console.log('Loading image:', lazyImage.dataset.src);
                          lazyImage.src = lazyImage.dataset.src;
                          lazyImage.classList.remove("lazy");

                          lazyImages = lazyImages.filter(function(image) {
                              return image !== lazyImage;
                          });

                          if (lazyImages.length === 0) {
                              document.removeEventListener("scroll", lazyLoad);
                              window.removeEventListener("resize", lazyLoad);
                              window.removeEventListener("orientationchange", lazyLoad);
                          }
                      }
                  });

                  active = false;
              }, 200);
          }
      };

      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
  }
}

// 处理按钮点击事件，添加 active 类，并加载对应的图片内容
document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded");
  
    // 定义默认加载的文件列表
    var defaultFiles = ["Meaning_illustration_1", "animal_1", "architecture_1"];
    
    // 尝试加载默认文件
    loadDefaultImages(defaultFiles);
  
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
  
    initLazyLoad(); // 初始化懒加载
  });
  
  // 尝试按顺序加载默认文件
  function loadDefaultImages(files) {
    for (var i = 0; i < files.length; i++) {
      try {
        loadImages(files[i]);
        console.log("Loaded: " + files[i]);
        break; // 如果加载成功，退出循环
      } catch (error) {
        console.log("Failed to load: " + files[i] + ". Trying next file.");
      }
    }
  }
  
  // 假设 loadImages 函数已经定义
  function loadImages(filter) {
    // 加载图像的逻辑
    console.log("Loading images with filter: " + filter);
  }
  
  // 假设 initLazyLoad 函数已经定义
  function initLazyLoad() {
    // 懒加载初始化的逻辑
    console.log("Lazy load initialized");
  }
  

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
                  initLazyLoad(); // 初始化懒加载
              });
          }
      };
      xhr.open("GET", "vocabulary/" + filter + ".html", true);
    //   xhr.open("GET", filter + ".html", true);
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
