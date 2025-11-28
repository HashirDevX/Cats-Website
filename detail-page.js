let params = new URLSearchParams(window.location.search);
let id = params.get("id");

async function GetData(id) {
  const url = `https://api.freeapi.app/api/v1/ /cats/${id}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    let fullData = data.data;
    setData(fullData);
    return fullData;
  } catch (error) {
    console.error(error);
  }
}
GetData(id);

function boolToYesNo(v) {
  if (v === 1 || v === "1" || v === true) return "Yes";
  if (v === 0 || v === "0" || v === false) return "No";
  return v ?? "-";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent =
    value === null || value === undefined || value === "" ? "-" : String(value);
}

function setData(cat) {
  const bgContainer = document.querySelector(".bg-image-container");
  if (bgContainer) {
    bgContainer.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${cat.image}) center/cover no-repeat`;
    const h1 = bgContainer.querySelector("h1");
    if (h1) h1.textContent = cat.name;
  }

  setText("name", cat.name);
  setText("origin", cat.origin);
  setText("life_span", cat.life_span);
  setText("weight_metric", cat.weight?.metric ?? "-");
  setText("weight_imperial", cat.weight?.imperial ?? "-");
  setText("country_code", cat.country_code ?? cat.country_codes);
  setText("id_field", cat.id);
  setText("temperament", cat.temperament);
  setText("description", cat.description);
  setText("indoor", boolToYesNo(cat.indoor));
  setText("lap", boolToYesNo(cat.lap));
  setText("alt_names", cat.alt_names || "-");
  setText("country_codes", cat.country_codes);
  setText("social_needs", cat.social_needs);
  setText("stranger_friendly", cat.stranger_friendly);
  setText("vocalisation", cat.vocalisation);
  setText("experimental", cat.experimental);
  setText("hairless", cat.hairless);
  setText("natural", cat.natural);
  setText("rare", cat.rare);
  setText("rex", cat.rex);
  setText("suppressed_tail", boolToYesNo(cat.suppressed_tail));
  setText("short_legs", cat.short_legs);
  setText("hypoallergenic", boolToYesNo(cat.hypoallergenic));

  // Stats / badges
  setText("adaptability", "A: " + (cat.adaptability ?? "-"));
  setText("affection_level", "Affection: " + (cat.affection_level ?? "-"));
  setText("child_friendly", "Child: " + (cat.child_friendly ?? "-"));
  setText("dog_friendly", "Dog: " + (cat.dog_friendly ?? "-"));
  setText("energy_level", "Energy: " + (cat.energy_level ?? "-"));
  setText("grooming", "Groom: " + (cat.grooming ?? "-"));
  setText("health_issues", "Health: " + (cat.health_issues ?? "-"));
  setText("intelligence", "IQ: " + (cat.intelligence ?? "-"));
  setText("shedding_level", "Shedding: " + (cat.shedding_level ?? "-"));

  // Links
  const setLink = (id, url) => {
    const a = document.getElementById(id);
    if (!a) return;
    if (!url) {
      a.href = "#";
      a.setAttribute("aria-disabled", "true");
      return;
    }
    a.href = url;
    a.target = "_blank";
  };
  setLink("cfa_url", cat.cfa_url);
  setLink("vetstreet_url", cat.vetstreet_url);
  setLink("vcahospitals_url", cat.vcahospitals_url);
  setLink("wikipedia_url", cat.wikipedia_url);

  // Main image
  const img = document.getElementById("image");
  if (img && cat.image) {
    img.src = cat.image;
    img.alt = cat.name + " photo";
  } else if (img) {
    img.src = "";
    img.alt = "no image";
  }

  console.log(cat);
}
setData(catData);
