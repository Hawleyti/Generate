function openModal(img) { 
    var modal = document.getElementById("myModal"); var modalImg = document.getElementById("img01"); modal.style.display = "block"; modalImg.src = img.src; document.body.style.backgroundColor = "rgba(0,0,0,0.9)"; }

function closeModal() { var modal = document.getElementById("myModal"); modal.style.display = "none"; document.body.style.backgroundColor = "";  }

var closeBtn = document.getElementsByClassName("close")[0]; closeBtn.onclick = function() { closeModal(); }

window.onclick = function(event) { var modal = document.getElementById("myModal"); if (event.target == modal) { closeModal(); } }