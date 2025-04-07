<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Formulário de Cadastro</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }

        nav {
            background-color: #444;
            display: flex;
            justify-content: center;
        }

        nav button {
            background: none;
            color: white;
            border: none;
            padding: 15px 20px;
            cursor: pointer;
            font-size: 16px;
        }

        nav button:hover {
            background-color: #555;
        }

        .page {
            display: none;
            padding: 20px;
        }

        .active {
            display: block;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        label {
            display: block;
            margin-bottom: 5px;
            margin-top: 15px;
        }

        input, select, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        button[type="submit"] {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 4px;
        }

        button[type="submit"]:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

    <header>
        <h1>Cadastro de Divergências</h1>
    </header>

    <nav>
        <button onclick="showPage('principal')">Página Principal</button>
        <button onclick="showPage('formulario')">Formulário</button>
        <button onclick="showPage('sobre')">Sobre</button>
    </nav>

    <div id="principal" class="page active" data-page="principal">
        <h2>Bem-vindo!</h2>
        <p>Use o menu acima para navegar entre as páginas.</p>
    </div>

    <div id="formulario" class="page" data-page="formulario">
        <h2>Formulário de Cadastro</h2>
        <form id="cadastroForm">
            <label for="data">Data:</label>
            <input type="date" id="data" name="data" required>

            <label for="responsavel">Responsável:</label>
            <input type="text" id="responsavel" name="responsavel" required>

            <label for="cnpj">CNPJ:</label>
            <input type="text" id="cnpj" name="cnpj" required>

            <label for="fornecedor">Fornecedor:</label>
            <input type="text" id="fornecedor" name="fornecedor" required>

            <label for="numeroNota">Número da Nota:</label>
            <input type="text" id="numeroNota" name="numeroNota" required>

            <label for="itensComDivergencia">Itens com Divergência:</label>
            <textarea id="itensComDivergencia" name="itensComDivergencia" rows="4" required></textarea>

            <label for="divergencia">Divergência:</label>
            <textarea id="divergencia" name="divergencia" rows="4" required></textarea>

            <label for="valor">Valor:</label>
            <input type="number" id="valor" name="valor" step="0.01" required>

            <label for="status">Status:</label>
            <select id="status" name="status" required>
                <option value="Resolvido">Resolvido</option>
                <option value="Pendente">Pendente</option>
            </select>

            <button type="submit">Enviar</button>
        </form>
    </div>

    <div id="sobre" class="page" data-page="sobre">
        <h2>Sobre</h2>
        <p>Este sistema foi criado para facilitar o registro de divergências em notas fiscais.</p>
    </div>

    <script>
        function showPage(pageId) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                if (page.id === pageId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        }

        document.getElementById('cadastroForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log("Dados enviados:", data);
            alert("Formulário enviado com sucesso!");
            event.target.reset();
        });
    </script>

</body>
</html>
