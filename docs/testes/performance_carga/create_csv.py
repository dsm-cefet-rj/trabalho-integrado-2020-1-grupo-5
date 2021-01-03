import csv

"""
    1000 Times

with open('mil_times.csv', 'w', newline='') as csvfile:
    fieldnames = ['nome']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for i in range(1,1001):
        writer.writerow({'nome': 'Time '+str(i)}) 
"""

"""
    1000 Jogadores

with open('mil_jogadores.csv', 'w', newline='') as csvfile:
    fieldnames = ['nome', 'data_nascimento']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
  
    writer.writeheader()
    for i in range(1,1001):
        writer.writerow({'nome': 'Jogador '+str(i), 'data_nascimento': '01/01/2021'}) 

"""

"""
    1000 Partidas

with open('mil_partidas.csv', 'w', newline='') as csvfile:
    fieldnames = ['data', 'arbitro', 'local', 'time_A', 'gols_time_A','time_B', 'gols_time_B', 'jogador_time_A', 'jogador_time_B']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
  
    writer.writeheader()
    for i in range(1,1001):
        writer.writerow({'data': '01/01/2021',
                        'arbitro': 'Arbitro '+str(i),
                        'local': 'Local '+str(i),
                        'time_A': 'Time A'+str(i),
                        'gols_time_A': i%2,
                        'time_B': 'Time B'+str(i),
                        'gols_time_B': i%3,
                        'jogador_time_A': 'Jogador A'+str(i),
                        'jogador_time_B': 'Jogador B'+str(i)}) 
"""

"""
    1000 Adms

with open('mil_adms.csv', 'w', newline='') as csvfile:
    fieldnames = ['nome', 'usuario', 'senha']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for i in range(1,1001):
        writer.writerow({'nome': 'Adm '+str(i), 'usuario': 'Usuario '+str(i), 'senha': i}) 
"""
