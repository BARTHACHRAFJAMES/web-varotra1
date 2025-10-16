import React, { useEffect, useState } from "react";
import "./ProduitFRN.css";
import { BASE_IMG_URL, BASE_URL } from "../../../../Utils/URL";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProduitFRN() {
  const fournisseur = JSON.parse(localStorage.getItem("fournisseur"));
  const token = localStorage.getItem("token");
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchProduits = async () => {
      try {
        const response = await fetch(`${BASE_URL}/fournisseur/produits`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
          setProduits(data.data);
        } else {
          console.error("Erreur:", data.message);
        }
      } catch (error) {
        console.error("Erreur de connexion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, [token]);

  const handleEdit = (id) => {
    alert(`Modifier le produit ID : ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      alert(`Supprimer le produit ID : ${id}`);
      // ici tu pourras plus tard faire un fetch DELETE vers ton API
    }
  };

  const goToAddProduct = () => {
    navigate("/produit/ajout");
  };

  return (
    <div className="contentProduitFRN">
      <div className="sousContantProduitFRN">
        <div className="titre-section">
          <h2 className="titre-liste">Mes Produits</h2>
          <button className="btn-add" onClick={goToAddProduct}>
            <FaPlus />
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Chargement des produits...</p>
        ) : produits.length === 0 ? (
          <p className="no-product">Aucun produit ajouté pour le moment.</p>
        ) : (
          <div className="liste-produits">
            {produits.map((p) => (
              <div key={p.idProduct} className="produit-item">
                <img
                  src={`${BASE_IMG_URL}/${p.imageProduct}`}
                  alt={p.designProduct}
                  className="produit-image-liste"
                />
                <div className="produit-info">
                  <h4>{p.designProduct}</h4>
                  <p className="marque">Marque : {p.marqueProduct}</p>
                  <p className="stock">Stock : {p.stock}</p>
                </div>

                <div className="produit-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(p.idProduct)}
                  >
                    <FaEdit /> Modifier
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(p.idProduct)}
                  >
                    <FaTrashAlt /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
