import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PontoTuristicoList = ({ pontos, total, pagina, tamanhoPagina, onPaginaChange, onBuscaChange, busca, onDeletar }) => {
    const navigate = useNavigate();
    const totalPaginas = Math.ceil(total / tamanhoPagina);

    return (
        <div className="space-y-4">

            <div className="flex gap-3">
                <input
                    type="text"
                    value={busca}
                    onChange={(e) => onBuscaChange(e.target.value)}
                    placeholder="Buscar por nome, descrição ou localização..."
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
            </div>

            {!pontos || pontos.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg border border-gray-100">
                    <p className="text-lg font-medium">Nenhum ponto turístico encontrado</p>
                    <p className="text-sm mt-1">
                        {busca ? 'Tente outro termo de busca.' : 'Cadastre um novo ponto turístico.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {pontos.map(ponto => (
                        <div
                            key={ponto.pontoTuristicoId}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {ponto.nome}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        📍 {ponto.localizacao} — {ponto.cidade}/{ponto.estado}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => navigate(`/detalhe/${ponto.pontoTuristicoId}`)}
                                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-all duration-200 hover:scale-105"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Ver detalhes
                                    </button>
                                    <button
                                        onClick={() => onDeletar(ponto)}
                                        className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-all duration-200 hover:scale-105"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {totalPaginas > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-gray-500">
                        Mostrando {((pagina - 1) * tamanhoPagina) + 1}–{Math.min(pagina * tamanhoPagina, total)} de {total} resultados
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPaginaChange(pagina - 1)}
                            disabled={pagina === 1}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => onPaginaChange(p)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                                    ${p === pagina
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => onPaginaChange(pagina + 1)}
                            disabled={pagina === totalPaginas}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PontoTuristicoList;