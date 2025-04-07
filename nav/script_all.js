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

    // 获取所有按钮容器
    var btnContainers = document.querySelectorAll("[id^='myBtnContainer']");

    btnContainers.forEach(function(btnContainer) {
        var defaultBtn = btnContainer.querySelector("button[data-default='true']");

        if (defaultBtn) {
            var filter = defaultBtn.getAttribute("data-filter");
            console.log("Default filter selected in " + btnContainer.id + ": " + filter);

            // 加载默认按钮对应的图片内容
            loadImages(filter);
            defaultBtn.classList.add("selected");
            defaultBtn.style.backgroundColor = "lightgreen";
        }

        btnContainer.addEventListener("click", function(event) {
            if (event.target.classList.contains("btn")) {
                var filter = event.target.getAttribute("data-filter");
                console.log("Filter selected in " + btnContainer.id + ": " + filter);

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

    initLazyLoad(); // 初始化懒加载
});



// 计算 GitHub Pages 兼容路径
function getGithubFetchPath(file) {
    let basePath = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    return basePath + "/nav/" + file;
}

// 加载导航栏
document.addEventListener("DOMContentLoaded", function() {
    let navPath = "nav/nav.html"; // 直接访问 nav 目录下的 nav.html

    fetch(navPath)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.text();
        })
        .then(text => {
            let navContainer = document.querySelector("#replace_with_navbar");
            if (navContainer) {
                navContainer.innerHTML = text;
            } else {
                console.error("Error: #replace_with_navbar not found!");
            }
        })
        .catch(error => {
            console.error("Error loading nav.html:", error);
        });
});

// 加载 Character_Prayer.html
fetch(getGithubFetchPath('Character_Prayer.html'))
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_Character_Prayer");
        if (oldelem) {
            let newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem, oldelem);
        } else {
            console.error("Error: script#replace_with_Character_Prayer not found!");
        }
    })
    .catch(error => {
        console.error('Error fetching LordJesus.html:', error);
    });
// 加载 xiaoyuansu.html
fetch(getGithubFetchPath('xiaoyuansu.html'))
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_xiaoyuansu");
        if (oldelem) {
            let newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem, oldelem);
        } else {
            console.error("Error: script#replace_with_xiaoyuansu not found!");
        }
    })
    .catch(error => {
        console.error('Error fetching xiaoyuansu.html:', error);
    });

// 加载 figure_Style.html
fetch(getGithubFetchPath('figure_Style.html'))
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_figure_Style");
        if (oldelem) {
            let newelem = document.createElement("div");
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem, oldelem);
        } else {
            console.error("Error: script#replace_with_figure_Style not found!");
        }
    })
    .catch(error => {
        console.error('Error fetching figure_Style.html:', error);
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

        function loadFromPath(path) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve(this.responseText);
                        } else {
                            reject(this.status);
                        }
                    }
                };
                xhr.open("GET", path, true);
                xhr.send();
            });
        }

        // 尝试从两个路径加载文件
        var promises = [
            loadFromPath("vocabulary/" + filter + ".html"),
            loadFromPath("vocabulary/posite/" + filter + ".html"),
            loadFromPath("vocabulary/Jesus/" + filter + ".html"),
            loadFromPath("vocabulary/figure/" + filter + ".html"),
            loadFromPath("vocabulary/zainan/" + filter + ".html"),
            loadFromPath("vocabulary/FengJing/" + filter + ".html"),
            loadFromPath("vocabulary/dongwu/" + filter + ".html"),
            loadFromPath("vocabulary/dongwu/" + filter + ".html"),
            loadFromPath("vocabulary/yuyi/" + filter + ".html")
        ];

        Promise.any(promises)
            .then(response => {
                console.log("Images loaded for filter: " + filter);
                imageContainer.innerHTML = response;
                requestAnimationFrame(() => {
                    imageContainer.classList.add("show");
                    document.querySelectorAll('.row .column .content img').forEach(img => {
                        img.classList.add('loaded');
                    });
                    initLazyLoad(); // 初始化懒加载
                });
            })
            .catch(error => {
                console.error("Failed to load images for filter: " + filter, error);
            });
    });
}



// 模态框
let slideIndex = 0;

function showModal(event) {
    const contentDiv = event.target.closest('.content');
    if (contentDiv) {
        const imgSrc = contentDiv.querySelector('img').src;
        const boxImages = contentDiv.querySelectorAll('.box img');
        const describeElement = contentDiv.querySelector('.describe');

        // 获取所有图片，包括主图片和#box中的图片
        const allImages = [imgSrc, ...Array.from(boxImages).map(img => img.src)];

        // 动态生成模态框中的图片元素
        const modalImagesDiv = document.querySelector('.modal-images');
        modalImagesDiv.innerHTML = ''; // 清空现有图片元素
        allImages.forEach((src, i) => {
            if (src) {
                const img = document.createElement('img');
                img.src = src;
                img.style.display = i === 0 ? 'block' : 'none'; // 仅显示第一张图片
                modalImagesDiv.appendChild(img);
            }
        });

        // 更新缩略图列表
        const thumbnailContainer = document.querySelector('.thumbnail-container');
        thumbnailContainer.innerHTML = ''; // 清空现有缩略图
        allImages.forEach((src, i) => {
            if (src) {
                const thumbnail = document.createElement('img');
                thumbnail.className = 'thumbnail';
                thumbnail.src = src;
                thumbnail.style.width = '100px';
                thumbnail.onclick = function() { showImage(this); };
                thumbnailContainer.appendChild(thumbnail);
            }
        });

        // 设置描述文本或表格
        const modalText = document.getElementById('modalText');
        const modalTextTable = document.querySelector('.modalTextTable tbody');
        const modalTextsDiv = document.querySelector('.modal-texts');

        if (describeElement.tagName.toLowerCase() === 'p') {
            modalText.style.display = 'block';
            modalText.innerText = describeElement.innerText;
            modalTextTable.parentElement.style.display = 'none';
            modalTextsDiv.style.width = '320px'; // 设置宽度为320px
            modalTextsDiv.style.backgroundColor = 'rgba(252, 79, 79, 0.1)';
        } else if (describeElement.tagName.toLowerCase() === 'table') {
            modalText.style.display = 'none';
            modalTextTable.parentElement.style.display = 'table';
            modalTextTable.innerHTML = describeElement.innerHTML;
            modalTextsDiv.style.width = '350px'; // 设置宽度为400px
            modalTextsDiv.style.backgroundColor = 'rgba(203, 247, 255, 0.1)';
        }

        // 初始化幻灯片索引和显示幻灯片
        if (allImages.length > 1) {
            slideIndex = 0;
            showSlide(slideIndex);
            document.querySelector('.thumbnail-container').style.display = 'flex';
            document.querySelector('.prev').style.display = 'block'; // 显示左右按钮
            document.querySelector('.next').style.display = 'block'; // 显示左右按钮
        } else {
            document.querySelector('.thumbnail-container').style.display = 'none';
            document.querySelector('.prev').style.display = 'none';
            document.querySelector('.next').style.display = 'none';
        }

        // 显示模态框
        document.getElementById('myModal').style.display = "flex";
        document.body.classList.add('modal-open');
        document.querySelector('#navbar').classList.add('hidden');
    }
}

function showImage(thumbnail) {
    const src = thumbnail.src;
    const modalImages = document.querySelectorAll('.modal-images img');
    const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail');
    
    modalImages.forEach((img, i) => {
        if (img.src === src) {
            img.style.display = 'block';
            slideIndex = i;

            // Set the selected thumbnail as active
            thumbnails.forEach((thumb) => {
                if (thumb.src === src) {
                    thumb.style.opacity = '0.5'; // Adjust the opacity as needed
                    // thumb.style.filter = 'grayscale(100%)';
                    thumb.style.borderBottom = '5px solid red'; 
                } else {
                    thumb.style.opacity = '1'; // Reset opacity
                    thumb.style.filter = 'none'; // Reset grayscale
                    thumb.style.borderBottom = 'none'; // Reset grayscale
                }
            });
        } else {
            img.style.display = 'none';
        }
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.modal-images img');
    const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail');

    if (index >= slides.length) { slideIndex = 0; }
    if (index < 0) { slideIndex = slides.length - 1; }

    slides.forEach((slide, i) => {
        if (i === slideIndex) {
            slide.style.display = 'block';
            // Update the thumbnail styles
            thumbnails.forEach((thumb) => {
                if (thumb.src === slide.src) {
                    thumb.style.opacity = '0.5'; // Set selected thumbnail as active
                    // thumb.style.filter = 'grayscale(100%)'; 
                    thumb.style.borderBottom = '5px solid red'; 
                } else {
                    thumb.style.opacity = '1'; // Reset opacity
                    thumb.style.filter = 'none'; // Reset grayscale
                    thumb.style.borderBottom = 'none'; 
                }
            });
        } else {
            slide.style.display = 'none';
        }
    });
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
    document.body.classList.remove('modal-open');
    document.querySelector('#navbar').classList.remove('hidden');
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


  
  document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll("[id^='myBtnContainer']"); // 匹配所有以 "myBtnContainer" 开头的容器
    containers.forEach((container) => {
      const buttons = container.querySelectorAll(".btn.filter-btn");
      buttons.forEach((button, index) => {
        button.textContent = index + 1; // 动态设置序号，从 1 开始
      });
    });
  });
  
// 控制首页分页区
document.addEventListener("DOMContentLoaded", function () {
    const btnContainers = document.querySelectorAll("#myBtnContainer, #myBtnContainer2"); 
    const pageButtons = btnContainers[0].querySelectorAll(".filter-btn");
    const prevButtons = document.querySelectorAll(".prevPage");
    const nextButtons = document.querySelectorAll(".nextPage");

    let currentIndex = 0; // 追踪当前页索引
    const maxVisible = 5; // 只显示5个分页按钮

    function updatePagination() {
        pageButtons.forEach((btn, index) => {
            if (index >= currentIndex && index < currentIndex + maxVisible) {
                btn.style.display = "inline-block";
            } else {
                btn.style.display = "none";
            }
        });

        // 同步两个分页栏
        btnContainers.forEach(container => {
            const buttons = container.querySelectorAll(".filter-btn");
            buttons.forEach((btn, index) => {
                btn.style.display = index >= currentIndex && index < currentIndex + maxVisible ? "inline-block" : "none";
            });
        });
    }

    prevButtons.forEach(prev => {
        prev.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
                updatePagination();
            }
        });
    });

    nextButtons.forEach(next => {
        next.addEventListener("click", function () {
            if (currentIndex + maxVisible < pageButtons.length) {
                currentIndex++;
                updatePagination();
            }
        });
    });

    updatePagination(); // 初始化分页显示
});
  