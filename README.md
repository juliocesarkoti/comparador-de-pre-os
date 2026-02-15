# Comparador de Site

Projeto de demonstração para portfólio: um comparador visual de produtos com carrossel, busca local e modal de produto.

## Como rodar localmente

1. Abra a pasta do projeto no terminal:

```bash
cd comparador-de-site
```

2. Abra o `index.html` no navegador (duplo clique) ou sirva com um servidor simples:

```bash
# com Python 3
python3 -m http.server 8000
# abra http://localhost:8000
```

## Preparar para publicação (resumo rápido)

Opções populares:

- GitHub Pages (grátis para sites estáticos)
- Vercel (deploy automático via Git)
- Netlify (deploy automático via Git)

### Passos rápidos para GitHub + Pages

```bash
git init
git add .
git commit -m "Initial commit"
# crie um repositório no GitHub e adicione a origin, então:
git remote add origin git@github.com:SEU_USUARIO/NOME_REPO.git
git push -u origin main
```
Depois, em Settings → Pages, selecione branch `main` e pasta `/ (root)`.

### Passos rápidos para Vercel / Netlify

- Crie conta no Vercel/Netlify e conecte seu repositório GitHub.
- Import the repo and deploy. Ambos detectam sites estáticos e publicam automaticamente.

## Observações

- Para integrar login Google, adicione Firebase e variáveis de ambiente.
- Para produção, minifique CSS/JS e otimize imagens.

---

Se quiser, eu posso:
- inicializar git, criar commit e preparar instruções passo-a-passo para subir ao GitHub;
- configurar deploy automático no Vercel ou Netlify (só preciso que você autorize o acesso ao GitHub);
- gerar um `package.json` e tarefas de build para minificação.
