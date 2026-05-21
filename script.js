// Aguarda que o DOM esteja totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Atelier Luxury Store Loaded');

    // Seleção de elementos
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('product-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const closeModalBtn = modal.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-product-img');
    const modalName = document.getElementById('modal-product-name');
    const modalPrice = document.getElementById('modal-product-price');
    const addToCartBtn = document.getElementById('modal-add-to-cart');

    // Função para abrir a modal com os dados do produto
    function openProductModal(productData) {
        // Preenche a modal com os dados passados
        modalImg.src = productData.img;
        modalImg.alt = productData.name;
        modalName.textContent = productData.name;
        modalPrice.textContent = productData.price;
        
        // Atribui o ID do produto ao botão de adicionar (para uso futuro)
        addToCartBtn.dataset.productId = productData.id;

        // Mostra a modal adicionando a classe
        modal.classList.add('modal-open');
    }

    // Função para fechar a modal
    function closeProductModal() {
        modal.classList.remove('modal-open');
        // Limpa os dados para evitar "flash" de conteúdo anterior
        setTimeout(() => {
            modalImg.src = "";
            modalImg.alt = "";
            modalName.textContent = "";
            modalPrice.textContent = "";
        }, 300); // Tempo da transição
    }

    // Adiciona o evento de clique a cada cartão de produto
    productCards.forEach(card => {
        // Encontra o botão dentro do cartão
        const openButton = card.querySelector('.open-product');
        
        // Prepara os dados do produto com base nos atributos 'data-*'
        const productData = {
            id: card.dataset.productId,
            name: card.dataset.productName,
            price: card.dataset.productPrice,
            img: card.dataset.productImg
        };

        // Adiciona evento de clique no botão "Add"
        openButton.addEventListener('click', () => {
            openProductModal(productData);
        });

        // Opcional: Adiciona evento de clique em todo o cartão
        card.addEventListener('click', (event) => {
             // Impede que clique no botão original "Add" acione este
             if (event.target === openButton) return; 
             openProductModal(productData);
        });
    });

    // Eventos para fechar a modal
    closeModalBtn.addEventListener('click', closeProductModal);
    modalOverlay.addEventListener('click', closeProductModal); // Clicar no fundo escuro
    
    // Fechar com a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape" && modal.classList.contains('modal-open')) {
            closeProductModal();
        }
    });

    // Simulação de Adicionar ao Carrinho
    addToCartBtn.addEventListener('click', () => {
        const productId = addToCartBtn.dataset.productId;
        const productName = modalName.textContent;
        console.log(`Produto adicionado ao carrinho: ${productName} (ID: ${productId})`);
        
        // Aqui podes adicionar lógica real do carrinho futuramente
        alert(`Sucesso! ${productName} foi adicionado ao seu carrinho.`);
        closeProductModal(); // Opcional: fechar a modal após adicionar
    });

});
