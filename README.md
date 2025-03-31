<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Folga Funcionários</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0ebf8;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            overflow-y: auto;
        }
        .form-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 600px;
            box-sizing: border-box;
            overflow: hidden;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group legend {
            font-size: 16px;
            font-weight: bold;
            color: #5f6368;
            margin-bottom: 10px;
        }
        .radio-group label, .select-group select {
            display: block;
            font-size: 14px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #dadce0;
            margin-bottom: 8px;
            cursor: pointer;
            background: #fff;
            transition: all 0.3s;
        }
        button {
            background: #673ab7;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            transition: background 0.3s;
        }
        #motivoOutros {
            display: none;
        }
        .back-btn {
            background-color: #f44336; /* Cor vermelha para o botão de voltar */
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
            display: block;
            margin-top: 20px;
            text-decoration: none;
            transition: background-color 0.3s;
        }
        .back-btn:hover {
            background-color: #e53935;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>CADASTRO DE FOLGA FUNCIONÁRIOS</h2>
        <form id="form" method="POST" action="https://script.google.com/macros/s/AKfycbwh-YUwL2o3_i-bfcV9RMzLcoI98vyyGwEXf4LHlG5KJ59gIAlUe1_VVlFQMBqU6PwR/exec">
            <fieldset class="form-group">
                <legend>Filial</legend>
                <div class="radio-group" id="filialGroup">
                    <label><input type="radio" name="filial" value="ARTUR"> ARTUR</label>
                    <label><input type="radio" name="filial" value="FLORIANO"> FLORIANO</label>
                    <label><input type="radio" name="filial" value="JOTA"> JOTA</label>
                    <label><input type="radio" name="filial" value="MODA"> MODA</label>
                    <label><input type="radio" name="filial" value="PONTO"> PONTO</label>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <legend>Funcionário</legend>
                <div class="select-group">
                    <select id="funcionario" name="funcionario">
                        <option value="">Selecione a filial primeiro</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form-group">
                <legend>Motivo da Folga</legend>
                <div class="radio-group">
                    <label><input type="radio" name="motivo" value="DOMINGO"> DOMINGO</label>
                    <label><input type="radio" name="motivo" value="FERIADO"> FERIADO</label>
                    <label><input type="radio" name="motivo" value="OUTROS"> OUTROS</label>
                </div>
            </fieldset>
            <fieldset class="form-group" id="motivoOutros">
                <legend>Especificar o Motivo</legend>
                <input type="text" name="outrosMotivo" placeholder="Escreva o motivo">
            </fieldset>
            <fieldset class="form-group">
                <legend>Data da Folga</legend>
                <input type="date" id="dataFolga" name="dataFolga">
            </fieldset>
            <button type="submit">Enviar</button>
        </form>

        <!-- Botão de Voltar ao Início -->
        <a href="https://seu-primeiro-site.com" class="back-btn">Voltar ao Início</a>
    </div>

    <script>
        const funcionariosPorFilial = {
            "ARTUR": ["LUCILENE", "FERNANDA"],
            "FLORIANO": ["MEIRE", "IOLANDA", "FERNANDA", "THACIANE", "SARA"],
            "JOTA": ["BRUNO", "VERA"],
            "MODA": ["DAYANE", "LAYANE", "JOSY", "MARIA", "JÉSSICA", "ANA CLARA"],
            "PONTO": ["SÔNIA", "SANDY", "PAULA", "MATHEUS", "PRISCILA", "DANIELA"]
        };

        document.getElementById('filialGroup').addEventListener('change', function() {
            var filialSelecionada = document.querySelector('input[name="filial"]:checked');
            var funcionarioSelect = document.getElementById('funcionario');

            funcionarioSelect.innerHTML = "";

            if (filialSelecionada) {
                var optionInicial = document.createElement("option");
                optionInicial.value = "";
                optionInicial.textContent = "Selecione um funcionário";
                funcionarioSelect.appendChild(optionInicial);
                
                funcionariosPorFilial[filialSelecionada.value].forEach(function(funcionario) {
                    var option = document.createElement("option");
                    option.value = funcionario;
                    option.textContent = funcionario;
                    funcionarioSelect.appendChild(option);
                });
            } else {
                var optionInicial = document.createElement("option");
                optionInicial.value = "";
                optionInicial.textContent = "Selecione a filial primeiro";
                funcionarioSelect.appendChild(optionInicial);
            }
        });

        document.querySelectorAll('input[name="motivo"]').forEach(function(radio) {
            radio.addEventListener('change', function() {
                const dataFolgaInput = document.getElementById("dataFolga");
                const motivoOutrosField = document.getElementById("motivoOutros");

                if (this.value === "DOMINGO") {
                    const hoje = new Date();
                    const seteDiasDepois = new Date(hoje);
                    seteDiasDepois.setDate(hoje.getDate() + 7);
                    dataFolgaInput.max = seteDiasDepois.toISOString().split('T')[0];
                } else if (this.value === "OUTROS") {
                    motivoOutrosField.style.display = "block";
                } else {
                    motivoOutrosField.style.display = "none";
                    dataFolgaInput.removeAttribute("max");
                }
            });
        });

        document.getElementById("form").addEventListener("submit", function(event) {
            event.preventDefault();

            let formData = new FormData(this);

            fetch(this.action, {
                method: "POST",
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert("Folga cadastrada com sucesso!");
                document.getElementById("form").reset();
                document.getElementById("funcionario").innerHTML = '<option value="">Selecione a filial primeiro</option>';
            })
            .catch(error => {
                alert("Erro ao enviar os dados!");
                console.error("Erro:", error);
            });
        });
    </script>
</body>
</html>
