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
            max-width: 600px;
            margin: 0 auto;
            background-color: #333;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
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
            transition: all 0.3s ease;
        }
        .form-link:hover {
            background-color: #45a049;
            transform: translateY(-2px);
        }
        .form-link i {
            margin-right: 10px;
        }
        .home-btn {
            display: block;
            background-color: #1a73e8;
            color: white;
            padding: 15px;
            text-align: center;
            margin: 20px 0 10px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .home-btn:hover {
            background-color: #1765c0;
            transform: translateY(-2px);
        }
        .form-container {
            background-color: #444;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            display: none; /* Inicialmente oculto */
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #ddd;
        }
        input, select, textarea {
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
            transition: background-color 0.3s;
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container" id="main-container">
        <h1><i class="fas fa-tasks"></i> GERENCIAL HS</h1>
        
        <!-- Links principais -->
        <a href="#" class="form-link" onclick="showFolgaForm()">
            <i class="far fa-calendar-alt"></i> CADASTRO DE FOLGAS
        </a>
        <a href="https://forms.gle/wXWsukfKS2w7yKuX8" class="form-link" target="_blank">
            <i class="far fa-calendar-times"></i> CADASTRO DE FALTA
        </a>
        <a href="https://forms.gle/Wy9axrgLnoC5ymBk6" class="form-link" target="_blank">
            <i class="fas fa-shopping-bag"></i> CONTAGEM DE SACOLA
        </a>
        <a href="#" class="form-link" onclick="showDivergenciaForm()">
            <i class="fas fa-file-invoice-dollar"></i> DIVERGÊNCIA DE NOTAS FISCAIS
        </a>
        <a href="https://forms.gle/Qp1yY1EAX1FLc7Wg9" class="form-link" target="_blank">
            <i class="fas fa-exchange-alt"></i> TRANSFERÊNCIA ENTRE LOJAS
        </a>
    </div>
    
    <!-- Container do formulário de folgas (inicialmente oculto) -->
    <div class="container" id="folga-container" style="display: none;">
        <a href="#" class="home-btn" onclick="showMainPage()">
            <i class="fas fa-home"></i> VOLTAR PARA PÁGINA INICIAL
        </a>
        
        <div class="form-container" id="folga-form">
            <h2 style="text-align: center; margin-bottom: 20px; color: #fff;">
                <i class="far fa-calendar-alt"></i> Cadastro de Folgas
            </h2>
            
            <form id="folgaForm" onsubmit="enviarFolgaForm(event)">
                <div class="form-group">
                    <label>Nome do Colaborador</label>
                    <input type="text" name="colaborador" required>
                </div>

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
                    <label>Data da Folga</label>
                    <input type="date" name="data_folga" required>
                </div>

                <div class="form-group">
                    <label>Motivo</label>
                    <select name="motivo" required>
                        <option value="">Selecione o motivo</option>
                        <option value="Descanso">Descanso</option>
                        <option value="Consulta Médica">Consulta Médica</option>
                        <option value="Assuntos Pessoais">Assuntos Pessoais</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Observações (opcional)</label>
                    <textarea name="observacoes" rows="3"></textarea>
                </div>

                <div class="form-group">
                    <button type="submit">SOLICITAR FOLGA</button>
                </div>
            </form>

            <div id="folgaLoadingMessage" class="loading-message">
                <i class="fas fa-spinner fa-spin"></i> Enviando solicitação...
            </div>
        </div>
    </div>
    
    <!-- Container do formulário de divergências (inicialmente oculto) -->
    <div class="container" id="divergencia-container" style="display: none;">
        <a href="#" class="home-btn" onclick="showMainPage()">
            <i class="fas fa-home"></i> VOLTAR PARA PÁGINA INICIAL
        </a>
        
        <div class="form-container" id="divergencia-form">
            <h2 style="text-align: center; margin-bottom: 20px; color: #fff;">
                <i class="fas fa-file-invoice-dollar"></i> Divergências em Notas Fiscais
            </h2>
            
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
                    <button type="submit">ENVIAR DIVERGÊNCIA</button>
                </div>
            </form>

            <div id="loadingMessage" class="loading-message">
                <i class="fas fa-spinner fa-spin"></i> Enviando... Por favor, aguarde.
            </div>
        </div>
    </div>
    
    <footer>
        HS Operações &copy; 2023 - Todos os direitos reservados
    </footer>

    <script>
        // Mostrar/ocultar páginas
        function showMainPage() {
            document.getElementById('main-container').style.display = 'block';
            document.getElementById('folga-container').style.display = 'none';
            document.getElementById('divergencia-container').style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function showFolgaForm() {
            document.getElementById('main-container').style.display = 'none';
            document.getElementById('folga-container').style.display = 'block';
            document.getElementById('divergencia-container').style.display = 'none';
            
            // Configura a data atual como padrão para a folga
            const dataFolgaInput = document.querySelector('#folga-form input[name="data_folga"]');
            dataFolgaInput.valueAsDate = new Date();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function showDivergenciaForm() {
            document.getElementById('main-container').style.display = 'none';
            document.getElementById('folga-container').style.display = 'none';
            document.getElementById('divergencia-container').style.display = 'block';
            
            // Configura a data atual como padrão para recebimento
            document.getElementById('dataRecebimento').valueAsDate = new Date();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Mostrar/ocultar campo de outra transportadora
        document.getElementById('transportadora').addEventListener('change', function() {
            const outrosDiv = document.getElementById('outrosTransportadora');
            outrosDiv.style.display = this.value === 'OUTROS' ? 'block' : 'none';
        });
        
        // Função de envio do formulário de divergências
        let isSubmitting = false;

        function enviarFormulario(event) {
            event.preventDefault();

            if (isSubmitting) return;
            isSubmitting = true;

            const button = event.target.querySelector("button[type='submit']");
            const loadingMessage = document.getElementById("loadingMessage");

            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
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
                document.getElementById('dataRecebimento').valueAsDate = new Date();
            })
            .catch(error => {
                alert("Erro ao enviar o formulário. Tente novamente.");
            })
            .finally(() => {
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = 'ENVIAR DIVERGÊNCIA';
                    isSubmitting = false;
                    loadingMessage.style.display = "none";
                }, 100);
            });
        }
        
        // Função de envio do formulário de folgas
        function enviarFolgaForm(event) {
            event.preventDefault();

            if (isSubmitting) return;
            isSubmitting = true;

            const button = event.target.querySelector("button[type='submit']");
            const loadingMessage = document.getElementById("folgaLoadingMessage");

            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            loadingMessage.style.display = "block";

            var formData = new FormData(document.getElementById("folgaForm"));

            // Substitua esta URL pela do seu Google Apps Script para folgas
            fetch("SUA_URL_DO_GOOGLE_SCRIPT_PARA_FOLGAS", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert("SOLICITAÇÃO DE FOLGA ENVIADA COM SUCESSO!");
                document.getElementById("folgaForm").reset();
                
                // Configura a data atual novamente após reset
                const dataFolgaInput = document.querySelector('#folga-form input[name="data_folga"]');
                dataFolgaInput.valueAsDate = new Date();
            })
            .catch(error => {
                alert("Erro ao enviar a solicitação. Tente novamente.");
            })
            .finally(() => {
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = 'SOLICITAR FOLGA';
                    isSubmitting = false;
                    loadingMessage.style.display = "none";
                }, 100);
            });
        }
    </script>
</body>
</html>
