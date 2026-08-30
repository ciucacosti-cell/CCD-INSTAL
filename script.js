document.addEventListener("DOMContentLoaded", () => {
  const galerie = document.querySelectorAll('.grid-galerie img');
  const preview = document.getElementById('preview');
  const previewImg = document.getElementById('preview-img');

  galerie.forEach(img => {
    img.addEventListener('click', () => {
      previewImg.src = img.src;
      preview.classList.remove('hidden');
    });
  });

  preview.addEventListener('click', () => {
    preview.classList.add('hidden');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slideImg = document.getElementById("slide-img");

  // Lista cu imaginile tale
 const images = [
    "Poze lucrari/img1.jpeg",
    "Poze lucrari/img2.jpeg",
    "Poze lucrari/img3.jpeg",
    "Poze lucrari/img4.jpeg",
    "Poze lucrari/img5.jpeg",
    "Poze lucrari/img7.jpeg",
    "Poze lucrari/img8.jpeg",
    "Poze lucrari/img9.jpeg",
    "Poze lucrari/img10.jpeg",
    "Poze lucrari/img11.jpeg"
];

  let index = 0;

  function changeSlide() {
    slideImg.style.opacity = 0; // fade out

    setTimeout(() => {
      index = (index + 1) % images.length;
      slideImg.src = images[index];
      slideImg.style.opacity = 1; // fade in
    }, 500);
  }

  // Schimbă poza la fiecare 3 secunde
  setInterval(changeSlide, 3000);
});
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.querySelector('a[href="#contact"]');
  const popup = document.getElementById("contact-popup");
  const closePopup = document.getElementById("close-popup");

  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("hidden");
  });

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("hidden");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("service_popup");
  const popupTitle = document.getElementById("popup_title");
  const popupText = document.getElementById("popup_text");
  const closePopup = document.getElementById("close_popup");

  const descrieri = {
    "instalatii termice": "Instalăm sisteme termice eficiente — centrale, calorifere, țevi PPR și verificări periodice.",
    "desfundari": "Intervenim rapid pentru desfundarea conductelor, chiuvetelor și canalizărilor, fără deteriorări.",
    "reparatii urgente": "Oferim reparații urgente pentru scurgeri, țevi sparte, robineți defectuoși și alte probleme."
  };

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const titlu = card.textContent.trim().toLowerCase();
      popupTitle.textContent = card.textContent;
      popupText.textContent = descrieri[titlu] || "Detalii disponibile la cerere.";
      popup.classList.remove("popup_hidden");
    });
  });

  closePopup.addEventListener("click", () => popup.classList.add("popup_hidden"));
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.add("popup_hidden");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const reviewsList = document.getElementById("reviews_list");
  const submitBtn = document.getElementById("submit_review");
  const stars = document.querySelectorAll("#star_rating span");
  let selectedStars = 0;

  // Selectare stele
  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedStars = star.dataset.star;

      stars.forEach(s => s.classList.remove("selected"));
      for (let i = 0; i < selectedStars; i++) {
        stars[i].classList.add("selected");
      }
    });
  });

  // Încarcă review-uri salvate
  function loadReviews() {
    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    reviewsList.innerHTML = "";

    saved.forEach(r => {
      const div = document.createElement("div");
      div.classList.add("review-item");

      div.innerHTML = `
        <h4>${r.name}</h4>
        <div class="review-stars">${"★".repeat(r.stars)}</div>
        <p>${r.text}</p>
      `;

      reviewsList.appendChild(div);
    });
  }

  // Trimite review
  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("review_name").value.trim();
    const text = document.getElementById("review_text").value.trim();

    if (!name || !text || selectedStars === 0) {
      return alert("Completează numele, review-ul și selectează stelele!");
    }

    const saved = JSON.parse(localStorage.getItem("reviews")) || [];
    saved.push({ name, text, stars: selectedStars });
    localStorage.setItem("reviews", JSON.stringify(saved));

    loadReviews();

    document.getElementById("Nume recenzie").value = "";
    document.getElementById("Text de recenzie").value = "";
    selectedStars = 0;
    stars.forEach(s => s.classList.remove("selected"));
  });

  loadReviews();
});
function loadReviews() {
  const saved = JSON.parse(localStorage.getItem("reviews")) || [];
  const reviewsList = document.getElementById("reviews_list");
  reviewsList.innerHTML = "";

  saved.forEach((r, index) => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `
      <h4>${r.name}</h4>
      <div class="review-stars">${"★".repeat(r.stars)}</div>
      <p>${r.text}</p>
      <button class="delete-review" data-index="${index}">Șterge</button>
    `;
    reviewsList.appendChild(div);
  });

  document.querySelectorAll(".delete-review").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const saved = JSON.parse(localStorage.getItem("reviews")) || [];
      saved.splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(saved));
      loadReviews();
    });
  });
}
// Buton pentru ștergerea tuturor review-urilor
const clearBtn = document.createElement("button");
clearBtn.textContent = "Șterge toate review-urile";
clearBtn.classList.add("delete-all");
document.querySelector(".review-form").appendChild(clearBtn);

clearBtn.addEventListener("click", () => {
  if (confirm("Ești sigur că vrei să ștergi toate review-urile?")) {
    localStorage.removeItem("reviews");
    loadReviews();
  }
});