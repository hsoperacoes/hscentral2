<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consulta de Nota Fiscal - HS</title>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.21/dist/dbr.js"></script>
  <style>
    * {
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    body {
      background-color: #000;
      color: #fff;
      margin: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .form-container {
      max-width: 600px;
      background: #1e1e1e;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      color: white;
      width: 100%;
    }
    .logo {
      display: block;
      margin: 0 auto 20px;
      max-width: 100px;
    }
    h2 {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }
    input, button {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border-radius: 4px;
      font-size: 16px;
    }
    input {
      background-color: #2a2a2a;
      color: white;
      border: 1px solid #444;
    }
    button {
      background-color: #673ab7;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 600;
      margin-top: 10px;
    }
    button:hover {
      background-color: #5e35b1;
    }
    #reader-nf {
      width: 100%;
      max-width: 350px;
      margin: 20px auto;
    }
    #interactive-nf {
      width: 100%;
      height: 240px;
      position: relative;
    }
    .hidden {
      display: none;
    }
    .loading {
      text-align: center;
      font-style: italic;
      margin: 10px 0;
      color: #1a73e8;
    }
    .result {
      margin-top: 20px;
      padding: 15px;
      background: #2a2a2a;
      border-radius: 4px;
    }
    #erro-nf {
      color: #d93025;
      margin: 10px 0;
    }
    .history {
      margin-top: 30px;
    }
    .history ul {
      list-style: none;
      padding: 0;
    }
    .history li {
      padding: 8px 0;
      border-bottom: 1px solid #444;
    }
    #stop-scanner {
      background-color: #f44336;
      margin-top: 10px;
    }
    #stop-scanner:hover {
      background-color: #d32f2f;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <img src="logo.png" alt="Logo HS" class="logo">
    <h2>Consulta de Nota Fiscal</h2>
    
    <label for="chave-nf">Chave de Acesso (44 dígitos)</label>
    <input type="text" id="chave-nf" placeholder="Digite a chave completa" maxlength="44">
    
    <button onclick="consultarNotaNF()">Consultar</button>
    <button onclick="iniciarScannerNF()">📷 Escanear Código</button>
    
    <div id="reader-nf" class="hidden">
      <div id="interactive-nf"></div>
      <button id="stop-scanner" onclick="pararScannerNF()">Parar Scanner</button>
    </div>
    
    <div id="loading-nf" class="loading hidden">⏳ Consultando nota fiscal...</div>
    <div id="erro-nf"></div>
    <div id="resultado-nf" class="result hidden"></div>
    
    <div class="history">
      <h3>Histórico de Consultas</h3>
      <ul id="historicoLista-nf"></ul>
      <button onclick="limparHistoricoLocalNF()">🗑 Limpar Histórico</button>
    </div>
  </div>

  <script>
    // Variáveis globais
    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwfoYOgleHUcmbr_1B8tV_NG6cEZxcHm5zBSrJ0ItgRV_Cp7tumh3GjBzsvzTSNJ5sbmA/exec";
    let scannerNF = null;
    const filial = {
      codigo: "288", // Código padrão (altere conforme necessário)
      nome: "PONTO"
    };

    // Inicializar o scanner Dynamsoft
    async function inicializarScannerDynamsoft() {
      try {
        // Configura a licença do Dynamsoft
        Dynamsoft.DBR.BarcodeScanner.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
        
        // Cria uma instância do scanner
        scannerNF = await Dynamsoft.DBR.BarcodeScanner.createInstance();
        
        // Configurações do scanner (apenas código 128)
        let settings = await scannerNF.getRuntimeSettings();
        settings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_CODE_128;
        await scannerNF.updateRuntimeSettings(settings);
        
        // Define o elemento onde o scanner será renderizado
        scannerNF.setUIElement(document.getElementById('interactive-nf'));
        
        // Evento quando um código é lido
        scannerNF.onUnduplicatedRead = (txt, result) => {
          if (txt && txt.length >= 44) {
            document.getElementById("chave-nf").value = txt.substring(0, 44);
            pararScannerNF();
            document.getElementById("chave-nf").focus();
          }
        };
        
        return true;
      } catch (ex) {
        console.error(ex);
        alert("Erro ao inicializar o scanner: " + ex.message);
        return false;
      }
    }

    // Iniciar o scanner
    async function iniciarScannerNF() {
      const readerDiv = document.getElementById("reader-nf");
      readerDiv.classList.remove("hidden");
      
      if (!scannerNF) {
        const inicializado = await inicializarScannerDynamsoft();
        if (!inicializado) return;
      }
      
      try {
        await scannerNF.show();
      } catch (ex) {
        console.error(ex);
        alert("Erro ao iniciar o scanner: " + ex.message);
      }
    }

    // Parar o scanner
    function pararScannerNF() {
      if (scannerNF) {
        scannerNF.hide();
      }
      document.getElementById("reader-nf").classList.add("hidden");
    }

    // Consultar nota fiscal
    function consultarNotaNF() {
      const chave = document.getElementById('chave-nf').value.trim();
      const resultado = document.getElementById('resultado-nf');
      const erro = document.getElementById('erro-nf');
      const loading = document.getElementById('loading-nf');

      resultado.classList.add('hidden');
      erro.innerText = '';

      if (!chave || chave.length !== 44) {
        erro.innerText = 'Preencha corretamente a chave com 44 dígitos.';
        return;
      }

      const historico = JSON.parse(localStorage.getItem(`historico_${filial.codigo}`)) || [];
      if (historico.find(h => h.chave === chave)) {
        erro.innerText = 'Essa chave já foi consultada anteriormente!';
        return;
      }

      loading.classList.remove('hidden');

      fetch(`${URL_SCRIPT}?chave=${chave}&filial=${filial.codigo}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            resultado.classList.remove('hidden');
            resultado.innerHTML = `
              <p><strong>Número da NF:</strong> ${data.data.numeroNF}</p>
              <p><strong>Valor Total:</strong> ${data.data.valorTotal}</p>
              <p><strong>Quantidade Total:</p> ${data.data.quantidadeTotal}</p>
              <p><strong>Status:</strong> ✅ ${data.data.status}</p>
            `;
            
            // Adiciona ao histórico
            historico.push({ 
              chave, 
              dataHora: new Date().toISOString(), 
              numeroNF: data.data.numeroNF, 
              valorTotal: data.data.valorTotal, 
              quantidade: data.data.quantidadeTotal 
            });
            localStorage.setItem(`historico_${filial.codigo}`, JSON.stringify(historico));
            carregarHistoricoNF();
          } else {
            erro.innerText = data.message || 'Erro ao buscar nota fiscal.';
          }
        })
        .catch(() => erro.innerText = 'Erro de comunicação com o servidor.')
        .finally(() => {
          loading.classList.add('hidden');
        });
    }

    // Carregar histórico
    function carregarHistoricoNF() {
      const historicoLista = document.getElementById('historicoLista-nf');
      const historico = JSON.parse(localStorage.getItem(`historico_${filial.codigo}`)) || [];
      
      historicoLista.innerHTML = historico.length === 0 
        ? '<li>Nenhuma consulta realizada ainda.</li>' 
        : historico
            .slice()
            .reverse()
            .map(registro => {
              const dt = new Date(registro.dataHora);
              return `<li>${dt.toLocaleDateString('pt-BR')} - NF ${registro.numeroNF} - ${registro.quantidade} itens</li>`;
            })
            .join('');
    }

    // Limpar histórico
    function limparHistoricoLocalNF() {
      const senha = prompt("Digite a senha para limpar o histórico:");
      if (senha !== "hs") {
        alert("Senha incorreta. Operação cancelada.");
        return;
      }
      localStorage.removeItem(`historico_${filial.codigo}`);
      carregarHistoricoNF();
      alert("Histórico local apagado.");
    }

    // Carregar histórico ao iniciar
    document.addEventListener('DOMContentLoaded', carregarHistoricoNF);
  </script>
</body>
</html>
