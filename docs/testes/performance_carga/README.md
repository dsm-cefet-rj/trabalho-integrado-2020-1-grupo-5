### Como utilizar o arquivo csv para imputar os dados no MongoDB

##### 1. Criar o arquivo csv com o "create_csv.py" fazendo as alterações necessárias.

##### 2. Usar a função a seguir no Mongo Shell.

```
  mongoimport -d futadm -c times --type csv --file mil_times.csv --headerline
```

###### **ATENÇÃO** O _DataBase_ '-d' e o _Collection_ '-c' devem estar de acordo com o utilizado na aplicação para evitar que o Mongo dê uma falsa mensagem positiva, enquanto na verdade, foi criado um no _DataBase_ ou _Collection_.

##### 3. Para alterar para o _DataBase_ da aplicação, utilize a função:
```
  mongo "mongodb://localhost:27017/futadm"
```
##### 4. Usar a função 'db ' no Mongo Shell para ter certeza que o _DataBase_ "futadm" está sendo utilizado no momento.

##### 5. Usar a função a seguir no Mongo Shell para verificar quantos registros há na _Collection_:
```
  db.collections.count() //Substituir collections pela qual deseja verificar (ex: times, partidas)
```
