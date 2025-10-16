import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AjoutProduit.css";
import { FaCamera } from "react-icons/fa";
import { BASE_IMG_URL, BASE_URL } from "../../../../../Utils/URL";

export default function AjoutProduit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    refProduct: "",
    designProduct: "",
    marqueProduct: "",
    description: "",
    stock: "",
    idSousCategorie: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sousCategories, setSousCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: success | error

  // Récupérer les sous-catégories
  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sous-categories`);
        const data = await response.json();
        setSousCategories(data);
      } catch (error) {
        console.error("Erreur de récupération des sous-catégories:", error);
      }
    };
    fetchSousCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSelectSousCategorie = (id) => {
    setFormData({ ...formData, idSousCategorie: id });
    setModalOpen(false);
    setSearchTerm("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("refProduct", formData.refProduct);
    form.append("designProduct", formData.designProduct);
    form.append("marqueProduct", formData.marqueProduct);
    form.append("description", formData.description);
    form.append("stock", formData.stock);
    form.append("idSousCategorie", formData.idSousCategorie);
    form.append("imageProduct", image);

    try {
      const response = await fetch(`${BASE_URL}/products/ajout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: "Produit ajouté avec succès !", type: "success" });
        setFormData({
          refProduct: "",
          designProduct: "",
          marqueProduct: "",
          description: "",
          stock: "",
          idSousCategorie: "",
        });
        setImage(null);
        setPreview(null);

        // Redirection après 2 secondes
        setTimeout(() => navigate("/"), 2000);

        // Supprimer le message après 3 secondes
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      } else {
        setMessage({ text: data.message || "Erreur lors de l'ajout", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setMessage({ text: "Erreur de connexion", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  const filteredSousCategories = sousCategories.filter((sc) =>
    sc.nomSousCategorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ajout-produit-container">
      <form className="ajout-produit-form" onSubmit={handleSubmit}>
        <h2>Ajouter un Produit</h2>

        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Aperçu de l'image */}
        <div className="image-upload">
          <label htmlFor="imageInput" className="image-label">
            {preview ? (
              <img src={preview} alt="Aperçu" className="image-preview" />
            ) : (
              <div className="image-placeholder">
                <FaCamera size={35} />
                <p>Choisir une image</p>
              </div>
            )}
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Sous-Catégorie */}
        <div className="form-group">
          <label>Sous-Catégorie</label>
          <input
            type="text"
            name="idSousCategorie"
            value={formData.idSousCategorie}
            onFocus={() => setModalOpen(true)}
            placeholder="Cliquez pour choisir une sous-catégorie"
            readOnly
            required
          />
        </div>

        {/* Modal Sous-Catégories */}
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Choisir une sous-catégorie</h3>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <ul className="sous-categorie-list">
                {filteredSousCategories.map((sc) => (
                  <li
                    key={sc.idSousCategorie}
                    onClick={() =>
                      handleSelectSousCategorie(sc.idSousCategorie)
                    }
                  >
                    <div className="contImgNomSousCat">
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        src={`${BASE_IMG_URL}/${sc.imageSousCategorie}`}
                        alt=""
                      />
                      {sc.nomSousCategorie}
                    </div>{" "}
                    <span>(ID: {sc.idSousCategorie})</span>
                  </li>
                ))}
                {filteredSousCategories.length === 0 && (
                  <li>Aucune sous-catégorie trouvée</li>
                )}
              </ul>
              <button
                className="btn-close-modal"
                onClick={() => setModalOpen(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Autres champs */}
        <div className="form-group">
          <label>Référence produit</label>
          <input
            type="text"
            name="refProduct"
            value={formData.refProduct}
            onChange={handleChange}
            placeholder="Ex: REF1234"
            required
          />
        </div>

        <div className="form-group">
          <label>Désignation</label>
          <input
            type="text"
            name="designProduct"
            value={formData.designProduct}
            onChange={handleChange}
            placeholder="Ex: Riz blanc 5kg"
            required
          />
        </div>

        <div className="form-group">
          <label>Marque</label>
          <input
            type="text"
            name="marqueProduct"
            value={formData.marqueProduct}
            onChange={handleChange}
            placeholder="Ex: Malagro"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description du produit..."
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Stock disponible</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Quantité en stock"
            required
          />
        </div>

        <button type="submit" className="btn-ajouter" disabled={loading}>
          {loading ? "Envoi..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}
