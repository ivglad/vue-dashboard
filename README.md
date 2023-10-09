# vue-dashboard
###### _Базовый drag-and-drop интерфейс на Vue.js_

### Инструкция
###### Необходимо установить в зависимости от платформы:
`Windows`
- WSL2
- Образ Ubuntu для wsl
- Docker desktop (или установленный Docker engine в wsl)

`Linux`
- Docker engine или Docker-desktop

###### Запуск
1. Скачать проект c репозитория
2. В папке с проектом ввести команду `docker-compose up -d` (или `docker compose up -d`)

Запускаемые контейнеры 
- Reverse proxy (`nginx`)
- Client (`vue.js`)

###### Использование

После старта всех сервисов Вам будут доступны:
1. Веб-интерфейс http://localhost:7001