# Kafka cli

Para realizar pruebas en kafka desde la consola, recibe los eventos o emite de ser necesario.

## Instalación

- Clona el repositorio

```shell
git clone git@github.com:davidsuarezcdo/kafka-client-test.git
```

- Haz un `yarn` para instalar las dependencias

```shell
yarn
```

- Añade index.js del build a tu archivo alias

```shell
alias kafka="node ~/kafka-client-test/build/index.js"
```

## Uso

### Suscribirse a un solo o multiples topicos

```shell
kafka consumer <topic> <topic> <topic>
```

### Emisión a topicos

```shell
kafka producer <topic>
```

### Configuración de perfil

```shell
kafka profile:create <name> <server:port>
```

### Listar perfiles

```shell
kafka profile:list
```

### Selección de perfil

```shell
kafka profile <name>
```
