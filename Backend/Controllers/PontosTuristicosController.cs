using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PontosTuristicosController : ControllerBase
{
    private readonly IPontoTuristicoService _service;

    public PontosTuristicosController(IPontoTuristicoService service)
    {
        _service = service;
    }

    // POST /api/pontosturisticos
    [HttpPost]
    public async Task<IActionResult> Criar(CriarPontoTuristicoDto dto)
    {

        var criado = await _service.CriarAsync(dto);
        return CreatedAtRoute("ObterPonto", new { id = criado.PontoTuristicoId }, criado);

    }

    // GET /api/pontosturisticos?busca=termo&pagina=1&tamanhoPagina=5
    [HttpGet]
    public async Task<IActionResult> ObterTodos(
        [FromQuery] string? busca,
        [FromQuery] int pagina = 1,
        [FromQuery] int tamanhoPagina = 5)
    {
        var (dados, total) = await _service.BuscaAsync(busca, pagina, tamanhoPagina);
        return Ok(new { total, pagina, tamanhoPagina, dados });
    }

    // GET /api/pontosturisticos/{id}
    [HttpGet("{id:int}", Name = "ObterPonto")]
    public async Task<IActionResult> ObterPorId(int id)
    {

        var ponto = await _service.ObterPorIdAsync(id);
        if (ponto == null) return NotFound();
        return Ok(ponto);

    }

    // PUT /api/pontosturisticos/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] AtualizarPontoTuristicoDto dto)
    {

        if (id != dto.PontoTuristicoId)
            return BadRequest("ID na URL não corresponde ao ID do corpo da requisição.");

        var atualizado = await _service.EditarAsync(id, dto);
        if (!atualizado) return NotFound();
        return NoContent();

    }

    // DELETE /api/pontosturisticos/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Deletar(int id)
    {
        var deletado = await _service.DeletarAsync(id);
        if (!deletado) return NotFound();
        return NoContent();
    }
}

