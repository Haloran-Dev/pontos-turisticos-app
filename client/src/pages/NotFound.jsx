import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-10 h-10 text-blue-600" />
                    <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        404
                    </span>
                </div>
                <p className="text-gray-500 text-lg">Página não encontrada</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                    Voltar para a listagem
                </button>
            </div>
        </div>
    );
};

export default NotFound;