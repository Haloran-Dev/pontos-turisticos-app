using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class PontoTuristicoRepository : IPontoTuristicoRepository
{
    private readonly AppDbContext _context;

    public PontoTuristicoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<PontoTuristico> dados, int total)> BuscaAsync(string? busca, int pagina, int tamanhoPagina)
    {
        var query = _context.PontosTuristicos.AsQueryable();

        if (!string.IsNullOrWhiteSpace(busca))
        {
            var termo = busca.ToLower();
            query = query.Where(p =>
                p.Nome.ToLower().Contains(termo) ||
                p.Descricao.ToLower().Contains(termo) ||
                p.Localizacao.ToLower().Contains(termo) ||
                p.Cidade.ToLower().Contains(termo) ||
                p.Estado.ToLower().Contains(termo)
            );
        }

        var total = await query.CountAsync();
        var dados = await query
            .OrderByDescending(p => p.DataInclusao)
            .Skip((pagina - 1) * tamanhoPagina)
            .Take(tamanhoPagina)
            .ToListAsync();

        return (dados, total);
    }

    public async Task<PontoTuristico?> ObterPorIdAsync(int id)
    {
        return await _context.PontosTuristicos.FindAsync(id);
    }

    public async Task<PontoTuristico> AdicionarAsync(PontoTuristico ponto)
    {
        _context.PontosTuristicos.Add(ponto);
        await _context.SaveChangesAsync();
        return ponto;
    }

    public async Task AtualizarAsync(PontoTuristico ponto)
    {
        _context.PontosTuristicos.Update(ponto);
        await _context.SaveChangesAsync();
    }

    public async Task DeletarAsync(PontoTuristico ponto)
    {
        _context.PontosTuristicos.Remove(ponto);
        await _context.SaveChangesAsync();
    }
}