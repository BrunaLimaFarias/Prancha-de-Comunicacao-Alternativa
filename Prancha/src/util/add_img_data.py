import os
import pymysql
import requests
import re

# Função para conectar ao banco de dados
def conectar_bd():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='root',
        database='prancha_comunicacao',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# URL do diretório onde as imagens estão hospedadas
url_diretorio_imagens = 'http://localhost/tcc/tcc_prancha_caa/Prancha/src/img/figuras/'

# Conecta ao banco de dados
conexao = conectar_bd()

try:
    # Prepara a query de inserção
    with conexao.cursor() as cursor:
        query = "INSERT INTO lista_figuras (titulo, img) VALUES (%s, %s)"

        # Faz uma solicitação HTTP para o diretório de imagens
        response = requests.get(url_diretorio_imagens)

        # Verifica se a solicitação foi bem-sucedida
        if response.status_code == 200:
            # Obtém o conteúdo da resposta
            conteudo = response.text

            # Divide o conteúdo em linhas
            linhas = conteudo.splitlines()

            # Loop pelas linhas
            for linha in linhas:
                # Extrai o nome do arquivo da URL usando expressões regulares
                match = re.search(r'/([^/]+\.\w+)$', linha)
                if match:
                    nome_arquivo = match.group(1)
                    
                    print("Nome do arquivo:", nome_arquivo)  # Debug

                    # Baixa o arquivo e salva localmente
                    with open(nome_arquivo, "wb") as f:
                        f.write(requests.get(linha).content)

                    # Executa a query de inserção
                    cursor.execute(query, (nome_arquivo, linha))
                else:
                    print("Não foi possível extrair o nome do arquivo da URL:", linha)

    # Confirma a transação
    conexao.commit()
    print("Figuras inseridas com sucesso!")

finally:
    # Fecha a conexão com o banco de dados
    conexao.close()
