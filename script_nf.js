/* ================= NF (Recuperado e corrigido para Apps Script) ================

- Login por código de filial (igual versão antiga).
- Consulta via Apps Script (URL_SCRIPT com ?chave= & filial=).
- Histórico local por filial (localStorage).
- Leitor Dynamsoft com fechamento automático.
*/

// URL do seu App Web (a mesma da versão antiga que você me mandou):
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwfoYOgleHUcmbr_1B8tV_NG6cEZxcHm5zBSrJ0ItgRV_Cp7tumh3GjBzsvzTSNJ5sbmA/exec";

// Códigos válidos (iguais aos que você usava antes)
const filiaisValidas = ["293", "488", "287", "288", "761"];

// Dynamsoft license (mantenha a sua)
Dynamsoft.DBR.BarcodeScanner.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTA0Nzg0MDQxLU1UQTBOemcwTURReExYZGxZaTFVY21saGJGQnliMm8iLCJtYWluU2VydmVyVVJMIjoiaHR0cHM6Ly9tZGxzLmR5bmFtc29mdG9ubGluZS5jb20iLCJvcmdhbml6YXRpb25JRCI6IjEwNDc4NDA0MSIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NkbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsImNoZWNrQ29kZSI6LTg1Njg0OTg3NX0=";

// Estado
let filialLogadaNF = null;
let scannerInstance = null;

// ------- Login / Logout -------
function entrarNF() {
  const codigo = document.getElementById('codigo-nf').value.trim();
  const erro = document.getElementById('erro-nf');
  erro.textContent = '';

  if (!codigo || !filiaisValidas.includes(codigo)) {
    erro.textContent = 'Código de filial inválido.';
    return;
  }
  localStorage.setItem('filial', codigo);
  filialLogadaNF = codigo;
  document.getElementById('login-nf').classList.add('hidden');
  document.getElementById('principal-nf').classList.remove('hidden');
  carregarHistoricoNF(codigo);
}

function sairNF() {
  localStorage.removeItem('filial');
  filialLogadaNF = null;
  document.getElementById('login-nf').classList.remove('hidden');
  document.getElementById('principal-nf').classList.add('hidden');
  document.getElementById('codigo-nf').value = '';
}

// ------- Consulta -------
async function consultarNotaNF() {
  const filial = filialLogadaNF || localStorage.getItem('filial');
  const chaveInput = document.getElementById('chave-nf');
  const chave = (chaveInput.value || '').trim();

  const loading = document.getElementById('loading-nf');
  const resultado = document.getElementById('resultado-nf');
  const erroEl = document.getElementById('erro-nf2');

  resultado.classList.add('hidden');
  erroEl.textContent = '';

  if (!filial || !filiaisValidas.includes(filial)) {
    erroEl.textContent = 'Faça login com o código da filial.';
    return;
  }
  if (chave.length !== 44) {
    erroEl.textContent = 'A chave de acesso deve ter 44 dígitos.';
    return;
  }

  // Bloqueia duplicidade local
  const historicoLocal = JSON.parse(localStorage.getItem(`historico_${filial}`)) || [];
  if (historicoLocal.some(h => h.chave === chave)) {
    erroEl.textContent = 'Essa chave já foi consultada anteriormente!';
    return;
  }

  loading.classList.remove('hidden');
  try {
    const url = `${URL_SCRIPT}?chave=${encodeURIComponent(chave)}&filial=${encodeURIComponent(filial)}`;
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();

    if (data.success) {
      const info = data.data || {};
      resultado.innerHTML = `
        <p><strong>Número da NF:</strong> ${info.numeroNF || '-'}</p>
        <p><strong>Valor Total:</strong> ${info.valorTotal || '-'}</p>
        <p><strong>Quantidade Total:</strong> ${info.quantidadeTotal || '-'}</p>
        <p><strong>Status:</strong> ${info.status ? '✅ ' + info.status : '-'}</p>
      `;
      resultado.classList.remove('hidden');

      historicoLocal.push({ chave, dataHora: new Date().toISOString(), ...info });
      localStorage.setItem(`historico_${filial}`, JSON.stringify(historicoLocal));
      carregarHistoricoNF(filial);
      chaveInput.value = '';
    } else {
      erroEl.textContent = data.message || 'Erro ao buscar nota fiscal.';
    }
  } catch (err) {
    erroEl.textContent = 'Erro de comunicação com o servidor.';
    console.error(err);
  } finally {
    loading.classList.add('hidden');
  }
}

// ------- Histórico -------
function carregarHistoricoNF(filial) {
  const lista = document.getElementById('historicoLista-nf');
  const historico = JSON.parse(localStorage.getItem(`historico_${filial}`)) || [];
  lista.innerHTML = '';
  if (historico.length === 0) {
    lista.innerHTML = '<li>Nenhum histórico local encontrado.</li>';
    return;
  }
  historico.slice().reverse().forEach(item => {
    const data = new Date(item.dataHora).toLocaleString('pt-BR');
    const li = document.createElement('li');
    li.textContent = `${data} - NF ${item.numeroNF || ''} - ${item.valorTotal || ''} - ${item.quantidadeTotal || ''} itens`;
    li.onclick = () => {
      document.getElementById('chave-nf').value = item.chave;
      consultarNotaNF();
    };
    lista.appendChild(li);
  });
}

function limparHistoricoLocalNF() {
  const filial = filialLogadaNF || localStorage.getItem('filial');
  if (!filial) return;
  if (confirm('Tem certeza que deseja limpar o histórico local desta filial?')) {
    localStorage.removeItem(`historico_${filial}`);
    carregarHistoricoNF(filial);
  }
}

// ------- Leitor Dynamsoft -------
async function abrirLeitorNF() {
  const chaveInput = document.getElementById("chave-nf");
  const scannerDiv = document.getElementById("scanner");

  if (chaveInput.value.trim() !== '') {
    alert("Limpe o campo antes de escanear outro código.");
    return;
  }

  try {
    if (scannerInstance) {
      await scannerInstance.destroyContext();
      scannerInstance = null;
    }
    scannerDiv.style.display = "flex";
    scannerInstance = await Dynamsoft.DBR.BarcodeScanner.createInstance();
    await scannerInstance.updateRuntimeSettings("speed");

    scannerInstance.onFrameRead = results => {
      for (let result of results) {
        const codigo = result.barcodeText || '';
        if (codigo.length >= 44) {
          chaveInput.value = codigo.substring(0, 44);
          scannerInstance.hide();
          scannerDiv.style.display = "none";
          consultarNotaNF();
          return;
        }
      }
    };

    await scannerInstance.show(scannerDiv);
  } catch (ex) {
    alert("Erro ao iniciar o leitor: " + ex.message);
    scannerDiv.style.display = "none";
  }
}

// ------- Eventos -------
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-entrar-nf').addEventListener('click', entrarNF);
  document.getElementById('btn-sair-nf').addEventListener('click', sairNF);
  document.getElementById('btn-consultar-nf').addEventListener('click', consultarNotaNF);
  document.getElementById('btn-leitor-nf').addEventListener('click', abrirLeitorNF);
  document.getElementById('btn-limpar-nf').addEventListener('click', limparHistoricoLocalNF);

  // Se já estava logado, reabre automaticamente
  const filial = localStorage.getItem('filial');
  if (filial && filiaisValidas.includes(filial)) {
    filialLogadaNF = filial;
    document.getElementById('login-nf').classList.add('hidden');
    document.getElementById('principal-nf').classList.remove('hidden');
    carregarHistoricoNF(filial);
  }
});

console.log('%cNF carregada (Apps Script) ✓', 'color:#7fff7f');