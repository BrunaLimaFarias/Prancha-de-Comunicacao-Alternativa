import os
import mysql.connector
from mysql.connector import Error

def connect_to_mysql():
    try:
        connection = mysql.connector.connect(
            host='localhost:3306',
            database='prancha_comunicacao',
            user='root',
            password='root'
        )
        if connection.is_connected():
            print('Conectado ao MySQL!')
            return connection
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None

def insert_image_into_database(connection, title, image_path):
    try:
        cursor = connection.cursor()
        title = os.path.basename(image_path).split('.')[0]  # Extrai o título do nome do arquivo
        sql_insert_query = """INSERT INTO lista_figuras
                          (titulo, img) VALUES (%s, %s)"""

        insert_tuple = (title, image_path)
        cursor.execute(sql_insert_query, insert_tuple)
        connection.commit()
        print("Imagem inserida com sucesso no banco de dados!")
    except Error as e:
        print(f"Erro ao inserir imagem no banco de dados: {e}")


if __name__ == "__main__":
    connection = connect_to_mysql()
    if connection:
        insert_image_into_database(connection, "./img/imagem.jpg")
    if connection:
        connection.close()