import { NavLink } from 'react-router-dom';
import { MapPin, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
        ${isActive
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-white hover:bg-white/20'
        }`;

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-white" />
                        <span className="text-white font-bold text-lg">Pontos Turísticos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <NavLink to="/" className={linkClass}>
                            <MapPin className="w-4 h-4" />
                            Listagem
                        </NavLink>
                        <NavLink to="/cadastro" className={linkClass}>
                            <PlusCircle className="w-4 h-4" />
                            Cadastrar
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;