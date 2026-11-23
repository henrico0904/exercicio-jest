const {
    calcularMedia,
    verificarAprovacao,
    classificarFaixaEtaria,
    converterKmParaMilhas,
    gerarEmailCorporativo,
    adicionarItemCarrinho,
    calcularSalarioLiquido,
    criarProduto,
    ehTrianguloValido,
    removerElemento,
} = require('./exercicios');

describe('🧪 Suíte de Testes Unitários - 10 Regras de Negócio', () => {
    // 1. Teste 1 (calcularMedia)
    test('1. calcularMedia deve calcular médias corretamente e validar notas fora do intervalo [0, 10]', () => {
        expect(calcularMedia(7, 8, 9)).toBe(8);
        expect(calcularMedia(7.5, 8.0, 9.0)).toBeCloseTo(8.17, 2);

        expect(() => calcularMedia(-1, 8, 9)).toThrow('Nota inválida: deve estar entre 0 e 10');
        expect(() => calcularMedia(7, 11, 9)).toThrow('Nota inválida: deve estar entre 0 e 10');
    });

    // 2. Teste 2 (verificarAprovacao)
    test('2. verificarAprovacao deve validar critérios de média >= 7.0 e frequência >= 75%', () => {
        expect(verificarAprovacao(7.0, 75)).toBe(true);
        expect(verificarAprovacao(8.5, 80)).toBe(true);
        expect(verificarAprovacao(6.9, 90)).toBe(false);
        expect(verificarAprovacao(9.0, 74)).toBe(false);
    });

    // 3. Teste 3 (classificarFaixaEtaria)
    test('3. classificarFaixaEtaria deve classificar todas as faixas etárias e rejeitar idade negativa', () => {
        expect(classificarFaixaEtaria(10)).toBe('Criança');
        expect(classificarFaixaEtaria(15)).toBe('Adolescente');
        expect(classificarFaixaEtaria(25)).toBe('Adulto');
        expect(classificarFaixaEtaria(65)).toBe('Idoso');

        expect(() => classificarFaixaEtaria(-5)).toThrow('Idade não pode ser negativa');
    });

    // 4. Teste 4 (converterKmParaMilhas)
    test('4. converterKmParaMilhas deve converter quilômetros para milhas e rejeitar distância negativa', () => {
        expect(converterKmParaMilhas(10)).toBeCloseTo(6.21, 2);
        expect(converterKmParaMilhas(0)).toBe(0);

        expect(() => converterKmParaMilhas(-10)).toThrow('Distância não pode ser negativa');
    });

    // 5. Teste 5 (gerarEmailCorporativo)
    test('5. gerarEmailCorporativo deve formatar e sanitizar nomes e domínios corretamente', () => {
        expect(gerarEmailCorporativo('Lucas', 'Silva', 'empresa.com')).toBe(
            'lucas.silva@empresa.com',
        );
        expect(gerarEmailCorporativo('  Ana ', ' Souza  ', 'TECH.IO')).toBe('ana.souza@tech.io');
    });

    // 6. Teste 6 (adicionarItemCarrinho)
    test('6. adicionarItemCarrinho deve retornar um novo array com o item adicionado sem mutar o original', () => {
        const carrinhoInicial = ['Monitor', 'Mouse'];
        const novoCarrinho = adicionarItemCarrinho(carrinhoInicial, 'Teclado');

        expect(novoCarrinho).toEqual(['Monitor', 'Mouse', 'Teclado']);
        expect(novoCarrinho).toHaveLength(3);
        expect(carrinhoInicial).toHaveLength(2);
        expect(carrinhoInicial).toEqual(['Monitor', 'Mouse']);
    });

    // 7. Teste 7 (calcularSalarioLiquido)
    test('7. calcularSalarioLiquido deve calcular o desconto corretamente e validar entradas inválidas', () => {
        expect(calcularSalarioLiquido(3000, 10)).toBe(2700);
        expect(calcularSalarioLiquido(5000, 0)).toBe(5000);

        expect(() => calcularSalarioLiquido(0, 10)).toThrow(
            'Valores de salário ou desconto inválidos',
        );
        expect(() => calcularSalarioLiquido(-1000, 10)).toThrow(
            'Valores de salário ou desconto inválidos',
        );
        expect(() => calcularSalarioLiquido(3000, -5)).toThrow(
            'Valores de salário ou desconto inválidos',
        );
    });

    // 8. Teste 8 (criarProduto)
    test('8. criarProduto deve retornar o objeto produto com emEstoque: true e validar preço > 0', () => {
        const produto = criarProduto(1, 'Monitor', 899.9, 'Informática');

        expect(produto).toEqual({
            id: 1,
            nome: 'Monitor',
            preco: 899.9,
            categoria: 'Informática',
            emEstoque: true,
        });

        expect(() => criarProduto(2, 'Cabo HDMI', 0, 'Acessórios')).toThrow(
            'Preço deve ser maior que zero',
        );
        expect(() => criarProduto(3, 'Mousepad', -50, 'Acessórios')).toThrow(
            'Preço deve ser maior que zero',
        );
    });

    // 9. Teste 9 (ehTrianguloValido)
    test('9. ehTrianguloValido deve verificar a desigualdade triangular e lados positivos', () => {
        expect(ehTrianguloValido(3, 4, 5)).toBe(true);
        expect(ehTrianguloValido(1, 2, 10)).toBe(false);
        expect(ehTrianguloValido(0, 4, 5)).toBe(false);
        expect(ehTrianguloValido(-3, 4, 5)).toBe(false);
    });

    // 10. Teste 10 (removerElemento)
    test('10. removerElemento deve remover o elemento indicado sem modificar o array original', () => {
        const listaOriginal = ['banana', 'maca', 'uva'];
        const listaAtualizada = removerElemento(listaOriginal, 'maca');

        expect(listaAtualizada).toEqual(['banana', 'uva']);
        expect(removerElemento([1, 2, 3], 99)).toEqual([1, 2, 3]);
        expect(listaOriginal).toHaveLength(3);
        expect(listaOriginal).toEqual(['banana', 'maca', 'uva']);
    });
});
