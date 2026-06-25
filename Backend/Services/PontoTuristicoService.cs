using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services;

public class PontoTuristicoService : IPontoTuristicoService
{
    private readonly IPontoTuristicoRepository _repository;

    public PontoTuristicoService(IPontoTuristicoRepository repository)
    {
        _repository = repository;
    }

    public async Task<(IEnumerable<PontoTuristicoDto> dados, int total)> BuscaAsync(string? busca, int pagina, int tamanhoPagina)
    {
        var (dados, total) = await _repository.BuscaAsync(busca, pagina, tamanhoPagina);
        var dtos = dados.Select(p => MapearParaDto(p));
        return (dtos, total);
    }

    public async Task<PontoTuristicoDto?> ObterPorIdAsync(int id)
    {
        var ponto = await _repository.ObterPorIdAsync(id);
        return ponto == null ? null : MapearParaDto(ponto);
    }

    public async Task<PontoTuristicoDto> CriarAsync(CriarPontoTuristicoDto dto)
    {
        var ponto = new PontoTuristico(dto.Nome, dto.Descricao, dto.Localizacao, dto.Cidade, dto.Estado);
        var criado = await _repository.AdicionarAsync(ponto);
        return MapearParaDto(criado);
    }

    public async Task<bool> EditarAsync(int id, AtualizarPontoTuristicoDto dto)
    {
        var ponto = await _repository.ObterPorIdAsync(id);
        if (ponto == null) return false;

        ponto.Nome = dto.Nome;
        ponto.Descricao = dto.Descricao;
        ponto.Localizacao = dto.Localizacao;
        ponto.Cidade = dto.Cidade;
        ponto.Estado = dto.Estado;

        await _repository.AtualizarAsync(ponto);
        return true;
    }

    public async Task<bool> DeletarAsync(int id)
    {
        var ponto = await _repository.ObterPorIdAsync(id);
        if (ponto == null) return false;

        await _repository.DeletarAsync(ponto);
        return true;
    }

    private static PontoTuristicoDto MapearParaDto(PontoTuristico ponto) => new()
    {
        PontoTuristicoId = ponto.pontoTuristicoId,
        Nome = ponto.Nome,
        Descricao = ponto.Descricao,
        Localizacao = ponto.Localizacao,
        Cidade = ponto.Cidade,
        Estado = ponto.Estado,
        DataInclusao = ponto.DataInclusao
    };
}