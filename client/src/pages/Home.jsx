import { useEffect, useState, useCallback } from 'react';
import { obterPontos, deletarPonto } from '../services/pontoTuristicoService';
import PontoTuristicoList from '../components/pontoTuristico/PontoTuristicoList';
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
    const [pontos, setPontos] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [busca, setBusca] = useState('');
    const [loading, setLoading] = useState(true);

    const tamanhoPagina = 5;

    const carregarPontos = useCallback(async () => {
        setLoading(true);
        try {
            const resultado = await obterPontos(busca, pagina, tamanhoPagina);
            setPontos(resultado.dados);
            console.log(resultado.dados);
            setTotal(resultado.total);
        } catch (error) {
            console.error("Erro ao carregar pontos:", error);
            toast.error("Erro ao carregar pontos turísticos!");
        } finally {
            setLoading(false);
        }
    }, [busca, pagina]);

    // Recarrega quando muda página ou busca
    useEffect(() => {
        carregarPontos();
    }, [carregarPontos]);

    // Ao mudar a busca, volta pra página 1
    const handleBuscaChange = (termo) => {
        setBusca(termo);
        setPagina(1);
    };

    const handleDeletar = async (ponto) => {
        if (!confirm(`Deseja deletar "${ponto.nome}"?`)) return;
        try {
            await deletarPonto(ponto.pontoTuristicoId);
            toast.success("Ponto turístico deletado!");
            carregarPontos();
        } catch (error) {
            console.error("Erro ao deletar:", error);
            toast.error("Erro ao deletar ponto turístico!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <MapPin className="w-8 h-8 text-blue-600" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Pontos Turísticos
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm">
                        {loading ? 'Carregando...' : `${total} ponto${total !== 1 ? 's' : ''} cadastrado${total !== 1 ? 's' : ''}`}
                    </p>
                </div>

                <PontoTuristicoList
                    pontos={pontos}
                    total={total}
                    pagina={pagina}
                    tamanhoPagina={tamanhoPagina}
                    busca={busca}
                    onPaginaChange={setPagina}
                    onBuscaChange={handleBuscaChange}
                    onDeletar={handleDeletar}
                />
            </div>
        </div>
    );
};

export default Home;