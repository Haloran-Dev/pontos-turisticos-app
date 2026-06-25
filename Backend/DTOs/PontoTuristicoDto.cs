namespace Backend.DTOs;

public class PontoTuristicoDto
{
    public int PontoTuristicoId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Localizacao { get; set; } = string.Empty;
    public string Cidade { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public DateTime DataInclusao { get; set; }
}