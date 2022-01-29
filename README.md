# Kafka cli

Programa de prueba para el cliente de Kafka.

Se realizo con el fin de entender la arquitectura y funcionamiento de Apache KAFKA para Comparaonline.cl

## Instalación

## Instalar Kafka

```shell
docker-compose up -d
```

## Instalar dependencias node

```shell
yarn
```

## Uso

```shell
npx ts-node src/index.ts <consumer|producer> <topic>
```
