using Backend.Models;

namespace Backend.Repositories;

public interface IPontoTuristicoRepository
{
    Task<(IEnumerable<PontoTuristico> dados, int total)> BuscaAsync(string? busca, int pagina, int tamanhoPagina);
    Task<PontoTuristico?> ObterPorIdAsync(int id);
    Task<PontoTuristico> AdicionarAsync(PontoTuristico ponto);
    Task AtualizarAsync(PontoTuristico ponto);
    Task DeletarAsync(PontoTuristico ponto);
}