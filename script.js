Dynamsoft.DBR.BarcodeScanner.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTA0NDIzNjk5LU1UQTBOREl6TmprNUxYZGxZaTFVY21saGJGQnliMm8iLCJtYWluU2VydmVyVVJMIjoiaHR0cHM6Ly9tZGxzLmR5bmFtc29mdG9ubGluZS5jb20iLCJvcmdhbml6YXRpb25JRCI6IjEwNDQyMzY5OSIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NkbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsImNoZWNrQ29kZSI6MTEzNzY0MDQxN30=";

    // === ENDPOINTS para envio paralelo (NOVO + ANTIGO) ===
    const APPWEB_NEW = "https://script.google.com/macros/s/AKfycbwUbsFzEiaBzI_q-WVWywEwWTBVl5eXfmVBN4McnnLNu-rTAnhc9BacOX2qCac8LlPReA/exec"; // novo app web (teste)
    const APPWEB_OLD = "https://script.google.com/macros/s/AKfycbxu_jVaotWytMOQh4UCZetFZFOxgk5ePrOkaviDd-qKNPiu2_8BjCaNczAVZzaDwAbj/exec"; // app web atual (produção)

    

    const funcionariosPorFilial = {
      "ARTUR": ["LUCILENE", "POLIANA", "TAINARA"],
      "FLORIANO": ["IOLANDA", "MEIRE", "SARA", "GABRYELLA"],
      "JOTA": ["BRUNO", "CARINA", "DENISE", "FABIOLA", "INGRID", "MARCOS", "RAYSSA", "VERA"],
      "MODA": ["ANA CLARA", "DAIANE", "JOANA", "MARCIA", "MARIA"],
      "PONTO": ["DANIELA", "EVANEUZA", "ISADORA", "PAULA", "PRISCILA", "SÔNIA", "SUELI"]
    };

    function atualizarFuncionarios() {
      const filialSelecionada = document.getElementById('filial-folgas').value;
      const funcionarioSelect = document.getElementById('funcionario-folgas');
      funcionarioSelect.innerHTML = "<option value=''>Selecione um funcionário</option>";

      if (filialSelecionada && funcionariosPorFilial[filialSelecionada]) {
        funcionariosPorFilial[filialSelecionada].forEach(function(funcionario) {
          const option = document.createElement("option");
          option.value = funcionario;
          option.textContent = funcionario;
          funcionarioSelect.appendChild(option);
        });
      }
    }

    document.getElementById('dataTrabalho-folgas').addEventListener('change', function() {
      const motivoSelect = document.getElementById('motivo-folgas');
      if (motivoSelect.value !== '') {
        verificarMotivo();
      }
    });

    document.getElementById('motivo-folgas').addEventListener('change', verificarMotivo);

    function verificarMotivo() {
      const motivo = document.getElementById('motivo-folgas').value;
      const dataTrabalhoInput = document.getElementById("dataTrabalho-folgas");
      const dataFolgaInput = document.getElementById("dataFolga-folgas");
      const motivoOutrosField = document.getElementById("motivoOutros-folgas");

      if (!dataTrabalhoInput.value) {
        alert("Selecione primeiro o 'Dia Trabalhado'! ");
        document.getElementById('motivo-folgas').value = '';
        return;
      }

      const dataTrabalho = new Date(dataTrabalhoInput.value + 'T00:00:00');
      const maxDate = new Date(dataTrabalho);

      if (motivo === "DOMINGO") {
        maxDate.setDate(dataTrabalho.getDate() + 7);
      } else if (motivo === "FERIADO" || motivo === "OUTROS") {
        maxDate.setDate(dataTrabalho.getDate() + 60);
      }

      dataFolgaInput.min = dataTrabalho.toISOString().split('T')[0];
      dataFolgaInput.max = maxDate.toISOString().split('T')[0];

      motivoOutrosField.style.display = motivo === "OUTROS" ? "block" : "none";
      
      if (motivo === "OUTROS") {
        document.getElementById('outrosMotivo-folgas').required = true;
      } else {
        document.getElementById('outrosMotivo-folgas').required = false;
      }
    }

    // ====== FOLGAS: envia para NOVO e ANTIGO em paralelo ======
    document.getElementById("form-folgas").addEventListener("submit", function (event) {
      event.preventDefault();
      const fdNew = new FormData(this);
      const fdOld = new FormData(this);

      Promise.allSettled([
        fetch(APPWEB_NEW, { method: "POST", body: fdNew }),
        fetch(APPWEB_OLD, { method: "POST", body: fdOld })
      ])
      .then(results => {
        const ok = results.some(r => r.status === "fulfilled");
        if (ok) {
          alert("Folga cadastrada com sucesso!");
          this.reset();
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
        }
      });
    });

    // ====== FALTA: envia para NOVO e ANTIGO em paralelo ======
    document.getElementById("form-falta").addEventListener("submit", function (event) {
      event.preventDefault();
      const fdNew = new FormData(this);
      const fdOld = new FormData(this);

      Promise.allSettled([
        fetch(APPWEB_NEW, { method: "POST", body: fdNew }),
        fetch(APPWEB_OLD, { method: "POST", body: fdOld })
      ])
      .then(results => {
        const ok = results.some(r => r.status === "fulfilled");
        if (ok) {
          alert("Falta cadastrada com sucesso!");
          this.reset();
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
        }
      });
    });

    // ====== SACOLA: envia para NOVO e ANTIGO em paralelo ======
    document.getElementById("form-sacola").addEventListener("submit", function (event) {
      event.preventDefault();
      const fdNew = new FormData(this);
      const fdOld = new FormData(this);

      Promise.allSettled([
        fetch(APPWEB_NEW, { method: "POST", body: fdNew }),
        fetch(APPWEB_OLD, { method: "POST", body: fdOld })
      ])
      .then(results => {
        const ok = results.some(r => r.status === "fulfilled");
        if (ok) {
          alert("Contagem de sacola enviada com sucesso!");
          this.reset();
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
      });
    });

    // ====== DIVERGENCIA: envia para NOVO e ANTIGO em paralelo ======
    function enviarFormularioDivergencia(event) {
      event.preventDefault();
      const form = document.getElementById('formulario-divergencia');
      const fdNew = new FormData(form);
      const fdOld = new FormData(form);

      document.getElementById('loadingMessageDiv').style.display = 'block';

      Promise.allSettled([
        fetch(APPWEB_NEW, { method: "POST", body: fdNew }),
        fetch(APPWEB_OLD, { method: "POST", body: fdOld })
      ])
      .then(results => {
        const ok = results.some(r => r.status === "fulfilled");
        if (ok) {
          alert("Divergência enviada com sucesso!");
          form.reset();
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
        document.getElementById('loadingMessageDiv').style.display = 'none';
      });
    }

    // ====== TRANSFERENCIA: envia para NOVO e ANTIGO em paralelo ======
    document.getElementById("transfer-form").addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      const fdNew = new FormData(form);
      const fdOld = new FormData(form);

      document.getElementById('loading-overlay-trans').style.display = 'flex';

      Promise.allSettled([
        fetch(APPWEB_NEW, { method: "POST", body: fdNew }),
        fetch(APPWEB_OLD, { method: "POST", body: fdOld })
      ])
      .then(results => {
        const ok = results.some(r => r.status === "fulfilled");
        if (ok) {
          alert("Transferência enviada com sucesso!");
          form.reset();
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
        document.getElementById('loading-overlay-trans').style.display = 'none';
      });
    });

    // Gerador de código de barras
    function gerarTodosBarras() {
      const codigos = document.getElementById('codigos-barras').value.split('\n').filter(c => c.trim() !== '');
      const container = document.getElementById('barcodes');
      container.innerHTML = '';

      codigos.forEach(codigo => {
        const item = document.createElement('div');
        item.className = 'barcode-item';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        try {
          JsBarcode(svg, codigo, {
            format: "EAN13",
            lineColor: "#000",
            width: 2,
            height: 60,
            displayValue: true,
            fontOptions: "bold",
            font: "monospace",
            fontSize: 16,
            textMargin: 5
          });
          item.appendChild(svg);
        } catch (e) {
          item.textContent = `Código inválido: ${codigo}`;
        }
        
        container.appendChild(item);
      });
    }

    function limparTudoBarras() {
      document.getElementById('codigos-barras').value = '';
      document.getElementById('barcodes').innerHTML = '';
    }

    function copiarCodigosBarras() {
      const codigos = document.getElementById('codigos-barras').value;
      navigator.clipboard.writeText(codigos).then(() => {
        alert('Códigos copiados para a área de transferência!');
      }, () => {
        alert('Falha ao copiar os códigos.');
      });
    }

    // Lógica de login e consulta de NF
    const senhasNF = {
      "ARTUR": "288",
      "FLORIANO": "287",
      "JOTA": "293",
      "MODA": "294",
      "PONTO": "295"
    };

    let filialLogadaNF = null;

    function entrarNF() {
      const codigo = document.getElementById('codigo-nf').value;
      const filial = Object.keys(senhasNF).find(key => senhasNF[key] === codigo);

      if (filial) {
        filialLogadaNF = filial;
        document.getElementById('login-nf').classList.add('hidden');
        document.getElementById('principal-nf').classList.remove('hidden');
        carregarHistoricoNF();
      } else {
        alert('Código da filial incorreto!');
      }
    }

    function sairNF() {
      filialLogadaNF = null;
      document.getElementById('login-nf').classList.remove('hidden');
      document.getElementById('principal-nf').classList.add('hidden');
      document.getElementById('codigo-nf').value = '';
    }

    async function consultarNotaNF() {
      const chave = document.getElementById('chave-nf').value;
      if (chave.length !== 44) {
        document.getElementById('erro-nf').textContent = 'A chave de acesso deve ter 44 dígitos.';
        return;
      }

      document.getElementById('loading-nf').classList.remove('hidden');
      document.getElementById('resultado-nf').classList.add('hidden');
      document.getElementById('erro-nf').textContent = '';

      try {
        const response = await fetch(`https://api.brasilaberto.com/v1/nfe/consulta?chave=${chave}`, {
          headers: { 'Authorization': 'Bearer SEU_TOKEN_BRASIL_ABERTO' } // Substitua pelo seu token
        });
        const data = await response.json();

        if (data.sucesso) {
          const resultado = `
            <h3>${data.resultado.emitente.nome}</h3>
            <p><strong>CNPJ:</strong> ${data.resultado.emitente.cnpj}</p>
            <p><strong>Valor:</strong> R$ ${data.resultado.valor}</p>
            <p><strong>Data:</strong> ${new Date(data.resultado.data_emissao).toLocaleDateString()}</p>
          `;
          document.getElementById('resultado-nf').innerHTML = resultado;
          document.getElementById('resultado-nf').classList.remove('hidden');
          adicionarAoHistoricoNF(chave, data.resultado.emitente.nome);
        } else {
          document.getElementById('erro-nf').textContent = data.erro || 'Erro ao consultar a nota fiscal.';
        }
      } catch (error) {
        document.getElementById('erro-nf').textContent = 'Erro na consulta. Verifique sua conexão ou a chave de acesso.';
      }

      document.getElementById('loading-nf').classList.add('hidden');
    }

    function adicionarAoHistoricoNF(chave, nomeEmitente) {
      if (!filialLogadaNF) return;

      const historico = JSON.parse(localStorage.getItem(`historicoNF_${filialLogadaNF}`)) || [];
      historico.unshift({ chave, nomeEmitente, data: new Date().toISOString() });
      if (historico.length > 20) historico.pop(); // Limita o histórico
      localStorage.setItem(`historicoNF_${filialLogadaNF}`, JSON.stringify(historico));
      carregarHistoricoNF();
    }

    function carregarHistoricoNF() {
      if (!filialLogadaNF) return;

      const historico = JSON.parse(localStorage.getItem(`historicoNF_${filialLogadaNF}`)) || [];
      const lista = document.getElementById('historicoLista-nf');
      lista.innerHTML = '';

      historico.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${new Date(item.data).toLocaleString()} - ${item.nomeEmitente} (${item.chave.substring(0, 6)}...)`;
        li.onclick = () => {
          document.getElementById('chave-nf').value = item.chave;
          consultarNotaNF();
        };
        lista.appendChild(li);
      });
    }

    function limparHistoricoLocalNF() {
      if (filialLogadaNF && confirm('Tem certeza que deseja limpar o histórico local desta filial?')) {
        localStorage.removeItem(`historicoNF_${filialLogadaNF}`);
        carregarHistoricoNF();
      }
    }

    let barcodeScanner = null;

    async function abrirLeitorNF() {
      try {
        if (!barcodeScanner) {
          barcodeScanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
          document.getElementById('scanner').appendChild(barcodeScanner.getUIElement());
        }
        barcodeScanner.onFrameRead = results => {
          if (results.length > 0) {
            const result = results[0];
            document.getElementById('chave-nf').value = result.barcodeText;
            fecharLeitorNF();
            consultarNotaNF();
          }
        };
        await barcodeScanner.show();
        document.getElementById('scanner').style.display = 'flex';
      } catch (ex) {
        alert(ex.message);
        console.error(ex);
      }
    }

    function fecharLeitorNF() {
      if (barcodeScanner) {
        barcodeScanner.hide();
        document.getElementById('scanner').style.display = 'none';
      }
    }

    // Lógica de inicialização para cada página, se necessário
    document.addEventListener('DOMContentLoaded', () => {
      // SACOLA: Preenche a data de contagem
      const dataContagemInput = document.getElementById('data-contagem');
      if (dataContagemInput) {
        dataContagemInput.value = new Date().toLocaleDateString('pt-BR');
      }

      // FALTA: Lógica para mostrar/esconder dias de afastamento
      const motivoFaltaSelect = document.getElementById('motivo-falta');
      if (motivoFaltaSelect) {
        motivoFaltaSelect.addEventListener('change', function() {
          const container = document.getElementById('dias-afastamento-container');
          if (this.value === 'ATESTADO MÉDICO') {
            container.style.display = 'block';
          } else {
            container.style.display = 'none';
          }
        });
      }

      // DIVERGENCIA: Lógica para mostrar/esconder outros transportadora
      const transportadoraDivSelect = document.getElementById('transportadora-div');
      if (transportadoraDivSelect) {
        transportadoraDivSelect.addEventListener('change', function() {
          const container = document.getElementById('outrosTransportadoraDiv');
          if (this.value === 'OUTROS') {
            container.style.display = 'block';
            document.getElementById('outraTransportadoraDiv').required = true;
          } else {
            container.style.display = 'none';
            document.getElementById('outraTransportadoraDiv').required = false;
          }
        });
      }

      // NF: Carregar histórico ao carregar a página se já estiver logado (embora o login seja manual)
      if (document.getElementById('principal-nf') && !document.getElementById('principal-nf').classList.contains('hidden')) {
        carregarHistoricoNF();
      }

      // FOLGAS: Popula a lista de funcionários na carga inicial, se a filial já estiver selecionada
      if (document.getElementById('filial-folgas')) {
        atualizarFuncionarios();
      }
    });
