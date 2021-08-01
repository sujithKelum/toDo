# Dockerized-NginX-NextJS-Mysql
Make your NextJS app in /nestjs and run in real server or aws with nginx without terrible configuration.

## Docker
## Need first
go to project folder and run
```sh
npm install
```
add host record (linux)
```sh
sudo gedit /etc/host
```
add host record (Windows)
```sh
windows/system32/drivers/etc/hosts
```
## Noted:first time you run,'PermissionError: [Errno 13] Permission denied: '<path>/mysql/' Error Message

```sh
remove mysql folder
```
first time
```sh
docker-compose up --build 
```
Start

```sh
docker-compose up 
```

Stop

```sh
docker-compose stop

```

## Database
```sh
docker exec -it users_app_db bash
```
then
```sh
mysql -u root -p 
```
## Database use in mysql workbench 

```sh
127.0.0.1:3322
```

