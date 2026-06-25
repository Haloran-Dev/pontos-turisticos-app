using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class AtualizarPontoTuristicoDto
{
    [Required]
    public int PontoTuristicoId { get; set; }

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
}