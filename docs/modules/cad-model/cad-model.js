class CADModel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const src = this.getAttribute('src') || '';
        const alt = this.getAttribute('alt') || 'Modèle 3D';
        const width = this.getAttribute('width') || '100%';
        // const height = this.getAttribute('height') || '30vh';

        this.shadowRoot.innerHTML = `
        <style>
            .viewer-container {
                position: relative;
                display: inline-block;
                width: ${width};
                aspect-ratio: 16/9;
            }

            .viewer-container model-viewer {
                width: 100%;
                height: 100%;
            }

            .enlarge-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 2rem;
                height: 2rem;
                background-color: #ffffff;
                border: 1px solid #ccc;
                border-radius: 10%;
                color: #000000;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .modal-content {
                position: relative;
                width: 90vw;
                height: 90vh;
                background: #fff;
                border-radius: 0.5rem;
                overflow: hidden;
            }

            .modal-content model-viewer {
                width: 100%;
                height: 100%;
                display: block;
            }

            .close-btn {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 2rem;
                height: 2rem;
                background-color: #333;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 100;
            }

            .close-btn::before {
                content: "×";
                color: #fff;
                font-size: 1.5rem;
                line-height: 1;
            }
        </style>
        <div class="viewer-container">
          <model-viewer
            id="smallViewer"
            src="${src}"
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            alt="${alt}">
          </model-viewer>
          <button class="enlarge-btn" id="openModal" title="Agrandir">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 20v.5h.5V20zm-4.646-5.354a.5.5 0 0 0-.708.708zM19.5 14v6h1v-6zm.5 5.5h-6v1h6zm.354.146l-5-5l-.708.708l5 5zM4 20h-.5v.5H4zm5.354-4.646a.5.5 0 0 0-.708-.708zM3.5 14v6h1v-6zm.5 6.5h6v-1H4zm.354-.146l5-5l-.708-.708l-5 5zM20 4h.5v-.5H20zm-5.354 4.646a.5.5 0 0 0 .708.708zM20.5 10V4h-1v6zM20 3.5h-6v1h6zm-.354.146l-5 5l.708.708l5-5zM4 4v-.5h-.5V4zm4.646 5.354a.5.5 0 1 0 .708-.708zM4.5 10V4h-1v6zM4 4.5h6v-1H4zm-.354-.146l5 5l.708-.708l-5-5z"/>
            </svg>
          </button>
        </div>
  
        <div id="modal" class="modal">
          <div class="modal-content">
            <span class="close-btn" id="closeModal"></span>
            <model-viewer
              id="bigViewer"
              camera-controls
              touch-action="pan-y"
              shadow-intensity="1"
              alt="${alt}">
            </model-viewer>
          </div>
        </div>
      `;

        const shadow = this.shadowRoot;
        const smallViewer = shadow.getElementById("smallViewer");
        const bigViewer = shadow.getElementById("bigViewer");
        const modal = shadow.getElementById("modal");
        const openModal = shadow.getElementById("openModal");
        const closeModal = shadow.getElementById("closeModal");

        modal.style.display = "none";

        // Ouvrir la modale : on masque l'instance mini et on affiche la version agrandie
        openModal.addEventListener("click", () => {
            modal.style.display = "flex";
            bigViewer.src = smallViewer.src;
            smallViewer.style.display = "none"; // Masquer l'instance mini pour alléger le rendu
        });

        // Fermer la modale : on réaffiche l'instance mini
        const fermerModal = () => {
            modal.style.display = "none";
            smallViewer.style.display = "block";
        };

        closeModal.addEventListener("click", fermerModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fermerModal();
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                fermerModal();
            }
        });
    }

    getBaseUrl() {
        const base = document.querySelector('base');
        return base ? base.href : '';
    }
}

customElements.define("cad-model", CADModel);
