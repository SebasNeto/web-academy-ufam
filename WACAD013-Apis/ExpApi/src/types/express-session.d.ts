import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    userTypeId?: string;
    carrinho?: Array<{
      produtoId: number;
      quantidade: number;
    }>;
  }
}
