# Relatórios de Testes com Mochawesome

Este projeto utiliza o **Mochawesome** para gerar relatórios simples dos testes da API.

## Scripts Disponíveis

### 1. Executar Testes com Relatório
```bash
npm run test:report
```
- Executa todos os testes
- Gera relatório HTML e JSON na pasta `reports/`
- Mostra o status dos testes, detalhes e um resumo simples

### 2. Executar Testes Simples (sem relatório)
```bash
npm test
```
- Executa os testes no terminal
- Sem geração de relatórios

## Arquivos Gerados

Após executar `npm run test:report`, os seguintes arquivos são criados:

- `reports/test-report.html` - Relatório visual simples
- `reports/test-report.json` - Dados estruturados do relatório
- `reports/assets/` - Recursos visuais (CSS, JS, imagens)

## Características do Relatório

- Resumo dos testes executados
- Status de cada teste (passou/falhou/pulou)
- Stack trace para falhas
- Interface responsiva e fácil de navegar

## Como Visualizar

1. Execute `npm run test:report`
2. Abra o arquivo `reports/test-report.html` no navegador

## Configuração Personalizada

O arquivo `mochawesome-config.json` permite personalizar:
- Título do relatório
- Diretório de saída
- Inclusão de screenshots
- Formato de saída (HTML/JSON)
- Opções visuais

## Exemplo de Uso

```bash
# Executar testes e gerar relatório
npm run test:report

# Abrir relatório no navegador (Windows)
start reports/test-report.html

# Abrir relatório no navegador (Linux/Mac)
open reports/test-report.html
```

## Benefícios

✅ **Visualização Clara**: Relatórios fáceis de entender
✅ **Detalhamento**: Informações completas sobre cada teste
✅ **Histórico**: Mantém histórico de execuções
✅ **Compartilhamento**: Relatórios podem ser compartilhados com a equipe
✅ **Análise**: Facilita identificação de problemas e melhorias 