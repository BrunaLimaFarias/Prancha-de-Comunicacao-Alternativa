import os
import mysql.connector

db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost:3306',
    'database': 'prancha_comunicacao'
}

# dir onde as imagens estão armazenadas
diretorio = './img/figuras/'

def inserir_figuras(diretorio):
    # Conectar ao banco de dados
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Preparar a query de inserção
    query = "INSERT INTO lista_figuras (titulo, img) VALUES (%s, %s)"

    # Percorrer o diretório e inserir as figuras
    for nome_arquivo in os.listdir(diretorio):
        if nome_arquivo.endswith('jpg'):
            caminho_arquivo = os.path.join(diretorio, nome_arquivo)
            titulo = os.path.splitext(nome_arquivo)[0]  # Remover a extensão do nome do arquivo

            try:
                cursor.execute(query, (titulo, caminho_arquivo))
                print(f"Figura '{titulo}' inserida com sucesso!")
            except mysql.connector.Error as err:
                print(f"Erro ao inserir a figura '{titulo}': {err}")

    # Confirmar as alterações e fechar a conexão
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    inserir_figuras(diretorio)
