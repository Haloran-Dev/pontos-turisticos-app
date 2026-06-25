import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { criarPonto, atualizarPonto, obterPontoPorId } from '../services/pontoTuristicoService';
import PontoTuristicoForm from '../components/pontoTuristico/PontoTuristicoForm';
import toast from 'react-hot-toast';

const Cadastro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Se tiver ID na URL, carrega os dados para edição
    useEffect(() => {
        if (id) {
            const carregarPonto = async () => {
                setLoading(true);
                try {
                    const ponto = await obterPontoPorId(id);
                    console.log("editData carregado:", ponto);
                    setEditData(ponto);
                } catch (error) {
                    console.error("Erro ao carregar ponto:", error);
                    toast.error("Erro ao carregar ponto turístico!");
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            };
            carregarPonto();
        }
    }, [id]);

    const handleFormSubmit = async (ponto) => {
        setLoading(true);
        try {
            if (ponto.pontoTuristicoId > 0) {
                await atualizarPonto(ponto.pontoTuristicoId, ponto);
                toast.success("Ponto turístico atualizado!");
            } else {
                await criarPonto(ponto);
                toast.success("Ponto turístico cadastrado!");
            }
            navigate('/');
        } catch (error) {
            console.error("Erro ao salvar:", error);
            toast.error("Erro ao salvar ponto turístico!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <PontoTuristicoForm
                    editData={editData}
                    onFormSubmit={handleFormSubmit}
                    onFormReset={() => setEditData(null)}
                />
            </div>
        </div>
    );
};

export default Cadastro;