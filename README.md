<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GERENCIAL HS</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #fff;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #fff;
            margin-bottom: 30px;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background-color: #333;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Estilo das abas */
        .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #555;
        }
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            background-color: #444;
            margin-right: 5px;
            border-radius: 5px 5px 0 0;
            transition: all 0.3s ease;
        }
        .tab:hover {
            background-color: #555;
        }
        .tab.active {
            background-color: #4CAF50;
            font-weight: bold;
        }
        
        /* Conteúdo das abas */
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        
        /* Estilo dos links (mantendo seu estilo original) */
        .form-link {
            display: block;
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
            margin: 10px 0;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .form-link:hover {
            background-color: #45a049;
        }
        
        /* Estilo do formulário de divergências (adaptado) */
        .form-container {
            background: #444;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #ddd;
        }
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #666;
            border-radius: 4px;
            background-color: #555;
            color: white;
        }
        button[type="submit"] {
            background-color: #1a73e8;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 4px;
            width: 100%;
            cursor: pointer;
            font-weight: bold;
        }
        button[type="submit"]:hover {
            background-color: #1765c0;
        }
        .loading-message {
            text-align: center;
            margin-top: 10px;
            color: #4CAF50;
            display: none;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #fff;
            background-color: #333;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>GERENCIAL HS</h1>
        
        <!-- Abas de navegação -->
        <div class="tabs">
            <div class="tab active" onclick="openTab('formularios')">Formulários</div>
            <div class="tab" onclick="openTab('divergencias')">Divergências NF</div>
        </div>
        
        <!-- Conteúdo da aba Formulários -->
        <div id="formularios" class="tab-content active">
            <a href="https://hsoperacoes.github.io/FOLGAS/" class="form-link" target="_blank">CADASTRO DE FOLGAS</a>
            <a href="https://forms.gle/wXWsukfKS2w7yKuX8" class="form-link" target="_blank">CADASTRO DE FALTA</a>
            <a href="https://forms.gle/Wy9axrgLnoC5ymBk6" class="form-link" target="_blank">CONTAGEM DE SACOLA</a>
            <a href="https://forms.gle/Qp1yY1EAX1FLc7Wg9" class="form-link" target="_blank">TRANSFERÊNCIA ENTRE LOJAS</a>
        </div>
        
        <!-- Conteúdo da aba Divergências -->
        <div id="divergencias" class="tab-content">
            <div class="form-container">
                <h2 style="text-align: center; margin-bottom: 20px; color: #fff;">Divergências em Notas Fiscais</h2>
                <form id="formulario" onsubmit="enviarFormulario(event)">
                    <div class="form-group">
                        <label>Filial</label>
                        <select name="filial" required>
                            <option value="">Selecione uma filial</option>
                            <option value="ARTUR">ARTUR</option>
                            <option value="FLORIANO">FLORIANO</option>
                            <option value="JOTA">JOTA</option>
                            <option value="MODA">MODA</option>
                            <option value="PONTO">PONTO</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Transportadora</label>
                        <select name="transportadora" id="transportadora" required>
                            <option value="BRASPRESS">BRASPRESS</option>
                            <option value="OUTROS">OUTROS</option>
                        </select>
                    </div>

                    <div class="form-group" id="outrosTransportadora" style="display: none;">
                        <label>Qual é a Transportadora?</label>
                        <input type="text" id="outraTransportadora" name="outraTransportadora">
                    </div>

                    <div class="form-group">
                        <label>Data de Recebimento</label>
                        <input type="date" id="dataRecebimento" name="dataRecebimento" required>
                    </div>

                    <div class="form-group">
                        <label>Número da Nota Fiscal</label>
                        <input type="text" id="notaFiscal" name="notaFiscal" required>
                    </div>

                    <div class="form-group">
                        <label>Série da Nota Fiscal</label>
                        <input type="text" id="serieNota" name="serieNota" required>
                    </div>

                    <div class="form-group">
                        <label>Referência</label>
                        <input type="text" id="referencia" name="referencia" maxlength="4" required>
                    </div>

                    <div class="form-group">
                        <label>Cor</label>
                        <input type="text" id="cor" name="cor" maxlength="6" required>
                    </div>

                    <div class="form-group">
                        <label>Tamanho</label>
                        <input type="text" id="tamanho" name="tamanho" required>
                    </div>

                    <div class="form-group">
                        <label>Quantidade</label>
                        <input type="number" id="quantidade" name="quantidade" required>
                    </div>

                    <div class="form-group">
                        <label>Divergência</label>
                        <select name="divergencia" required>
                            <option value="">Selecione uma opção</option>
                            <option value="MERCADORIA PASSANDO">MERCADORIA PASSANDO</option>
                            <option value="MERCADORIA FALTANDO">MERCADORIA FALTANDO</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <button type="submit">Enviar</button>
                    </div>
                </form>

                <div id="loadingMessage" class="loading-message">
                    Enviando... Por favor, aguarde.
                </div>
            </div>
        </div>
    </div>
    
    <footer>
        HS Operações &copy; 2023 - Todos os direitos reservados
    </footer>

    <script>
        // Função para alternar entre abas
        function openTab(tabName) {
            // Esconde todos os conteúdos de abas
            const tabContents = document.getElementsByClassName('tab-content');
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
            }
            
            // Remove a classe 'active' de todas as abas
            const tabs = document.getElementsByClassName('tab');
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }
            
            // Mostra a aba selecionada e marca como ativa
            document.getElementById(tabName).classList.add('active');
            event.currentTarget.classList.add('active');
        }
        
        // Mostrar/ocultar campo de outra transportadora
        document.getElementById('transportadora').addEventListener('change', function() {
            const outrosDiv = document.getElementById('outrosTransportadora');
            outrosDiv.style.display = this.value === 'OUTROS' ? 'block' : 'none';
        });
        
        // Configura a data atual como padrão
        document.getElementById('dataRecebimento').valueAsDate = new Date();
        
        // Função de envio do formulário (adaptada)
        let isSubmitting = false;

        function enviarFormulario(event) {
            event.preventDefault();

            if (isSubmitting) return;
            isSubmitting = true;

            const button = event.target.querySelector("button[type='submit']");
            const loadingMessage = document.getElementById("loadingMessage");

            button.disabled = true;
            button.textContent = "Enviando...";
            loadingMessage.style.display = "block";

            var formData = new FormData(document.getElementById("formulario"));

            fetch("https://script.google.com/macros/s/AKfycbw5xq6i5Qoc0s3f-ZaQ6FCZdsjXrC_my8d0tmgr756hWZQqT9Olu9DjsGOYwTlvnBQA/exec", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert("SUA DIVERGÊNCIA FOI ENVIADA COM SUCESSO, AGRADECEMOS SEU APOIO");
                document.getElementById("formulario").reset();
            })
            .catch(error => {
                alert("Erro ao enviar o formulário. Tente novamente.");
            })
            .finally(() => {
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = "Enviar";
                    isSubmitting = false;
                    loadingMessage.style.display = "none";
                }, 100);
            });
        }
    </script>
</body>
</html>
