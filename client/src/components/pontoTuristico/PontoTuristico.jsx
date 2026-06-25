import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obterPontoPorId } from '../../services/pontoTuristicoService';
import { ArrowLeft, MapPin, Building2, FileText, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const PontoTuristico = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ponto, setPonto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarPonto = async () => {
            try {
                const data = await obterPontoPorId(id);
                setPonto(data);
            } catch (error) {
                console.error("Erro ao carregar ponto:", error);
                toast.error("Erro ao carregar ponto turístico!");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        carregarPonto();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Carregando...</p>
            </div>
        );
    }

    if (!ponto) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-8 h-8 text-white" />
                            <h1 className="text-2xl font-bold text-white">{ponto.nome}</h1>
                        </div>
                        <p className="text-blue-100 mt-2 text-sm">
                            {ponto.cidade} / {ponto.estado}
                        </p>
                    </div>

                    <div className="p-6 space-y-6">

                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Descrição</p>
                                <p className="text-gray-800 mt-1">{ponto.descricao}</p>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Localização</p>
                                <p className="text-gray-800 mt-1">{ponto.localizacao}</p>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Cidade / Estado</p>
                                <p className="text-gray-800 mt-1">{ponto.cidade} — {ponto.estado}</p>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="text-xs text-gray-400 text-right">
                            Cadastrado em {new Date(ponto.dataInclusao).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar
                        </button>
                        <button
                            onClick={() => navigate(`/cadastro/${ponto.pontoTuristicoId}`)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                        >
                            <Edit className="w-4 h-4" />
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PontoTuristico;