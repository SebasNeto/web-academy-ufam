import swaggerJsdoc from "swagger-jsdoc";

const port = Number(process.env.PORT ?? 4455);

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API da Loja Virtual",
      version: "1.0.0",
      description: "Documentação da ExpApi desenvolvida no Web Academy.",
    },
    servers: [
      {
        url: `http://localhost:${port}/v1`,
        description: "Servidor local",
      },
    ],
    tags: [
      { name: "Auth", description: "Cadastro, login e logout" },
      { name: "Produto", description: "CRUD de produtos" },
      { name: "Usuário", description: "CRUD de usuários" },
      { name: "Compra", description: "Carrinho e compras" },
      { name: "Idioma", description: "Cookie de idioma" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
        },
      },
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Teclado mecânico" },
            price: { type: "number", format: "double", example: 249.9 },
            stockQuantity: { type: "integer", example: 15 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateProduct: {
          type: "object",
          required: ["name", "price", "stockQuantity"],
          properties: {
            name: { type: "string", minLength: 3, maxLength: 100 },
            price: { type: "number", minimum: 0 },
            stockQuantity: { type: "integer", minimum: 0 },
          },
        },
        UpdateProduct: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 3, maxLength: 100 },
            price: { type: "number", minimum: 0 },
            stockQuantity: { type: "integer", minimum: 0 },
          },
        },
        Signup: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string", example: "Maria da Silva" },
            email: {
              type: "string",
              format: "email",
              example: "maria@email.com",
            },
            senha: { type: "string", format: "password", example: "12345678" },
          },
        },
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: { type: "string", format: "email" },
            senha: { type: "string", format: "password" },
          },
        },
        Usuario: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            tipoUsuarioId: { type: "string", format: "uuid" },
            nome: { type: "string" },
            email: { type: "string", format: "email" },
            criadoEm: { type: "string", format: "date-time" },
            atualizadoEm: { type: "string", format: "date-time" },
          },
        },
        CreateUsuario: {
          allOf: [
            { $ref: "#/components/schemas/Signup" },
            {
              type: "object",
              required: ["tipoUsuarioId"],
              properties: {
                tipoUsuarioId: { type: "string", format: "uuid" },
              },
            },
          ],
        },
        UpdateUsuario: {
          type: "object",
          properties: {
            tipoUsuarioId: { type: "string", format: "uuid" },
            nome: { type: "string" },
            email: { type: "string", format: "email" },
            senha: { type: "string", format: "password" },
          },
        },
        ItemCarrinho: {
          type: "object",
          required: ["produtoId", "quantidade"],
          properties: {
            produtoId: { type: "integer", example: 1 },
            quantidade: { type: "integer", minimum: 1, example: 2 },
          },
        },
      },
    },
  },
  apis: ["./src/resources/**/*.router.ts"],
});

export default swaggerSpec;
