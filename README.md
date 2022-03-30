# SHOM_IN

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and run the tests
```
npm run tests
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## GraphDB configuration for development 

Install graphDB and create a repository called test_shom.

Import the owl ontology file and the ttls knowledge base file into
a named graph.

In the graphDB settings (of the software not the web interface) set:<br>
- graphdb.workbench.cors.enable true <br>
- graphdb.workbench.cors.expose-headers *<br>
Set the port to 7200

Reload graphDB