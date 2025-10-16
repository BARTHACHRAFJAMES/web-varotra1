import React, { useEffect, useState, useRef } from "react";
import "./Contenu.css";
import { BASE_URL, BASE_IMG_URL } from "../../../Utils/URL";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";

// === Composant pour une sous-catégorie + ses produits ===
function SousCategorieProduits({ sousCat }) {
  const ref = useRef(null);

  const scroll = (direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sousCat-prod" key={sousCat.idSousCategorie}>
      <h3>{sousCat.nomSousCategorie}</h3>

      <div className="scroll-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div className="produitList" ref={ref}>
          {sousCat.products.map((prod) => (
            <div className="produit-card" key={prod.idProduct}>
              <img
                src={`${BASE_IMG_URL}/${prod.imageProduct}`}
                alt={prod.designProduct}
                className="produit-image"
              />
              <span className="produit-nom">{prod.designProduct}</span>
              <p className="produit-stock">Stock : {prod.stock}</p>
              <button
                style={{
                  backgroundColor: "#0070e0",
                  border: "none",
                  padding: "5px 10px",
                  color: "white",
                  borderRadius: "20px",
                  width: "100%",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <ShoppingCart size={18} style={{marginRight: "5px"}} /> Ajouter
              </button>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

// === Composant principal ===
export default function Contenu() {
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);

  const categorieRef = useRef(null);

  useEffect(() => {
    fetch(`${BASE_URL}/categoriesproduit`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erreur de chargement des catégories :", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/souscategories`)
      .then((res) => res.json())
      .then((data) => setSousCategories(data))
      .catch((err) => console.error("Erreur de chargement des sous-catégories :", err));
  }, []);

  const scrollCategories = (direction) => {
    if (categorieRef.current) {
      categorieRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="content">
      <div className="sousContant">
        {/* ==== Catégories principales ==== */}
        <div className="scroll-container">
          <button className="scroll-btn left" onClick={() => scrollCategories("left")}>
            &#10094;
          </button>

          <div className="CategorieList" ref={categorieRef}>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div className="categorie-card" key={cat.id}>
                  <img
                    src={`${BASE_IMG_URL}/${cat.photoCategorie}`}
                    alt={cat.nomCategorie}
                    className="categorie-img"
                  />
                  <p className="categorie-name">{cat.nomCategorie}</p>
                </div>
              ))
            ) : (
              <p className="loading-text">Chargement des catégories...</p>
            )}
          </div>

          <button className="scroll-btn right" onClick={() => scrollCategories("right")}>
            &#10095;
          </button>
        </div>

        {/* ==== Sous-catégories avec produits ==== */}
        <div className="sousCategorie-avec-produit">
          {sousCategories.length > 0 ? (
            sousCategories
              .filter((sousCat) => sousCat.products && sousCat.products.length > 0)
              .map((sousCat) => (
                <SousCategorieProduits key={sousCat.idSousCategorie} sousCat={sousCat} />
              ))
          ) : (
            <p className="loading-text">Chargement des sous-catégories...</p>
          )}
        </div>
      </div>
    </div>
  );
}
