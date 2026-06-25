using Backend.DTOs;

namespace Backend.Services;

public interface IPontoTuristicoService
{
    Task<(IEnumerable<PontoTuristicoDto> dados, int total)> BuscaAsync(string? busca, int pagina, int tamanhoPagina);
    Task<PontoTuristicoDto?> ObterPorIdAsync(int id);
    Task<PontoTuristicoDto> CriarAsync(CriarPontoTuristicoDto dto);
    Task<bool> EditarAsync(int id, AtualizarPontoTuristicoDto dto);
    Task<bool> DeletarAsync(int id);
}