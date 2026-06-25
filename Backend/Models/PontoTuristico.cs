using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class PontoTuristico
{
    public PontoTuristico()
    {
    }

    public PontoTuristico(string nome, string descricao, string localizacao, string cidade, string estado)
    {
        Nome = nome;
        Descricao = descricao;
        Localizacao = localizacao;
        Cidade = cidade;
        Estado = estado;
        DataInclusao = DateTime.UtcNow;
    }

    public int pontoTuristicoId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string Localizacao { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Cidade { get; set; } = string.Empty;

    [Required]
    [MaxLength(2)]
    public string Estado { get; set; } = string.Empty;

    public DateTime DataInclusao { get; set; } = DateTime.UtcNow;
}