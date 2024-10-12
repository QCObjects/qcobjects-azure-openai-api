# QCObjects OpenAI API

# Install 

```shell
npm i qcobjects-azure-openai-api
```

# Setup in your config.json

```json
"backend":{
    "routes":[
        {
          "name":"QCObjects Open AI API Proxy",
          "description":"This endpoint returns same response like if you were calling to OpenAI API",
          "path": "^/api/openai$",
          "microservice":"qcobjects-azure-openai-api",
          "headers": {
            "content-type": "text/html; charset=utf-8"
          },
          "responseHeaders":{
          },
          "cors":{
            "allow_origins":"*"
          }
        }
    ]
}
```

# The way of using it 

```javascript
import {chatbotComponent} from "qcobjects-azure-openai-api/components";

document.addEventListener("DOMContentLoaded", ()=>{
    document.body.append(chatbotComponent.body);
});
```

# Visit

Visit https://localhost:port/api/openai

# Create your own microservice

To make your own microservice, you can generate it with QCObjects CLI using this package as template:

```shell
qcobjects create --custom=qcobjects-azure-openai-api myown-handler-microservice
```

