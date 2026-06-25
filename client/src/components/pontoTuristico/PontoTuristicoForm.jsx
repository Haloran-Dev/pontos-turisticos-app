import { Component } from "react";
import { obterEstados, obterCidadesPorEstado } from "../../services/pontoTuristicoService";
import { Save, RotateCcw } from "lucide-react";

class PontoTuristicoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estados: [],
            cidades: [],
            loadingEstados: false,
            loadingCidades: false,
            formData: {
                pontoTuristicoId: 0,
                nome: '',
                descricao: '',
                localizacao: '',
                cidade: '',
                estado: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEstadoChange = this.handleEstadoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    async componentDidMount() {
        this.setState({ loadingEstados: true });
        try {
            const estados = await obterEstados();
            this.setState({ estados });
        } catch (error) {
            console.error("Erro ao carregar estados:", error);
        } finally {
            this.setState({ loadingEstados: false });
        }

        if (this.props.editData) {
            await this.carregarEditData(this.props.editData);
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.editData !== this.props.editData && this.props.editData) {
            await this.carregarEditData(this.props.editData);
        }
    }

    async carregarEditData(editData) {
        this.setState({
            formData: {
                pontoTuristicoId: editData.pontoTuristicoId,
                nome: editData.nome,
                descricao: editData.descricao,
                localizacao: editData.localizacao,
                cidade: editData.cidade,
                estado: editData.estado,
            }
        });

        if (editData.estado) {
            this.setState({ loadingCidades: true });
            try {
                const cidades = await obterCidadesPorEstado(editData.estado);
                this.setState({ cidades });
            } catch (error) {
                console.error("Erro ao carregar cidades:", error);
            } finally {
                this.setState({ loadingCidades: false });
            }
        }
    }

    async handleEstadoChange(e) {
        const estado = e.target.value;
        this.setState({
            formData: { ...this.state.formData, estado, cidade: '' },
            cidades: [],
            loadingCidades: true
        });

        try {
            if (estado) {
                const cidades = await obterCidadesPorEstado(estado);
                this.setState({ cidades });
            }
        } catch (error) {
            console.error("Erro ao carregar cidades:", error);
        } finally {
            this.setState({ loadingCidades: false });
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            formData: { ...this.state.formData, [name]: value }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.formData);
    }

    resetForm() {
        this.setState({
            formData: {
                pontoTuristicoId: 0,
                nome: '',
                descricao: '',
                localizacao: '',
                cidade: '',
                estado: ''
            },
            cidades: []
        });
        this.props.onFormReset?.();
    }

    render() {
        const { estados, cidades, loadingEstados, loadingCidades, formData } = this.state;

        const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
        const labelClass = "block text-sm font-medium text-gray-700 mb-2";

        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    {formData.pontoTuristicoId > 0 ? 'Editar Ponto Turístico' : 'Novo Ponto Turístico'}
                </h2>

                <form className="space-y-4" onSubmit={this.handleSubmit}>

                    <div>
                        <label className={labelClass}>Nome*</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={this.handleChange}
                            className={inputClass}
                            placeholder="Nome do ponto turístico"
                            maxLength={100}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Descrição*</label>
                        <textarea
                            name="descricao"
                            value={formData.descricao}
                            onChange={this.handleChange}
                            className={inputClass}
                            placeholder="Descrição do ponto turístico (máx. 100 caracteres)"
                            maxLength={100}
                            rows={3}
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            {formData.descricao.length}/100 caracteres
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>Localização*</label>
                        <input
                            type="text"
                            name="localizacao"
                            value={formData.localizacao}
                            onChange={this.handleChange}
                            className={inputClass}
                            placeholder="Endereço ou referência de localização"
                            maxLength={200}
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className={labelClass}>Estado*</label>
                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={this.handleEstadoChange}
                                className={inputClass}
                                required
                            >
                                <option value="">
                                    {loadingEstados ? 'Carregando...' : 'Selecione o estado'}
                                </option>
                                {estados.map(estado => (
                                    <option key={estado.id} value={estado.sigla}>
                                        {estado.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className={labelClass}>Cidade*</label>
                            <select
                                name="cidade"
                                value={formData.cidade}
                                onChange={this.handleChange}
                                className={inputClass}
                                required
                                disabled={!formData.estado || loadingCidades}
                            >
                                <option value="">
                                    {loadingCidades ? 'Carregando...' : 'Selecione a cidade'}
                                </option>
                                {cidades.map(cidade => (
                                    <option key={cidade.id} value={cidade.nome}>
                                        {cidade.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                        >
                            <Save className="w-4 h-4" />
                            {formData.pontoTuristicoId > 0 ? 'Atualizar' : 'Cadastrar'}
                        </button>

                        <button
                            type="button"
                            onClick={this.resetForm}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Limpar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PontoTuristicoForm;