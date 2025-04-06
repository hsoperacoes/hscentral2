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
            padding: 25px;
            border-radius: 8px;
            margin-top: 20px;
        }
        [data-page] {
            display: none;
        }
        [data-page].active {
            display: block;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group legend {
            font-size: 16px;
            font-weight: bold;
            color: #ddd;
            margin-bottom: 12px;
            display: block;
        }
        /* ESTILO ESPECÍFICO PARA RADIO BUTTONS ALINHADOS À ESQUERDA */
        .radio-label {
            display: flex;
            align-items: center;
            text-align: left;
            padding: 10px;
            border-radius: 4px;
            background-color: #555;
            margin-bottom: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .radio-label:hover {
            background-color: #666;
        }
        .radio-label input[type="radio"] {
            margin-right: 10px;
            flex-shrink: 0;
        }
        /* ESTILOS PARA INPUTS E TEXTAREA */
        input, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #666;
            border-radius: 4px;
            background-color: #555;
            color: white;
            font-size: 14px;
        }
        /* ESTILO ESPECÍFICO PARA SELECT (DROPDOWN) - CORRIGIDO */
        select {
            width: 100%;
            padding: 12px;
            border: 1px solid #666;
            border-radius: 4px;
            background-color: #555;
            color: white;
            font-size: 14px;
            height: auto;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 15px;
            cursor: pointer;
            transition: all 0.3s;
        }
        select:focus {
            outline: none;
            border-color: #673ab7;
            box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.2);
        }
        select option {
            background: #555;
            color: white;
            padding: 10px;
        }
        button[type="submit"] {
            background-color: #673ab7;
            color: white;
            border: none;
            padding: 14px;
            border-radius: 4px;
            width: 100%;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: background-color 0.3s;
            margin-top: 20px;
        }
        button[type="submit"]:hover {
            background-color: #5e35b1;
        }
        .loading-message {
            text-align: center;
            margin-top: 15px;
            color: #4CAF50;
            display: none;
        }
        footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #fff;
            background-color: #333;
            padding: 15px;
            border-radius: 5px;
        }
        #motivoOutros {
            display: none;
            margin-top: 15px;
        }
        #outrosTransportadora {
            display: none;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- Página Principal -->
    <div class="container active" data-page="main">
        <h1><i class="fas fa-tasks"></i> GERENCIAL HS</h1>
        
        <a href="#" class="form-link" data-target="folga">
            <i class="far fa-calendar-alt"></i> CADASTRO DE FOLGAS
        </a>
        <a href="https://forms.gle/wXWsukfKS2w7yKuX8" class="form-link" target="_blank">
            <i class="far fa-calendar-times"></i> CADASTRO DE FALTA
        </a>
        <a href="https://forms.gle/Wy9axrgLnoC5ymBk6" class="form-link" target="_blank">
            <i class="fas fa-shopping-bag"></i> CONTAGEM DE SACOLA
        </a>
        <a href="#" class="form-link" data-target="divergencia">
            <i class="fas fa-file-invoice-dollar"></i> DIVERGÊNCIA DE NOTAS FISCAIS
        </a>
        <a href="https://forms.gle/Qp1yY1EAX1FLc7Wg9" class="form-link" target="_blank">
            <i class="fas fa-exchange-alt"></i> TRANSFERÊNCIA ENTRE LOJAS
        </a>
    </div>
    
    <!-- Página de Folgas -->
    <div class="container" data-page="folga">
        <a href="#" class="home-btn" data-target="main">
            <i class="fas fa-home"></i> VOLTAR PARA PÁGINA INICIAL
        </a>
        
        <div class="form-container">
            <h2 style="text-align: center; margin-bottom: 25px; color: #fff;">
                <i class="far fa-calendar-alt"></i> CADASTRO DE FOLGA FUNCIONÁRIOS
            </h2>
            
            <form id="folgaForm">
                <fieldset class="form-group" id="filialGroup">
                    <legend>Filial</legend>
                    <label class="radio-label"><input type="radio" name="filial" value="ARTUR"> ARTUR</label>
                    <label class="radio-label"><input type="radio" name="filial" value="FLORIANO"> FLORIANO</label>
                    <label class="radio-label"><input type="radio" name="filial" value="JOTA"> JOTA</label>
                    <label class="radio-label"><input type="radio" name="filial" value="MODA"> MODA</label>
                    <label class="radio-label"><input type="radio" name="filial" value="PONTO"> PONTO</label>
                </fieldset>

                <div class="form-group" id="funcionarioGroup">
                    <legend>Funcionário</legend>
                    <select id="funcionario" name="funcionario" required>
                        <option value="">Selecione a filial primeiro</option>
                    </select>
                </div>

                <div class="form-group">
                    <legend>DIA TRABALHADO</legend>
                    <input type="date" id="dataTrabalho" name="dataTrabalho" required>
                </div>

                <fieldset class="form-group" id="motivoGroup">
                    <legend>Motivo da Folga</legend>
                    <label class="radio-label"><input type="radio" name="motivo" value="DOMINGO"> DOMINGO</label>
                    <label class="radio-label"><input type="radio" name="motivo" value="FERIADO"> FERIADO</label>
                    <label class="radio-label"><input type="radio" name="motivo" value="OUTROS"> OUTROS</label>
                </fieldset>

                <div class="form-group" id="motivoOutros">
                    <legend>Especificar o Motivo</legend>
                    <input type="text" name="outrosMotivo" placeholder="Escreva o motivo">
                </div>

                <div class="form-group">
                    <legend>Data da Folga</legend>
                    <input type="date" id="dataFolga" name="dataFolga" required>
                </div>

                <button type="submit">ENVIAR SOLICITAÇÃO</button>
            </form>

            <div id="folgaLoadingMessage" class="loading-message">
                <i class="fas fa-spinner fa-spin"></i> Enviando solicitação...
            </div>
        </div>
    </div>
    
    <!-- Página de Divergências -->
    <div class="container" data-page="divergencia">
        <a href="#" class="home-btn" data-target="main">
            <i class="fas fa-home"></i> VOLTAR PARA PÁGINA INICIAL
        </a>
        
        <div class="form-container">
            <h2 style="text-align: center; margin-bottom: 20px; color: #fff;">
                <i class="fas fa-file-invoice-dollar"></i> Divergências em Notas Fiscais
            </h2>
            
            <form id="divergenciaForm">
                <div class="form-group">
                    <legend>Filial</legend>
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
                    <legend>Transportadora</legend>
                    <select name="transportadora" id="transportadora" required>
                        <option value="BRASPRESS">BRASPRESS</option>
                        <option value="OUTROS">OUTROS</option>
                    </select>
                </div>

                <div class="form-group" id="outrosTransportadora">
                    <legend>Qual é a Transportadora?</legend>
                    <input type="text" id="outraTransportadora" name="outraTransportadora">
                </div>

                <div class="form-group">
                    <legend>Data de Recebimento</legend>
                    <input type="date" id="dataRecebimento" name="dataRecebimento" required>
                </div>

                <div class="form-group">
                    <legend>Número da Nota Fiscal</legend>
                    <input type="text" id="notaFiscal" name="notaFiscal" required>
                </div>

                <div class="form-group">
                    <legend>Série da Nota Fiscal</legend>
                    <input type="text" id="serieNota" name="serieNota" required>
                </div>

                <div class="form-group">
                    <legend>Referência</legend>
                    <input type="text" id="referencia" name="referencia" maxlength="4" required>
                </div>

                <div class="form-group">
                    <legend>Cor</legend>
                    <input type="text" id="cor" name="cor" maxlength="6" required>
                </div>

                <div class="form-group">
                    <legend>Tamanho</legend>
                    <input type="text" id="tamanho" name="tamanho" required>
                </div>

                <div class="form-group">
                    <legend>Quantidade</legend>
                    <input type="number" id="quantidade" name="quantidade" required>
                </div>

                <div class="form-group">
                    <legend>Divergência</legend>
                    <select name="divergencia" required>
                        <option value="">Selecione uma opção</option>
                        <option value="MERCADORIA PASSANDO">MERCADORIA PASSANDO</option>
                        <option value="MERCADORIA FALTANDO">MERCADORIA FALTANDO</option>
                    </select>
                </div>

                <button type="submit">ENVIAR DIVERGÊNCIA</button>
            </form>

            <div id="divergenciaLoadingMessage" class="loading-message">
                <i class="fas fa-spinner fa-spin"></i> Enviando... Por favor, aguarde.
            </div>
        </div>
    </div>
    
    <footer>
        HS Operações &copy; 2023 - Todos os direitos reservados
    </footer>

    <script>
        // Sistema de navegação
        document.addEventListener('DOMContentLoaded', function() {
            // Mostrar página principal inicialmente
            showPage('main');
            
            // Configurar eventos de navegação
            document.querySelectorAll('[data-target]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showPage(this.getAttribute('data-target'));
                });
            });
            
            function showPage(pageId) {
                // Esconder todas as páginas
                document.querySelectorAll('[data-page]').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Mostrar a página solicitada
                const page = document.querySelector(`[data-page="${pageId}"]`);
                if (page) {
                    page.classList.add('active');
                    
                    // Configurar datas quando a página for mostrada
                    if (pageId === 'folga') {
                        document.getElementById('dataTrabalho').valueAsDate = new Date();
                        document.getElementById('motivoOutros').style.display = 'none';
                    } else if (pageId === 'divergencia') {
                        document.getElementById('dataRecebimento').valueAsDate = new Date();
                        document.getElementById('outrosTransportadora').style.display = 'none';
                    }
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Dados dos funcionários por filial
            const funcionariosPorFilial = {
                "ARTUR": ["FERNANDA", "LUCILENE"],
                "FLORIANO": ["FERNANDA", "MEIRE", "SARA", "THACIANNE"],
                "JOTA": ["BRUNO", "CARINA", "DENISE", "FABIOLA", "JÉSSICA", "LOUISE", "NATALIA", "PRISCILA", "RAYSSA", "VERA"],
                "MODA": ["ANA CLARA", "DAIANE", "JÉSSICA", "JÔSE CLAIR", "NAISE", "MARIA"],
                "PONTO": ["DANIELA", "DEBORA", "ISADORA", "PAULA", "PRISCILA", "SANDY", "SÔNIA"]
            };

            // Carregar funcionários quando selecionar filial
            document.getElementById('filialGroup').addEventListener('change', function() {
                const filialSelecionada = document.querySelector('input[name="filial"]:checked');
                const funcionarioSelect = document.getElementById('funcionario');
                
                funcionarioSelect.innerHTML = '<option value="">Selecione um funcionário</option>';
                
                if (filialSelecionada) {
                    funcionariosPorFilial[filialSelecionada.value].forEach(function(funcionario) {
                        const option = document.createElement('option');
                        option.value = funcionario;
                        option.textContent = funcionario;
                        funcionarioSelect.appendChild(option);
                    });
                }
            });

            // Mostrar campo "Outros" quando selecionado e validar datas (Folgas)
            document.querySelectorAll('#motivoGroup input[name="motivo"]').forEach(function(radio) {
                radio.addEventListener('change', function() {
                    const dataTrabalhoInput = document.getElementById('dataTrabalho');
                    const motivoOutrosField = document.getElementById('motivoOutros');
                    const dataFolgaInput = document.getElementById('dataFolga');

                    if (!dataTrabalhoInput.value) {
                        alert('Selecione primeiro a Data de Trabalho!');
                        this.checked = false;
                        return;
                    }

                    const dataTrabalho = new Date(dataTrabalhoInput.value);
                    const maxDate = new Date(dataTrabalho);

                    if (this.value === 'DOMINGO') {
                        maxDate.setDate(dataTrabalho.getDate() + 7);
                    } else if (this.value === 'FERIADO') {
                        maxDate.setDate(dataTrabalho.getDate() + 30);
                    }

                    dataFolgaInput.min = dataTrabalho.toISOString().split('T')[0];
                    dataFolgaInput.max = maxDate.toISOString().split('T')[0];

                    motivoOutrosField.style.display = this.value === 'OUTROS' ? 'block' : 'none';
                });
            });

            // Mostrar/ocultar campo de outra transportadora (Divergências)
            document.getElementById('transportadora').addEventListener('change', function() {
                document.getElementById('outrosTransportadora').style.display = 
                    this.value === 'OUTROS' ? 'block' : 'none';
            });

            // Envio do formulário de folgas
            document.getElementById('folgaForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const button = this.querySelector('button[type="submit"]');
                const loadingMessage = document.getElementById('folgaLoadingMessage');
                
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
                loadingMessage.style.display = 'block';
                
                const formData = new FormData(this);
                
                fetch('https://script.google.com/macros/s/AKfycbwh-YUwL2o3_i-bfcV9RMzLcoI98vyyGwEXf4LHlG5KJ59gIAlUe1_VVlFQMBqU6PwR/exec', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    alert('Folga cadastrada com sucesso!');
                    this.reset();
                    document.getElementById('funcionario').innerHTML = '<option value="">Selecione a filial primeiro</option>';
                    document.getElementById('motivoOutros').style.display = 'none';
                    document.getElementById('dataTrabalho').valueAsDate = new Date();
                })
                .catch(error => {
                    alert('Erro ao enviar os dados!');
                })
                .finally(() => {
                    button.disabled = false;
                    button.innerHTML = 'ENVIAR SOLICITAÇÃO';
                    loadingMessage.style.display = 'none';
                });
            });

            // Envio do formulário de divergências
            document.getElementById('divergenciaForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const button = this.querySelector('button[type="submit"]');
                const loadingMessage = document.getElementById('divergenciaLoadingMessage');
                
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
                loadingMessage.style.display = 'block';
                
                const formData = new FormData(this);
                
                fetch('https://script.google.com/macros/s/AKfycbw5xq6i5Qoc0s3f-ZaQ6FCZdsjXrC_my8d0tmgr756hWZQqT9Olu9DjsGOYwTlvnBQA/exec', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    alert('Divergência enviada com sucesso!');
                    this.reset();
                    document.getElementById('dataRecebimento').valueAsDate = new Date();
                    document.getElementById('outrosTransportadora').style.display = 'none';
                })
                .catch(error => {
                    alert('Erro ao enviar os dados!');
                })
                .finally(() => {
                    button.disabled = false;
                    button.innerHTML = 'ENVIAR DIVERGÊNCIA';
                    loadingMessage.style.display = 'none';
                });
            });
        });
    </script>
</body>
</html>
