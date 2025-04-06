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
            display: none; /* Inicialmente oculto */
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
        label {
            display: block;
            margin-bottom: 8px;
            color: #ddd;
            padding: 10px;
            border-radius: 4px;
            background-color: #555;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        label:hover {
            background-color: #666;
        }
        input[type="radio"], input[type="checkbox"] {
            margin-right: 10px;
        }
        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #666;
            border-radius: 4px;
            background-color: #555;
            color: white;
            font-size: 14px;
        }
        select {
            height: 46px;
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
            <h2 style="text-align: center; margin-bottom: 25px; color: #fff;">
                <i class="far fa-calendar-alt"></i> CADASTRO DE FOLGA FUNCIONÁRIOS
            </h2>
            
            <form id="folgaForm">
                <fieldset class="form-group" id="filialGroup">
                    <legend>Filial</legend>
                    <label><input type="radio" name="filial" value="ARTUR"> ARTUR</label>
                    <label><input type="radio" name="filial" value="FLORIANO"> FLORIANO</label>
                    <label><input type="radio" name="filial" value="JOTA"> JOTA</label>
                    <label><input type="radio" name="filial" value="MODA"> MODA</label>
                    <label><input type="radio" name="filial" value="PONTO"> PONTO</label>
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
                    <label><input type="radio" name="motivo" value="DOMINGO"> DOMINGO</label>
                    <label><input type="radio" name="motivo" value="FERIADO"> FERIADO</label>
                    <label><input type="radio" name="motivo" value="OUTROS"> OUTROS</label>
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
                <!-- Seu formulário de divergências existente aqui -->
            </form>
        </div>
    </div>
    
    <footer>
        HS Operações &copy; 2023 - Todos os direitos reservados
    </footer>

    <script>
        // Dados dos funcionários por filial
        const funcionariosPorFilial = {
            "ARTUR": ["FERNANDA", "LUCILENE"],
            "FLORIANO": ["FERNANDA", "MEIRE", "SARA", "THACIANNE"],
            "JOTA": ["BRUNO", "CARINA", "DENISE", "FABIOLA", "JÉSSICA", "LOUISE", "NATALIA", "PRISCILA", "RAYSSA", "VERA"],
            "MODA": ["ANA CLARA", "DAIANE", "JÉSSICA", "JÔSE CLAIR", "NAISE", "MARIA"],
            "PONTO": ["DANIELA", "DEBORA", "ISADORA", "PAULA", "PRISCILA", "SANDY", "SÔNIA"]
        };

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
            
            // Configura a data atual como padrão para o dia trabalhado
            document.getElementById('dataTrabalho').valueAsDate = new Date();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function showDivergenciaForm() {
            document.getElementById('main-container').style.display = 'none';
            document.getElementById('folga-container').style.display = 'none';
            document.getElementById('divergencia-container').style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

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

        // Mostrar campo "Outros" quando selecionado e validar datas
        document.querySelectorAll('input[name="motivo"]').forEach(function(radio) {
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

        // Envio do formulário de folgas
        document.getElementById('folgaForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
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
    </script>
</body>
</html>
