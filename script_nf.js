// ====================== SCRIPT NF COMPLETO =========================

const senhasNF = {
  "ARTUR": "288",
  "FLORIANO": "287",
  "JOTA": "293",
  "MODA": "294",
  "PONTO": "295"
};

let filialLogadaNF = null;
let barcodeScanner = null;

// === LOGIN ===
function entrarNF() {
  const codigo = document.getElementById("codigo-nf").value.trim();
  const filial = Object.keys(senhasNF).find(key => senhasNF[key] === codigo);

  if (filial) {
    filialLogadaNF = filial;
    document.getElementById("login-nf").classList.add("hidden");
    document.getElementById("principal-nf").classList.remove("hidden");
    carregarHistoricoNF();
  } else {
    document.getElementById("erro-nf").textContent = "Código da filial incorreto!";
  }
}

function sairNF() {
  filialLogadaNF = null;
  document.getElementById("login-nf").classList.remove("hidden");
  document.getElementById("principal-nf").classList.add("hidden");
  document.getElementById("codigo-nf").value = "";
}

// === CONSULTA NF ===
async function consultarNotaNF() {
  const chave = document.getElementById("chave-nf").value.trim();
  const erro = document.getElementById("erro-nf");
  const loading = document.getElementById("loading-nf");
  const resultado = document.getElementById("resultado-nf");

  erro.textContent = "";
  resultado.classList.add("hidden");
  loading.classList.remove("hidden");

  if (chave.length !== 44) {
    erro.textContent = "A chave de acesso deve ter 44 dígitos.";
    loading.classList.add("hidden");
    return;
  }

  try {
    const response = await fetch(`https://api.brasilaberto.com/v1/nfe/consulta?chave=${chave}`, {
      headers: { "Authorization": "Bearer SEU_TOKEN_BRASIL_ABERTO" }
    });
    const data = await response.json();

    if (data.sucesso && data.resultado) {
      const nf = data.resultado;
      resultado.innerHTML = `
        <h3>${nf.emitente?.nome || "Emitente Desconhecido"}</h3>
        <p><strong>CNPJ:</strong> ${nf.emitente?.cnpj || "-"}</p>
        <p><strong>Valor:</strong> R$ ${nf.valor || "-"}</p>
        <p><strong>Data:</strong> ${new Date(nf.data_emissao).toLocaleDateString("pt-BR")}</p>
      `;
      resultado.classList.remove("hidden");
      adicionarAoHistoricoNF(chave, nf.emitente?.nome || "Emitente");
    } else {
      erro.textContent = data.erro || "Erro ao consultar a nota fiscal.";
    }
  } catch (error) {
    erro.textContent = "Erro na consulta. Verifique sua conexão ou a chave de acesso.";
  }

  loading.classList.add("hidden");
}

// === HISTÓRICO LOCAL ===
function adicionarAoHistoricoNF(chave, nomeEmitente) {
  if (!filialLogadaNF) return;
  const historico = JSON.parse(localStorage.getItem(`historicoNF_${filialLogadaNF}`)) || [];
  historico.unshift({ chave, nomeEmitente, data: new Date().toISOString() });
  if (historico.length > 20) historico.pop();
  localStorage.setItem(`historicoNF_${filialLogadaNF}`, JSON.stringify(historico));
  carregarHistoricoNF();
}

function carregarHistoricoNF() {
  if (!filialLogadaNF) return;
  const historico = JSON.parse(localStorage.getItem(`historicoNF_${filialLogadaNF}`)) || [];
  const lista = document.getElementById("historicoLista-nf");
  lista.innerHTML = "";

  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${new Date(item.data).toLocaleString()} - ${item.nomeEmitente} (${item.chave.substring(0, 6)}...)`;
    li.onclick = () => {
      document.getElementById("chave-nf").value = item.chave;
      consultarNotaNF();
    };
    lista.appendChild(li);
  });
}

function limparHistoricoLocalNF() {
  if (filialLogadaNF && confirm("Tem certeza que deseja limpar o histórico local desta filial?")) {
    localStorage.removeItem(`historicoNF_${filialLogadaNF}`);
    carregarHistoricoNF();
  }
}

// === LEITOR DYNAMSOFT ===
async function abrirLeitorNF() {
  try {
    if (!barcodeScanner) {
      barcodeScanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
      document.getElementById("scanner").appendChild(barcodeScanner.getUIElement());
    }

    barcodeScanner.onFrameRead = results => {
      if (results.length > 0) {
        const result = results[0];
        document.getElementById("chave-nf").value = result.barcodeText;
        fecharLeitorNF();
        consultarNotaNF();
      }
    };

    await barcodeScanner.show();
    document.getElementById("scanner").style.display = "flex";
  } catch (ex) {
    alert("Erro ao abrir leitor: " + ex.message);
    console.error(ex);
  }
}

function fecharLeitorNF() {
  if (barcodeScanner) {
    barcodeScanner.hide();
    document.getElementById("scanner").style.display = "none";
  }
}

// === EVENTOS ===
document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("btn-entrar-nf");
  const btnSair = document.getElementById("btn-sair-nf");
  const btnConsultar = document.getElementById("btn-consultar-nf");
  const btnLeitor = document.getElementById("btn-leitor-nf");
  const btnLimpar = document.getElementById("btn-limpar-nf");

  if (btnEntrar) btnEntrar.onclick = entrarNF;
  if (btnSair) btnSair.onclick = sairNF;
  if (btnConsultar) btnConsultar.onclick = consultarNotaNF;
  if (btnLeitor) btnLeitor.onclick = abrirLeitorNF;
  if (btnLimpar) btnLimpar.onclick = limparHistoricoLocalNF;
});

console.log("%c✅ NF pronta e funcional", "color: #00ff99; font-weight: bold;");
