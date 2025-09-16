<?php
// CONFIGURAÇÕES
$destino = "franciscomazuze@gmail.com"; // Seu email
$assunto = "Nova mensagem do site Metal Mecânica";

// VERIFICA SE O FORMULÁRIO FOI ENVIADO
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // FILTRAR E PEGAR OS DADOS
    $nome = strip_tags(trim($_POST["nome"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $mensagem = strip_tags(trim($_POST["mensagem"] ?? ""));

    // VERIFICA SE OS CAMPOS ESTÃO PREENCHIDOS
    if (empty($nome) || empty($mensagem) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Por favor, preencha todos os campos corretamente.";
        exit;
    }

    // MONTAR O EMAIL
    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    $headers = "From: $nome <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // ENVIAR EMAIL
    if (mail($destino, $assunto, $corpo, $headers)) {
        echo "Mensagem enviada com sucesso! Obrigado pelo contato.";
    } else {
        echo "Erro ao enviar mensagem. Tente novamente mais tarde.";
    }

} else {
    echo "Método inválido.";
}
?>
