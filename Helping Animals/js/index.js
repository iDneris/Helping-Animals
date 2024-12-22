$(function () {

    $("#btn_msg").on("click", function () {
        mostrarAlerta('success', '', 'Mensagem enviada com sucesso!');
    });

    //Quando clicar no link da navbar "Doação"
    $('#doacao-link, #doacao-link-mobile').on('click', function (e) {
        e.preventDefault();  // Impede o comportamento padrão do link

        // Ativa a aba "Doação" com Bootstrap 4
        $('#myTab a[href="#doacao"]').tab('show');

        // Calcula o deslocamento para evitar que a navbar sobreponha a seção
        var offset = $('#doacao').offset().top;

        // Obtém a altura da navbar fixa
        var navbarHeight = $('.navbar').outerHeight();

        // Rola suavemente até a aba com o deslocamento ajustado
        $('html, body').animate({
            scrollTop: offset - navbarHeight // Subtrai a altura da navbar para ajustar a rolagem
        }, 500); // Tempo de animação de 500ms
    });

    $("#btn_actionDoar").on("click", function () {
        $("#paymentModal").modal('show');
    });

    $("#btn_entreEmContato").on("click", function (event) {
        scrollToSection(event, 'contato');
    });

    $("#btn_doarAgora").on("click", function () {
        $("#paymentModal").modal('show');
    });

    $("#btn_logo").on("click", function () {
        location.reload();
    });

    $('input[name="doacao"]').change(function () {
        if ($(this).val() === 'identificar') {
            $('#nome-container').removeClass('d-none');
        } else {
            $("#nomeDoacao").val('');
            $('#nome-container').addClass('d-none');
        }
    });
});

function mostrarAlerta(icon, title, text,) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Ok'
    });
}

function scrollToSection(event , idField) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Define a rolagem suave com jQuery
    $('html, body').animate({
        scrollTop: $(`#${idField}`).offset().top, // Alvo da rolagem
    }, 1000); // Duração da rolagem em milissegundos (1500ms = 1.5 segundos)
}

// Função para exibir o formulário ou QR Code baseado na escolha do usuário
function showPaymentForm(option) {
    const cardForm = document.getElementById('card-form');
    const pixQRCode = document.getElementById('pix-qrcode');

    if (option === 'card') {
        cardForm.style.display = 'block';
        pixQRCode.style.display = 'none';
    } else if (option === 'pix') {
        cardForm.style.display = 'none';
        pixQRCode.style.display = 'block';
        generateQRCode();
    }
}

// Função para gerar um QR Code fictício aleatório
function generateQRCode() {
    const qrCodeImg = document.getElementById('qrcode');
    const randomCode = Math.floor(Math.random() * 1000000); // Gera um número aleatório
    // Gera um QR Code aleatório usando um serviço de QR Code
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=PagamentoPIX-${randomCode}&size=200x200`;
}
