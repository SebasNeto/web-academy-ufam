CREATE TABLE IF NOT EXISTS livros (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(180) NOT NULL,
    sinopse TEXT NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    autores JSON NOT NULL,
    url_imagem TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO livros (id, nome, sinopse, isbn, autores, url_imagem) VALUES
('0fd97294-0f55-4d87-bf93-cdfd06f4182e', 'PostgreSQL: Banco de dados para aplicações web modernas', 'Uma introdução prática ao PostgreSQL, abordando funções, consultas, administração e os principais recursos desse banco de dados objeto-relacional.', '9788555192555', JSON_ARRAY('Vinícius Carvalho'), 'https://cdn.shopify.com/s/files/1/0155/7645/products/PostgreSQL_ebook_large.jpg?v=1631652465'),
('1f15f0d7-1f32-4fdf-a6e5-941d40afcecd', 'Data Structures and Algorithms in Java', 'Livro sobre estruturas de dados e algoritmos em Java, com exemplos, exercícios e demonstrações práticas.', '9780672324536', JSON_ARRAY('Robert Lafore'), 'https://m.media-amazon.com/images/I/41W+LyRF6NL._SX378_BO1,204,203,200_.jpg'),
('2adf30f4-b790-4358-a724-e7c8738d1bbd', 'Arquitetura de soluções IoT', 'Apresenta conceitos, técnicas e práticas para desenvolver soluções de Internet das Coisas, incluindo dispositivos, redes, protocolos, nuvem e segurança.', '9788555193217', JSON_ARRAY('Fernando Ferreira', 'Renato Manzan', 'Wellington Duraes'), 'https://cdn.shopify.com/s/files/1/0155/7645/products/p_885765c2-d786-43ae-a589-b37570237537_large.jpg?v=1665717063'),
('3c65b3d1-d684-438a-8db6-54c117a76369', 'O ladrão de raios', 'Primeiro volume da saga Percy Jackson e os Olimpianos, combinando mitologia grega e aventuras no mundo contemporâneo.', '9788580575392', JSON_ARRAY('Rick Riordan'), 'https://m.media-amazon.com/images/I/51yvcUb5tFL._SX323_BO1,204,203,200_.jpg'),
('4ef86665-c44e-49d1-b577-a5e74fa9ee10', 'As crônicas de Nárnia: O leão, a feiticeira e o guarda-roupa', 'Quatro irmãos atravessam um guarda-roupa e chegam a Nárnia, onde participam de uma aventura contra a Feiticeira Branca.', '9788578270889', JSON_ARRAY('C. S. Lewis'), 'https://m.media-amazon.com/images/I/51RpWTEgDvL._SX322_BO1,204,203,200_.jpg'),
('5d4282f4-c345-4eb4-bc07-e84762a8a907', 'The Hobbit', 'A clássica aventura de Bilbo Baggins pela Terra-média em uma jornada com anões, magos e dragões.', '9780261103344', JSON_ARRAY('J. R. R. Tolkien'), 'https://m.media-amazon.com/images/I/7103GCFdGDL.jpg');
